import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from '../Components/About';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Home from '../Components/Home'; // Assuming you have a Home component
import ContactUs from '../Components/ContactUs';
import Membership from '../Components/Membership';
import Services from '../Components/Services';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header /> {/* Header stays consistent across all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/membership" element={<Membership/>} />
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> Example Profile Route */}
      </Routes>
      <Footer /> {/* Footer stays consistent across all pages */}
    </BrowserRouter>
  );
}

export default AppRoutes;
