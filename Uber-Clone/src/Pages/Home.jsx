import React from "react";
import HeroSection from "../Components/HeroSection";
import Suggestions from "../Components/Suggestions";
import Activity from "../Components/Activity";
import Drive from "../Components/Drive";
import Footer from "../Components/Footer";
const Home = () => {
  return (
    <>
      <HeroSection />
      <Suggestions />
      <Activity />
      <Drive />
      <Footer/>
    </>
  );
};

export default Home;
