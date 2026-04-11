import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ValueProposition from '../components/ValueProposition';
import CategoryGrid from '../components/CategoryGrid';
import NewArrivals from '../components/NewArrivals';
import SellerSpotlight from '../components/SellerSpotlight';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import ChatbotAssistant from '../components/ChatbotAssistant';
import CartPayment from '../components/CartPayment';

const Home: React.FC = () => {
  const [language, setLanguage] = useState('English');

  return (
    <div className="app-container">
      <Navbar currentLang={language} setLanguage={setLanguage} />
      <main>
        <Hero />
        <ValueProposition />
        <CategoryGrid />
        <NewArrivals />
        <SellerSpotlight />
        <HowItWorks currentLang={language} />
      </main>
      <Footer currentLang={language} setLanguage={setLanguage} />
      <ChatbotAssistant />
      <CartPayment />
    </div>
  );
};

export default Home;
