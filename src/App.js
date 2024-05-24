import HomeContent from "./pages/HomeContent.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  link
} from "react-router-dom"

import Cart from "./pages/Cart.jsx"
import Loginpage from "./screens/LoginScreen.jsx";
import SignupPage from "./screens/SignupScreen.jsx";
import Layout from "./layout/Layout.js";
import AddAddress from "./components/Addadress.jsx";
import AboutUs from "../src/components/Aboutus.jsx";
import ContactUs from "./components/Contactus.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import CancellationRefundPolicy from "./components/CancellationRefundPolicy.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";

function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Layout children={<HomeContent />} />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<Layout children={<Cart />} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/TermsandConditions" element={<TermsAndConditions/>} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/CancellationandRefund" element={<CancellationRefundPolicy />} />
          <Route path="/OrderHistory" element={<Layout children={<OrderHistory />}/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
