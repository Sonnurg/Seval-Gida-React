// src/pages/Home.js
import React from 'react';
import HeroSection from '../components/HeroSection';
import PromoCards from '../components/PromoCards';
import BestSellers from '../components/BestSellers';
import ProductCards from '../components/ProductCards';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <>
      <HeroSection />
      <PromoCards />
      <BestSellers />
      <ProductCards />
      <CallToAction />
    </>
  );
};

export default Home;