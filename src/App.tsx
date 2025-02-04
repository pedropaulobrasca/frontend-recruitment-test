import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEnterprisesQuery } from "./services/graphql/queries/enterprises";
import type { Enterprise } from "./types/enterprise";
import { Home } from "./pages/home";

const App = () => {
  const { data, loading, error } = useEnterprisesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
