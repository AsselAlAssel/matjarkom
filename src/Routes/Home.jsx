import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories.jsx";
import Services from "../components/Services/Services";
import Partners from "../components/Partners/Partners.jsx";
import Banner from "../components/Banner/Banner";
import headphone from "../assets/hero/headphone.png";
import Products from "../components/Products/Products";
import Blogs from "../components/Blogs/Blogs";
import Footer from "../components/Footer/Footer.jsx";
import Popup from "../components/Popup/Popup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import CategoryForm from "../components/CategoryForm/CategoryForm.jsx";

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
  const [openCategoryForm, setOpenCategoryForm] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

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

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar />
      <Hero />
      <Categories
        openCategoryForm={() => setOpenCategoryForm(true)}
        handleOrderPopup={handleOrderPopup}
        setSelectedCategory={setSelectedCategory}
      />
      <Services />
      <Banner data={BannerData} />
      <Products />
      <Blogs />
      <Partners />
      <Footer />
      <CategoryForm
        open={openCategoryForm}
        handleClose={() => {
          setOpenCategoryForm(false);
          setSelectedCategory(null);
        }}
        selectedCategory={selectedCategory}
      />
      <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
    </div>
  );
};

export default Home;
