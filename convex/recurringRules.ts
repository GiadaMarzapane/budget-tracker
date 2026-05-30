import { query, mutation } from "./_generated/server";
import { assertOwner, getCurrentUser } from "./auth";
import { v } from "convex/values";

export const list = query({
  args: {
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    let q = ctx.db
    .query('recurringRules')
    .withIndex('by_user', (q) => q.eq('userId', user._id))
    .order('asc');

    if (args.active !== undefined) {
      q = q.filter((q) => q.eq(q.field('active'), args.active));
    }

    return await q.collect();
  },
});

export const create = mutation({
  args: {
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    frequency: v.union(v.literal('daily'), v.literal('weekly'), v.literal('monthly'), v.literal('yearly')),
    interval: v.number(),
    dayOfMonth: v.optional(v.number()),
    dayOfWeek: v.optional(v.number()),
    startDate: v.string(),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('recurringRules', {
      userId: user._id,
      nextRun: args.startDate,
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...args,
    });
  }
});

export const update = mutation({
  args: {
    id: v.id('recurringRules'),
    type: v.optional(v.union(v.literal('in'), v.literal('out'))),
    amount: v.optional(v.number()),
    categoryId: v.optional(v.id('categories')),
    description: v.optional(v.string()),
    frequency: v.optional(v.union(v.literal('daily'), v.literal('weekly'), v.literal('monthly'), v.literal('yearly'))),
    interval: v.optional(v.number()),
    dayOfMonth: v.optional(v.number()),
    dayOfWeek: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await assertOwner(ctx, "recurringRules", args.id);
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});