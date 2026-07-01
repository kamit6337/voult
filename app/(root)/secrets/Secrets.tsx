"use client";

import SecretsComponent from "@/components/secrets/SecretComponent";
import { getSecretsByUserIdQuery } from "@/modules/secret/secret.query";
import { useQuery } from "@tanstack/react-query";

const Secrets = () => {
  const { data, error, isLoading } = useQuery(getSecretsByUserIdQuery());

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return <p>No Data</p>;
  }

  return <SecretsComponent secretsArr={data} isHeader={false} />;
};

export default Secrets;
