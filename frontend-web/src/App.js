import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ThingstodoPage from "./pages/ThingstodoPage";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CountryPage from "./pages/CountryPage"

// Admin Routes
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCountries from "./pages/admin/ManageCountries";
import EditCountry from "./pages/admin/EditCountry";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminAddActivity from "./pages/admin/AddActivity";


// Need to put in as admin route?
import AddCountry from "./pages/AddCountry";



function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/countries/:slug/things-to-do" element={<ThingstodoPage />} />
          <Route path="/countries/:slug" element={<CountryPage />} />
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
            <Route
              path="countries/:slug/activities/new"
              element={
                <AdminRoute>
                  <AdminAddActivity />
                </AdminRoute>
              }
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
