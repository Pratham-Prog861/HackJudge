"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

export function AuthSync() {
  const { isSignedIn, userId } = useAuth();
  const lastSyncedUserId = useRef<string | null>(null);
  const sync = useMutation(api.users.syncCurrentUser);

  useEffect(() => {
    if (!isSignedIn || !userId) {
      lastSyncedUserId.current = null;
      return;
    }

    if (lastSyncedUserId.current === userId) {
      return;
    }
    lastSyncedUserId.current = userId;
    void sync({});
  }, [isSignedIn, sync, userId]);

  return null;
}
