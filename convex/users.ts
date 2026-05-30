import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./auth";

export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
  },
});

export const upsert = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      role: "user",
      currency: "EUR",
      locale: "it-IT",
      weekStart: "mon",
      theme: "light",
      badges: [],
      createdAt: Date.now(),
    });
  },
});

export const updateSettings = mutation({
  args: {
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    currency: v.optional(
      v.union(v.literal("EUR"), v.literal("USD"), v.literal("GBP")),
    ),
    locale: v.optional(v.string()),
    weekStart: v.optional(v.union(v.literal("mon"), v.literal("sun"))),
    theme: v.optional(
      v.union(v.literal("light"), v.literal("dark"), v.literal("auto")),
    ),
    lockKey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    return await ctx.db.patch(user._id, {
      ...args,
      updatedAt: Date.now(),
    });
  },
});
