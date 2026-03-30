import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article, FAQ } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitConsultation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      issueType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitConsultation(
        data.name,
        data.email,
        data.issueType,
        data.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
    },
  });
}
