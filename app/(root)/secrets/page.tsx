import CreateSecret from "./CreateSecret";
import { Separator } from "@/components/ui/separator";
import getQueryClient from "@/lib/getQueryClient";
import { getSecretsByUserIdQuery } from "@/modules/secret/secret.query";
import Secrets from "./Secrets";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const SecretPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getSecretsByUserIdQuery());

  return (
    <section className="space-y-4">
      <div className="space-y-2 flex flex-col">
        <div className="self-end">
          <CreateSecret />
        </div>
        <Separator />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Secrets />
      </HydrationBoundary>
    </section>
  );
};

export default SecretPage;
