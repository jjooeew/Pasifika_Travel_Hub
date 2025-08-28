import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ThingstodoPage from "./pages/ThingstodoPage";
import LanguagePage from "./pages/LanguagePage";
import KidsPage from "./pages/KidsPage";
import Footer from "./components/Footer/Footer";
import HistoryPage from "./pages/HistoryPage";
import SamoaHome from "./pages/SamoaHome";
import TongaHome from "./pages/TongaHome";
import FijiHome from "./pages/FijiHome";
import AddCountry from "./pages/AddCountry";
import AddActivity from "./pages/AddActivity";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Routes
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCountries from "./pages/admin/ManageCountries";
import EditCountry from "./pages/admin/EditCountry";
import AdminLayout from "./pages/admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/things-to-do" element={<ThingstodoPage />} />
          <Route path="/:country/things-to-do" element={<ThingstodoPage />} />
          <Route path="/language" element={<LanguagePage />} />
          <Route path="/:country/language" element={<LanguagePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/:country/history" element={<HistoryPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/samoa" element={<SamoaHome />} />
          <Route path="/fiji" element={<FijiHome />} />
          <Route path="/tonga" element={<TongaHome />} />
          <Route
            path="/admin/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route
              path="add-country"
              element={
                <AdminRoute>
                  <AddCountry />
                </AdminRoute>
              }
            />
            <Route
              path="add-activity/:slug"
              element={
                <AdminRoute>
                  <AddActivity />
                </AdminRoute>
              }
            />
            <Route
              path="countries"
              element={
                <AdminRoute>
                  <ManageCountries />
                </AdminRoute>
              }
            />
            <Route
              path="countries/:slug/edit"
              element={<EditCountry />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
