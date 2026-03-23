import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateOrderRequest,
  OrderId,
  ServiceType,
  TailoringOrder,
} from "../backend.d";
import { useActor } from "./useActor";

export function useListOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<TailoringOrder[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrder(id: OrderId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<TailoringOrder>({
    queryKey: ["order", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("No order id");
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    refetchInterval: 5000,
  });
}

export function useGetPriceEstimate(serviceType: ServiceType | null) {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["price", serviceType],
    queryFn: async () => {
      if (!actor || !serviceType) throw new Error("No service type");
      return actor.getPriceEstimate(serviceType);
    },
    enabled: !!actor && !isFetching && serviceType !== null,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<OrderId, Error, CreateOrderRequest>({
    mutationFn: async (request) => {
      if (!actor) throw new Error("Not connected");
      return actor.createOrder(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
