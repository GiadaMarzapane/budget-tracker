import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { assertAdmin, getCurrentUser } from "./auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    await getCurrentUser(ctx);
    return await ctx.db.query("badges").order("asc").collect();
  },
});

export const get = query({
  args: {
    id: v.id("badges"),
  },
  handler: async (ctx, args) => {
    await getCurrentUser(ctx);
    return await ctx.db.get(args.id);
  },
});

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    const entries = await Promise.all(
      user.badges.map(async (entry) => {
        const badge = await ctx.db.get(entry.badgeId);
        if (!badge) return null;

        return {
          ...badge,
          progress: entry.progress,
          completedAt: entry.completedAt,
        };
      }),
    );

    return entries.filter((entry) => entry !== null);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    target: v.number(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const existing = await ctx.db
      .query("badges")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .unique();
    if (existing) {
      throw new Error("Badge already exists");
    }

    return await ctx.db.insert("badges", {
      name: args.name,
      description: args.description,
      category: args.category,
      target: args.target,
      icon: args.icon,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("badges"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    target: v.optional(v.number()),
    icon: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const badge = await ctx.db.get(args.id);
    if (!badge) {
      throw new Error("Badge not found");
    }

    if (args.name && args.name !== badge.name) {
      const existing = await ctx.db
        .query("badges")
        .withIndex("by_name", (q) => q.eq("name", args.name!))
        .unique();
      if (existing) {
        throw new Error("Badge name already in use");
      }
    }

    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("badges"),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const badge = await ctx.db.get(args.id);
    if (!badge) {
      throw new Error("Badge not found");
    }

    return await ctx.db.delete(args.id);
  },
});

export const enroll = mutation({
  args: {
    badgeId: v.id("badges"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    const badge = await ctx.db.get(args.badgeId);
    if (!badge) {
      throw new Error("Badge not found");
    }

    if (user.badges.some((entry) => entry.badgeId === args.badgeId)) {
      return user._id;
    }

    await ctx.db.patch(user._id, {
      badges: [
        ...user.badges,
        { badgeId: args.badgeId, progress: 0 },
      ],
      updatedAt: Date.now(),
    });

    return user._id;
  },
});

export const updateProgress = mutation({
  args: {
    badgeId: v.id("badges"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    const badge = await ctx.db.get(args.badgeId);
    if (!badge) {
      throw new Error("Badge not found");
    }

    const index = user.badges.findIndex(
      (entry) => entry.badgeId === args.badgeId,
    );
    if (index === -1) {
      throw new Error("Badge not enrolled");
    }

    const completedAt =
      args.progress >= badge.target ? Date.now() : undefined;

    const updatedBadges = [...user.badges];
    updatedBadges[index] = {
      badgeId: args.badgeId,
      progress: args.progress,
      completedAt,
    };

    await ctx.db.patch(user._id, {
      badges: updatedBadges,
      updatedAt: Date.now(),
    });

    return user._id;
  },
});

export const grant = mutation({
  args: {
    userId: v.id("users"),
    badgeId: v.id("badges"),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const badge = await ctx.db.get(args.badgeId);
    if (!badge) {
      throw new Error("Badge not found");
    }

    const entry = {
      badgeId: args.badgeId,
      progress: badge.target,
      completedAt: Date.now(),
    };

    const alreadyEnrolled = user.badges.some(
      (item) => item.badgeId === args.badgeId,
    );

    await ctx.db.patch(args.userId, {
      badges: alreadyEnrolled
        ? user.badges.map((item) =>
            item.badgeId === args.badgeId ? entry : item,
          )
        : [...user.badges, entry],
      updatedAt: Date.now(),
    });

    return args.userId;
  },
});

export const revoke = mutation({
  args: {
    userId: v.id("users"),
    badgeId: v.id("badges"),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      badges: user.badges.filter(
        (entry) => entry.badgeId !== args.badgeId,
      ),
      updatedAt: Date.now(),
    });

    return args.userId;
  },
});
