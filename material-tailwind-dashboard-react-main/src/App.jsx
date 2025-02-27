import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard,  Home } from "@/layouts";
import { getStorage, removeAllStorage } from "./helpers/contents";
import MyContext from "./contexts/MyContext";
import ContextState from "./contexts/ContextState";
import { useMemo } from "react";
import { UserAuthService } from "./services/user.service";

function App() {
  const state = ContextState();
  const store = { ...state };

  const userRole = getStorage("role");
  const userName = getStorage("user");

  useMemo(async () => {
    if (userRole && userName) {
      const res = await UserAuthService(userName,userRole);
      if (res) {
        if (res.status === "200") {
          state.setUserData(res.data);
        } else if (res.status === "401") {
          removeAllStorage();
        }
      }
    }
  }, []);


  return (
    <MyContext.Provider value={store}>
      <div className="w-full h-full">
        {userRole && userName ? (
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard/home" replace />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        )}
      </div>
    </MyContext.Provider>
  );
}

export default App;
