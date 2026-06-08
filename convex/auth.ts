import type { QueryCtx, MutationCtx } from "./_generated/server";
import type { Id, TableNames } from "./_generated/dataModel";
import Google from "@auth/core/providers/google";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
 
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, {userId, existingUserId}) {
      if (existingUserId) {
        return;
      }

      await ctx.db.patch(userId, {
        role: "user",
        currency: "EUR",
        locale: "it-IT",
        weekStart: "mon",
        theme: "light",
        badges: [],
        updatedAt: Date.now(),
      })
    }
  }
});

export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error('Not authenticated');

  const user = await ctx.db.get(userId);
  if (!user) throw new Error('User not found');

  return user;
}

// Helper generico: recupera un documento e verifica che appartenga all'utente
export async function assertOwner<T extends TableNames>(
  ctx: MutationCtx,
  table: T,
  id: Id<T>,
) {
  const user = await getCurrentUser(ctx);
  const doc = await ctx.db.get(id);
  if (!doc) throw new Error(`${table}: document not found`);
  // Tutti i nostri documenti hanno userId — il cast è necessario perché
  // TypeScript non sa che ogni tabella ha questo campo
  if ((doc as unknown as { userId: Id<'users'> }).userId !== user._id) {
    throw new Error('Unauthorized');
  }
  return { user, doc };
}

export async function assertAdmin(ctx: QueryCtx | MutationCtx) {
  const user = await getCurrentUser(ctx);
  if (user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}
