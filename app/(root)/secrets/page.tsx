import { SECRET } from "@/types/secret";
import CreateSecret from "./CreateSecret";
import { Separator } from "@/components/ui/separator";
import getQueryClient from "@/lib/getQueryClient";
import { getSecretsByUserIdQuery } from "@/modules/secret/secret.query";
import Secrets from "./Secrets";

const secrets: SECRET[] = [
  {
    _id: "secret1",
    userId: "secret1",
    name: "Secret 1",
    value: "http://localhost:3000",
    favourite: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "secret2",
    userId: "secret1",
    name: "Secret 2",
    value: "dsfgfdgdfdfvxcdfssfgdhdffgjh",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "secret3",
    userId: "secret1",
    name: "Secret 3",
    value: "dfdsjkflfdsfjsdfjklfjdsklfjsdsjfhds",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
      <Secrets />
    </section>
  );
};

export default SecretPage;
