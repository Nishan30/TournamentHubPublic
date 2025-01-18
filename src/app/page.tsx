"use client";

import React from "react";
import { Navbar } from "@/components/common";
import { Web3ModalProvider } from "@/context/Web3Modal";
import { Web3Modal } from "@web3modal/ethers";
import { Hero } from "@/components/common/Hero";
import { About } from "@/components/common/About";
import { Features } from "@/components/common/Features";
import { Testimonials } from "@/components/common/Testimonials";
import { Newsletter } from "@/components/common/Newsletter";
import { FAQ } from "@/components/common/FAQ";
import { SDKFeatures } from "@/components/common/SDK Features";
import { useEffect } from 'react';
import "./app.css"
import "./index.css"
import {
  Projects,
  UnitySDK
} from "@/components/Home";

const Home: React.FC = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <About/>
        <Features/>
        <SDKFeatures/>
        <Projects />
        <Testimonials />
        <Newsletter/>
        
        {/* <main className="flex flex-col pt-10 sm:pt-10 items-center px-2">        
          <Contact />
        </main> */}
        <FAQ/>
    </div>
  );
};

export default Home;
