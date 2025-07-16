import Dashboard from "./components/pages/DashboardPage";
import Sidebar from "./components/layout/Sidebar";
import TopNav from "./components/layout/TopNav";
import { Route, Routes } from 'react-router-dom';
import Sidebar from "./components/layouts/Sidebar";
import TopNav from "./components/layouts/TopNav";
import DashboardPage from "./components/pages/DashboardPage";
import { ManageChannelPage } from './components/pages/ManageChannelPage';
import { ManageManagersPage } from './components/pages/ManageManagersPage';
import { ManageVideosPage } from './components/pages/ManageVideosPage';
import { ViewStatsPage } from './components/pages/ViewStatsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 z-20">
        <Sidebar />
      </div>
      <div className="flex flex-col min-w-0 ">
        <div className="fixed top-0 left-64 right-0 bg-white z-10">
          <TopNav />
        </div>
        <div className="ml-64 pt-16 min-h-screen">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/manage-videos"
              element={<ManageVideosPage />}
            />
            <Route
              path="/manage-channels"
              element={<ManageChannelPage />}
            />
            <Route
              path="/manage-managers"
              element={<ManageManagersPage />}
            />
            <Route
              path="/view-stats"
              element={<ViewStatsPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
