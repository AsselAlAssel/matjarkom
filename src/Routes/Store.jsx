import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Services from "../components/Services/Services.jsx";
import Banner from "../components/Banner/Banner.jsx";
import headphone from "../assets/hero/headphone.png";
import Products from "../components/Products/Products.jsx";
import Blogs from "../components/Blogs/Blogs.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Popup from "../components/Popup/Popup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { useStoreProducts, useStoreProfile } from "../hooks/useMerchant.js";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Stores/project/auth.js";

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};
const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const user = useSelector(selectUser);
  const isOwner = user?.email === email && user?.isMerchant;
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);
  const { data } = useStoreProfile(email);
  const { data: productsData } = useStoreProducts(email);
  const profile = productsData?.data;
  const products = productsData?.data.type;
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar logo={profile?.storeName} logoLink={`/store?email=${email}`} />
      {!user.isMerchant && profile?.storeSliderImages?.length === 0 ? null : (
        <Hero images={profile?.storeSliderImages} />
      )}
      {!user.isMerchant &&
      profile?.specificStoreCategories?.length === 0 ? null : (
        <Categories categories={profile?.specificStoreCategories} />
      )}
      <Services />
      {/* <Banner data={BannerData} /> */}
      <Products products={products} email={email} />
      {/* <Blogs /> */}
      <Footer />

      <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
    </div>
  );
};

export default Home;
