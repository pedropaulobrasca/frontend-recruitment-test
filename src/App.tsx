import { useEnterprisesQuery } from "./services/graphql/queries/enterprises";
import type { Enterprise } from "./types/enterprise";

const App = () => {
  const { data, loading, error } = useEnterprisesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Enterprises</h1>
      <ul>
        {data.enterprises.map((enterprise: Enterprise) => (
          <li key={enterprise.id}>
            <h2>{enterprise.name}</h2>
            <p>{enterprise.commercial_name}</p>
            <p>{enterprise.cnpj}</p>
            <p>{enterprise.description}</p>
            <p>{new Date(enterprise.inserted_at).toLocaleString("pt-BR")}</p>
            <p>{new Date(enterprise.updated_at).toLocaleString("pt-BR")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
