import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import Listing from "./pages/Listing";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify'

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);


  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div style={{ display: 'flex' , zIndex:'1000'}}>
        
<<<<<<< HEAD
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/booking" element={<Bookings />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/contactus" element={<ContactUs />} />
            {/* <Route path="/wishlist" element={< />}/>
            <Route path="/mybooking" element={< />}/>
            <Route path="/myproperties" element={< />}/> */}
          </Routes>
        </div>
      </div>
      {!hideHeaderFooter && <Footer />}
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/booking" element={<Bookings />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      <ToastContainer />
      <Footer />
>>>>>>> 4c0591a82a72f1bfe3a703d2f7c247061f140468
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
