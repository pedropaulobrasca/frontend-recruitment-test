import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { EnterprisesPage } from "./pages/EnterprisesPage";
import { OwnersPage } from "./pages/OwnersPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EnterprisesPage />} />
          <Route path="owners" element={<OwnersPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
