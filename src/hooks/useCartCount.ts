import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../subapase/SubapaseAPI";
import { useEffect } from "react";

export function useCartCount() {
  const queryClient = useQueryClient();

  const { data: count = 0 } = useQuery<number>({
    queryKey: ["cartCount"],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) return 0;

      const { data, error } = await supabase
        .from("cart_items")
        .select("id", { count: "exact" })
        .eq("user_id", userId);

      if (error) throw new Error(error.message);
      return data?.length ?? 0;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity, // count updated via Realtime
  });

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const initRealtime = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) return;

      channel = supabase
        .channel(`cart-items-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "cart_items",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            queryClient.setQueryData<number>(["cartCount"], (oldCount = 0) => {
              if (payload.eventType === "INSERT") return oldCount + 1;
              if (payload.eventType === "DELETE") return Math.max(0, oldCount - 1);
              return oldCount;
            });
          }
        )
        .subscribe();
    };

    initRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return count;
}
