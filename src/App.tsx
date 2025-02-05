import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { EnterprisesPage } from "./pages/EnterprisesPage";
import { OwnersPage } from "./pages/OwnersPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
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
