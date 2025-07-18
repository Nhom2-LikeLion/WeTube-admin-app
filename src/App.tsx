import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import TopNav from "./components/layouts/TopNav";
import { ManageVideosPage } from "./components/pages/ManageVideosPage";
import { ManageChannelPage } from "./components/pages/ManageChannelPage";
import { ManageManagersPage } from "./components/pages/ManageManagersPage";
import { ViewStatsPage } from "./components/pages/ViewStatsPage";
import DashboardPage from "./components/pages/DashboardPage";
import VideoManagement from './components/pages/videoPage/VideoManagement';
import LoginPage from './components/pages/authPage/LoginPage';
import RequireRole from './components/pages/authPage/RequireRole'; // đường dẫn đúng tới file RequireRole.tsx

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  // Nếu chưa login mà không phải trang login -> chuyển về login
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login mà đang ở trang login -> chuyển về /
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <>
          <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 z-50">
            <Sidebar />
          </div>
          <div className="fixed top-0 left-64 right-0 bg-white z-40">
            <TopNav />
          </div>
        </>
      )}

      <div className={isAuthenticated ? "ml-64 pt-16 min-h-screen" : ""}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/" element={
            <RequireRole allowRoles={["admin"]}>
              <DashboardPage />
            </RequireRole>
            } 
            />
          <Route path="/manage-videos" element={<VideoManagement />} />
          <Route path="/manage-channels" element={<ManageChannelPage />} />
          <Route
            path="/manage-managers"
            element={
              <RequireRole allowRoles={["admin"]}>
                <ManageManagersPage />
              </RequireRole>
            }
          />
          <Route path="/view-stats" element={<ViewStatsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
