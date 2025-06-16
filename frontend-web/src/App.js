
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar    from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage'; 
import Footer from './components/Footer/Footer';

import SamoaHome from './pages/SamoaHome';
import TongaHome from './pages/TongaHome';
import FijiHome from './pages/FijiHome';
import ProfilePage from './pages/ProfilePage';
import AddCountry from './pages/AddCountry';



function App() {
  return (
    <BrowserRouter>
      <NavBar />

    
      <div className="page-wrapper">
        <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/things-to-do" element={<h1>Things to do</h1>} />
        <Route path="/language"     element={<h1>Language</h1>} />
        <Route path="/history"      element={<h1>History</h1>} />
        <Route path="/kids"         element={<h1>Kids</h1>} />
        <Route path="/samoa"         element={<SamoaHome />} />
        <Route path="/fiji"         element={<FijiHome />} />
        <Route path="/tonga"         element={<TongaHome />} />
        <Route path="/admin/add-country"  element={<AddCountry />} />
          
        </Routes>
      </div>

      <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
