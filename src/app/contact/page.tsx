"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Facebook, Twitter, Instagram, Linkedin, Star, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { hotelData } from '@/lib/hotelData';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: hotelData.contact.address,
      action: "Get Directions",
      link: `https://maps.google.com/?q=${encodeURIComponent(hotelData.contact.address)}`
    },
    {
      icon: Phone,
      title: "Phone",
      details: hotelData.contact.phone,
      action: "Call Now",
      link: `tel:${hotelData.contact.phone}`
    },
    {
      icon: Mail,
      title: "Email",
      details: hotelData.contact.email,
      action: "Send Email",
      link: `mailto:${hotelData.contact.email}`
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: hotelData.contact.whatsapp,
      action: "Chat Now",
      link: `https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello! I'd like to inquire about your services.`
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'reservation', label: 'Reservation' },
    { value: 'event', label: 'Event Planning' },
    { value: 'corporate', label: 'Corporate Booking' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' }
  ];

  const operatingHours = [
    { day: 'Monday - Friday', hours: '24/7 Reception' },
    { day: 'Saturday - Sunday', hours: '24/7 Reception' },
    { day: 'Concierge', hours: '6:00 AM - 12:00 AM' },
    { day: 'Restaurant', hours: '6:00 AM - 11:00 PM' },
    { day: 'Spa & Wellness', hours: '6:00 AM - 10:00 PM' },
    { day: 'Business Center', hours: '24/7 Access' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-luxury-dark via-luxury-dark/90 to-luxury-gold/20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              We're here to assist you 24/7. Reach out to us for reservations, inquiries, or any assistance you may need during your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-luxury-gold hover:bg-luxury-gold/90 text-white text-lg px-8 py-4"
                onClick={() => window.open(`https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello! I'd like to inquire about your services.`, '_blank')}
              >
                Chat on WhatsApp
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-luxury-dark text-lg px-8 py-4"
                onClick={() => window.open(`tel:${hotelData.contact.phone}`, '_blank')}
              >
                Call Directly
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us - choose the method that works best for you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <info.icon className="w-8 h-8 text-luxury-gold group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-luxury-dark">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-6">
                      {info.details}
                    </CardDescription>
                    <Button
                      className="btn-luxury w-full"
                      onClick={() => window.open(info.link, '_blank')}
                    >
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-luxury-dark">
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-luxury-dark mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We'll respond within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="inquiryType">Inquiry Type</Label>
                          <select
                            id="inquiryType"
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          >
                            {inquiryTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          placeholder="Brief subject of your inquiry"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent resize-none"
                          placeholder="Please provide details about your inquiry..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-luxury text-lg py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Hours */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Google Maps Embed */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959655654!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Location"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-luxury-dark mb-2">
                    Find Us Here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {hotelData.contact.address}
                  </p>
                  <Button
                    className="btn-luxury"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(hotelData.contact.address)}`, '_blank')}
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Operating Hours */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-luxury-dark">
                    <Clock className="w-6 h-6 mr-3 text-luxury-gold" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {operatingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-luxury-dark">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-luxury-gold/10 rounded-lg">
                    <p className="text-sm text-luxury-dark font-medium">
                      <Star className="w-4 h-4 inline mr-2 text-luxury-gold" />
                      24/7 Emergency assistance available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow us on social media for the latest updates, special offers, and behind-the-scenes glimpses of luxury.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Facebook, name: 'Facebook', url: 'https://facebook.com' },
                  { icon: Instagram, name: 'Instagram', url: 'https://instagram.com' },
                  { icon: Twitter, name: 'Twitter', url: 'https://twitter.com' },
                  { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center hover:bg-luxury-gold transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-8 h-8 text-luxury-gold group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Contact Options */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Phone className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-luxury-dark mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-4">Speak directly with our team</p>
                    <Button
                      variant="outline"
                      className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white"
                      onClick={() => window.open(`tel:${hotelData.contact.phone}`, '_blank')}
                    >
                      {hotelData.contact.phone}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Mail className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-luxury-dark mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-4">Send us your inquiries</p>
                    <Button
                      variant="outline"
                      className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white"
                      onClick={() => window.open(`mailto:${hotelData.contact.email}`, '_blank')}
                    >
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <MessageCircle className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-luxury-dark mb-2">WhatsApp</h3>
                    <p className="text-gray-600 mb-4">Chat with us instantly</p>
                    <Button
                      variant="outline"
                      className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white"
                      onClick={() => window.open(`https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello! I'd like to inquire about your services.`, '_blank')}
                    >
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-gold to-luxury-gold/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't wait - contact us today to book your unforgettable stay or to learn more about our exceptional services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms">
                <Button size="lg" className="bg-white text-luxury-gold hover:bg-gray-100 text-lg px-8 py-4">
                  Book Your Stay
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-luxury-gold text-lg px-8 py-4"
                onClick={() => window.open(`https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=I'd like to make a reservation`, '_blank')}
              >
                Quick Reservation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;