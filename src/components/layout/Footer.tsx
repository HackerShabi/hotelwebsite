"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Clock,
  Star
} from 'lucide-react';
import { hotelData } from '@/lib/hotelData';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms & Suites' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    { href: '/services#spa', label: 'Spa & Wellness' },
    { href: '/services#dining', label: 'Fine Dining' },
    { href: '/services#fitness', label: 'Fitness Center' },
    { href: '/services#business', label: 'Business Center' },
    { href: '/services#concierge', label: 'Concierge' },
    { href: '/services#parking', label: 'Valet Parking' },
  ];

  const socialIcons = [
    { 
      icon: Facebook, 
      href: hotelData.socialMedia.facebook, 
      label: 'Facebook',
      color: 'hover:text-blue-500'
    },
    { 
      icon: Instagram, 
      href: hotelData.socialMedia.instagram, 
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    { 
      icon: Twitter, 
      href: hotelData.socialMedia.twitter, 
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Linkedin, 
      href: hotelData.socialMedia.linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gold-600 to-gold-500 py-12">
        <div className="container-custom">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stay Updated with Our Latest Offers
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about exclusive deals, 
                special packages, and luxury experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-gold-600 hover:bg-gray-100 font-semibold"
                >
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hotel Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {hotelData.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gold-400">
                  {hotelData.name}
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {hotelData.description}
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">5-Star Luxury Hotel</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gold-400 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-gold-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gold-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gold-400 mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link 
                      href={service.href}
                      className="text-gray-300 hover:text-gold-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gold-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gold-400 mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300">
                    <p>{hotelData.address.street}</p>
                    <p>{hotelData.address.city}, {hotelData.address.state} {hotelData.address.zipCode}</p>
                    <p>{hotelData.address.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <a 
                    href={`tel:${hotelData.contact.phone}`}
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {hotelData.contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <a 
                    href={`mailto:${hotelData.contact.email}`}
                    className="text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    {hotelData.contact.email}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300">
                    <p>Check-in: {hotelData.checkIn}</p>
                    <p>Check-out: {hotelData.checkOut}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold text-gold-400 mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialIcons.map((social) => {
                    const Icon = social.icon;
                    return social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-gray-700 ${social.color} hover:scale-110`}
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} {hotelData.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-gold-400 transition-colors">
                Sitemap
              </Link>
              <Link href="/admin" className="text-gold-400 hover:text-gold-300 transition-colors font-semibold">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;