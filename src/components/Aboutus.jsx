import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/aboutus.css'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-us">
      <h2>About Us</h2>
      <p>
        <div className="text">Company Name: CaterOrange</div>
        <div className="text">Company Owner: Abhishek Susarla</div>
        <div className="text">Location: Alliance Pro Building, First Floor, Vittal Rao Nagar, Madhapur, Hyderabad, 500081, Telangana</div>
        <div className="subheading">Our Mission:</div>
        <div className="text">At CaterOrange, our mission is to provide delicious meals and exceptional catering services to our customers, ensuring satisfaction with every bite.</div>
        <div className="subheading">Our Vision:</div>
        <div className="text">We envision becoming the leading provider of food delivery and catering services, recognized for our quality, reliability, and customer-centric approach.</div>
        <div className="subheading">Our Values:</div>
        <div className="text">- Quality: We are committed to delivering high-quality meals made with fresh ingredients and prepared with care.</div>
        <div className="text">- Customer Satisfaction: We prioritize customer satisfaction and strive to exceed expectations in every aspect of our service.</div>
        <div className="text">- Integrity: We conduct our business with honesty, transparency, and integrity, building trust with our customers and partners.</div>
        <div className="text">- Innovation: We embrace innovation and continuously seek new ways to enhance our offerings and improve the customer experience.</div>
      </p>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;


// import React from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const AboutUs = () => {
//   return (
    
//     <div className="about-us">
//         <Navbar/>
//       <h2>About Us</h2>
//       <p>
//         Founded in 2024 by Abhishek Susarla, CaterOrange is dedicated to revolutionizing the way office workers enjoy their meals. We are passionate about providing convenient and delicious meals right to your office desk. Our mission is to make lunchtime hassle-free for busy employees, ensuring they have access to a variety of tasty options without ever having to leave their workplace.
//       </p>
//       <p>
//         Our values revolve around convenience, quality, and customer satisfaction. We strive to offer a seamless ordering experience, using only the freshest ingredients to prepare mouthwatering meals that exceed expectations. With a focus on innovation and efficiency, we're committed to redefining the way people enjoy their lunch breaks.
//       </p>
//       <p>
//         What sets us apart is our dedication to meeting the unique needs of office workers. From quick delivery times to customizable menus, we understand the demands of a busy workday and aim to simplify mealtime for professionals everywhere.
//       </p>
//       <Footer/>
//     </div>
//   );
// }

// export default AboutUs;
