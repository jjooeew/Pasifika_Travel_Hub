import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  NavBar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* stub routes for now */}
        <Route path="/things-to-do" element={<h1>Things to do</h1>} />
        <Route path="/language"     element={<h1>Language</h1>} />
        <Route path="/history"      element={<h1>History</h1>} />
        <Route path="/kids"         element={<h1>Kids</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
