import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./auth";

export const list = query({
  args: {
    archived: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    let q = ctx.db
    .query('categories')
    .withIndex('by_user', (q) => q.eq('userId', user._id))
    .order('asc');

    if (args.archived !== undefined) {
      q = q.filter((q) => q.eq(q.field('archivedAt'), args.archived));
    }

    return await q.collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
    isSystem: v.optional(v.boolean()),
    swatch: v.union(v.literal('lavender'), v.literal('pink'), v.literal('blush'), v.literal('cream'), v.literal('mint')),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('categories', {
      userId: user._id,
      name: args.name,
      slug: args.name.toLowerCase().replace(/ /g, '-'),
      swatch: args.swatch,
      icon: args.icon,
      isSystem: args.isSystem ?? false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('categories'),
    name: v.optional(v.string()),
    icon: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      ...args,
      updatedAt: Date.now(),
    });
  }
});

export const archive = mutation({
  args: {
    id: v.id('categories'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      archivedAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
});

export const restore = mutation({
  args: {
    id: v.id('categories'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      archivedAt: undefined,
      updatedAt: Date.now(),
    });
  }
})
