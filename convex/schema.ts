import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const swatch = v.union(
  v.literal('lavender'),
  v.literal('pink'),
  v.literal('blush'),
  v.literal('cream'),
  v.literal('mint'),
);

const userBadge = v.object({
  badgeId: v.id('badges'),
  progress: v.number(),
  completedAt: v.optional(v.number()),
});

export default defineSchema({
  ...authTables,
  users: defineTable({
      // ── Convex Auth (obbligatori) ──
    name: v.optional(v.string()),
    image: v.optional(v.string()),           // Google mette l'avatar qui
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
      // ── Campi app (optional all'inizio) ──
    role: v.optional(v.union(v.literal('admin'), v.literal('user'), v.literal('premium_user'))),
    avatarUrl: v.optional(v.string()),
    currency: v.optional(v.union(v.literal('EUR'), v.literal('USD'), v.literal('GBP'))),
    locale: v.optional(v.string()),
    weekStart: v.optional(v.union(v.literal('mon'), v.literal('sun'))),
    lockKey: v.optional(v.string()),
    theme: v.optional(v.union(v.literal('light'), v.literal('dark'), v.literal('auto'))),
    badges: v.optional(v.array(userBadge)),
    updatedAt: v.optional(v.number()),
  })
  .index('email', ['email'])
  .index('phone', ['phone']),

  categories: defineTable({
    userId: v.id('users'),
    name: v.string(),
    slug: v.string(),
    swatch,
    icon: v.string(),
    isSystem: v.boolean(),
    archivedAt: v.optional(v.number()),
    order: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
  .index('by_user', ['userId'])
  .index('by_user_slug', ['userId', 'slug']),

  transactions: defineTable({
    userId: v.id('users'),
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    currency: v.string(),
    date: v.string(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    note: v.optional(v.string()),
    recurringId: v.optional(v.id('recurringRules')),
    updatedAt: v.optional(v.number()),
  })
  .index('by_user_date', ['userId', 'date'])
  .index('by_user_category', ['userId', 'categoryId'])
  .index('by_user_recurring', ['userId', 'recurringId']),

  recurringRules: defineTable({
    userId: v.id('users'),
    type: v.union(v.literal('in'), v.literal('out')),
    amount: v.number(),
    categoryId: v.optional(v.id('categories')),
    description: v.string(),
    frequency: v.union(
      v.literal('daily'),
      v.literal('weekly'),
      v.literal('monthly'),
      v.literal('yearly'),
    ),
    interval: v.number(),
    dayOfMonth: v.optional(v.number()),
    dayOfWeek: v.optional(v.number()),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    nextRun: v.string(),
    active: v.boolean(),
    updatedAt: v.optional(v.number()),
  })
  .index('by_user', ['userId'])
  .index('by_active_nextRun', ['active', 'nextRun']),

  budgets: defineTable({
    userId: v.id('users'),
    categoryId: v.id('categories'),
    month: v.string(),
    amount: v.number(),
    updatedAt: v.optional(v.number()),
  })
  .index('by_user_month', ['userId', 'month'])
  .index('by_user_cat_month', ['userId', 'categoryId', 'month']),

  goals: defineTable({
    userId: v.id('users'),
    name: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    monthlyAmount: v.optional(v.number()),
    deadline: v.optional(v.string()),
    swatch,
    icon: v.string(),
    completedAt: v.optional(v.number()),
    archivedAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
  .index('by_user', ['userId']),

  goalMovements: defineTable({
    userId: v.id('users'),
    goalId: v.id('goals'),
    amount: v.number(),
    date: v.string(),
    note: v.optional(v.string()),
    type: v.union(v.literal('deposit'), v.literal('withdrawal')),
  })
  .index('by_goal_date', ['goalId', 'date']),

  badges: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    target: v.number(),
    icon: v.string(),
    updatedAt: v.optional(v.number()),
  })
  .index('by_name', ['name']),
});