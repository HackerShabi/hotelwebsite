"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hotelData } from '@/lib/hotelData';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-luxury-900 text-white py-2 px-4 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{hotelData.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{hotelData.contact.email}</span>
            </div>
          </div>
          <div className="text-gold-400">
            {hotelData.tagline}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-md shadow-sm"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {hotelData.name.charAt(0)}
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  "text-xl font-bold transition-colors",
                  isScrolled ? "text-gray-900" : "text-gray-900"
                )}>
                  {hotelData.name}
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium transition-colors hover:text-orange-500 relative group",
                    isScrolled ? "text-gray-700" : "text-gray-700"
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="luxury"
                size="lg"
                asChild
              >
                <Link href="/booking">
                  Book Now
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t shadow-lg"
            >
              <div className="container-custom py-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 hover:text-orange-500 font-medium py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button variant="luxury" size="lg" className="w-full" asChild>
                      <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className={cn(
        "transition-all duration-300",
        isScrolled ? "h-16 md:h-20" : "h-24 md:h-28"
      )} />
    </>
  );
};

export default Header;