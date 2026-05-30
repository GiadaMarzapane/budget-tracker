import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./auth";

export const list = query({
  args: {
    month: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    let q = ctx.db
    .query('transactions')
    .withIndex('by_user_date', (q) => q.eq('userId', user._id))
    .order('desc');

    if (args.month) {
      q = q.filter((q) =>
        q.and(q.gte(q.field('date'), `${args.month}-01`),
        q.lte(q.field('date'), `${args.month}-31`))
      );
    }

    return await q.take(50);
  },
});

export const create = mutation({
  args: {
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    date: v.string(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('transactions', {
      userId: user._id,
      currency: user.currency,
      createdAt: Date.now(),
      ...args,
    })
  }
});

export const update = mutation({
  args: {
    id: v.id('transactions'),
    type: v.optional(v.union(v.literal('in'), v.literal('out'))),
    amount: v.optional(v.number()),
    date: v.optional(v.string()),
    categoryId: v.optional(v.id('categories')),
    description: v.optional(v.string()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      ...args,
      updatedAt: Date.now(),
    });
  }
});

export const remove = mutation({
  args: {
    id: v.id('transactions'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  }
})
