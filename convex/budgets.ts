import { query, mutation } from "./_generated/server";
import { assertOwner, getCurrentUser } from "./auth";
import { v } from "convex/values";

export const list = query({
  args: {
    month: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    let q = ctx.db
    .query('budgets')
    .withIndex('by_user_month', (q) => q.eq('userId', user._id))
    .order('asc');

    if (args.month) {
      q = q.filter((q) => q.eq(q.field('month'), args.month));
    }

    return await q.collect();
  },
});

export const create = mutation({
  args: {
    categoryId: v.id('categories'),
    month: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('budgets', {
      userId: user._id,
      categoryId: args.categoryId,
      month: args.month,
      amount: args.amount,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('budgets'),
    amount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await assertOwner(ctx, "budgets", args.id);
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id('budgets'),
  },
  handler: async (ctx, args) => {
    await assertOwner(ctx, "budgets", args.id);
    return await ctx.db.delete(args.id);
  },
});