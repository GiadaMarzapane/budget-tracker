import { query, mutation } from "./_generated/server";
import { assertOwner, getCurrentUser } from "./auth";
import { v } from "convex/values";

export const list = query({
  args: {
    archived: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    let q = ctx.db
    .query('goals')
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
    targetAmount: v.number(),
    currentAmount: v.number(),
    monthlyAmount: v.optional(v.number()),
    deadline: v.optional(v.string()),
    swatch: v.union(v.literal('lavender'), v.literal('pink'), v.literal('blush'), v.literal('cream'), v.literal('mint')),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('goals', {
      userId: user._id,
      name: args.name,
      targetAmount: args.targetAmount,
      currentAmount: args.currentAmount,
      monthlyAmount: args.monthlyAmount,
      deadline: args.deadline,
      swatch: args.swatch,
      icon: args.icon,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('goals'),
    name: v.optional(v.string()),
    targetAmount: v.optional(v.number()),
    monthlyAmount: v.optional(v.number()),
    deadline: v.optional(v.string()),
    swatch: v.optional(v.union(v.literal('lavender'), v.literal('pink'), v.literal('blush'), v.literal('cream'), v.literal('mint'))),
    icon: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await assertOwner(ctx, "goals", args.id);
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const archive = mutation({
  args: {
    id: v.id('goals'),
  },
  handler: async (ctx, args) => {
    await assertOwner(ctx, "goals", args.id);
    return await ctx.db.patch(args.id, {
      archivedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/*Movements*/
export const listMovements = query({
  args: {
    goalId: v.id('goals'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query('goalMovements').withIndex('by_goal_date', (q) => q.eq('goalId', args.goalId)).order('desc').collect();
  },
});

export const createMovement = mutation({
  args: {
    goalId: v.id('goals'),
    amount: v.number(),
    date: v.string(),
    note: v.optional(v.string()),
    type: v.union(v.literal('deposit'), v.literal('withdrawal')),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    return await ctx.db.insert('goalMovements', {
      userId: user._id,
      goalId: args.goalId,
      amount: args.amount,
      date: args.date,
      note: args.note,
      type: args.type,
      createdAt: Date.now(),
    });
  },
});
