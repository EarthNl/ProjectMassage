import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { getStorage } from "./helpers/contents";

function App() {
  const user_role = getStorage();
  return (
    <div className="w-full h-full">
      {user_role ? (
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
