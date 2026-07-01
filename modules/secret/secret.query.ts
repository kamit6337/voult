import { queryOptions } from "@tanstack/react-query";
import { getSecretsByUserIdAction } from "./secret.actions";

export const getSecretsByUserIdQuery = () =>
  queryOptions({
    queryKey: ["secrets"],
    queryFn: () => getSecretsByUserIdAction(),
    staleTime: Infinity,
  });
