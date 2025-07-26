"use client";

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppChat from '../common/WhatsAppChat';
import PageTransition from '../common/PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <PageTransition className="flex-1">
          <main className="flex-1">
            {children}
          </main>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Layout;