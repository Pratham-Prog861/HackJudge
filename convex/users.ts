import { query, mutation, type MutationCtx } from "./_generated/server";
import { parseAdminAllowlist } from "./domain";

async function upsertFromIdentity(
  ctx: MutationCtx,
  identity: {
    subject: string;
    email?: string | null;
    name?: string | null;
    pictureUrl?: string | null;
  },
) {
  const now = Date.now();
  const email = identity.email?.toLowerCase() ?? null;
  const allowlist = parseAdminAllowlist();
  const isAdmin = email ? allowlist.has(email) : false;

  const existing = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (existing) {
    await ctx.db.patch(existing._id, {
      email,
      name: identity.name ?? null,
      imageUrl: identity.pictureUrl ?? null,
      isAdmin,
      updatedAt: now,
    });
    return await ctx.db.get(existing._id);
  }

  const userId = await ctx.db.insert("users", {
    clerkId: identity.subject,
    email,
    name: identity.name ?? null,
    imageUrl: identity.pictureUrl ?? null,
    isAdmin,
    createdAt: now,
    updatedAt: now,
  });

  return await ctx.db.get(userId);
}

export const syncCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be signed in.");
    }
    return await upsertFromIdentity(ctx, identity);
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (existing) {
      return existing;
    }

    const email = identity.email?.toLowerCase() ?? null;
    const allowlist = parseAdminAllowlist();
    return {
      _id: null,
      _creationTime: Date.now(),
      clerkId: identity.subject,
      email,
      name: identity.name ?? null,
      imageUrl: identity.pictureUrl ?? null,
      isAdmin: email ? allowlist.has(email) : false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  },
});
