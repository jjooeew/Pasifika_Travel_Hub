
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar    from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage'; 
import ProfilePage from './pages/ProfilePage';
import ThingstodoPage from './pages/ThingstodoPage';
import LanguagePage from './pages/LanguagePage';
import KidsPage from './pages/KidsPage';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <NavBar />

    
      <div className="page-wrapper">
        <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/things-to-do" element={<ThingstodoPage />} />
        <Route path="/language"     element={<LanguagePage />} />
        <Route path="/history"      element={<h1>History</h1>} />
        <Route path="/kids"         element={<KidsPage />} />
          
        </Routes>
      </div>

      <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
