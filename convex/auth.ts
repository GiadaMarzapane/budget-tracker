import type { QueryCtx, MutationCtx } from "./_generated/server";
import type { Id, TableNames } from "./_generated/dataModel";

export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error('Not authenticated');
  
  const user = await ctx.db
    .query('users')
    .withIndex('by_token', (q) => q.eq('tokenIdentifier', identity.tokenIdentifier))
    .unique(); // restituisce null se non trovato, errore se ne trova >1

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
