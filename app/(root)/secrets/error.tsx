"use client";

const SecretsError = ({ error }: { error: Error }) => {
  return (
    <div>
      <p>Secrets Error</p>
      <p>{error.message}</p>
    </div>
  );
};

export default SecretsError;
