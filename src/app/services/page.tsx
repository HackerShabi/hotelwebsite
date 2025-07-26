"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, Car, Coffee, Dumbbell, Utensils, Waves, Spa, 
  Plane, Shield, Clock, Users, Star, Phone, MapPin 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { hotelData } from '@/lib/hotelData';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const ServicesPage = () => {
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

  const iconMap = {
    'Wifi': Wifi,
    'Car': Car,
    'Coffee': Coffee,
    'Dumbbell': Dumbbell,
    'Utensils': Utensils,
    'Waves': Waves,
    'Spa': Spa,
    'Plane': Plane,
    'Shield': Shield,
    'Clock': Clock,
    'Users': Users,
    'Star': Star,
    'Phone': Phone,
    'MapPin': MapPin,
  };

  const serviceCategories = [
    {
      title: "Essential Services",
      description: "Core amenities for your comfort and convenience",
      services: hotelData.services.filter(service => 
        ['Free WiFi', 'Concierge Service', '24/7 Room Service', 'Valet Parking'].includes(service.name)
      )
    },
    {
      title: "Wellness & Recreation",
      description: "Rejuvenate your body and mind with our premium facilities",
      services: hotelData.services.filter(service => 
        ['Fitness Center', 'Spa & Wellness', 'Swimming Pool', 'Yoga Classes'].includes(service.name)
      )
    },
    {
      title: "Dining & Entertainment",
      description: "Culinary excellence and entertainment options",
      services: hotelData.services.filter(service => 
        ['Fine Dining Restaurant', 'Rooftop Bar', 'In-Room Dining', 'Live Entertainment'].includes(service.name)
      )
    },
    {
      title: "Business & Events",
      description: "Professional services for business travelers and events",
      services: hotelData.services.filter(service => 
        ['Business Center', 'Conference Rooms', 'Event Planning', 'Airport Shuttle'].includes(service.name)
      )
    }
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
              Premium Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Experience world-class amenities and personalized services designed to exceed your expectations at every moment of your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90 text-white text-lg px-8 py-4">
                  Request Service
                </Button>
              </Link>
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-dark text-lg px-8 py-4">
                  View Rooms
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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
              Exceptional Experiences Await
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the moment you arrive until your departure, our comprehensive range of services ensures every aspect of your stay is perfectly orchestrated.
            </p>
          </motion.div>

          {/* Service Categories */}
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="mb-20 last:mb-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-luxury-dark mb-4">
                  {category.title}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.services.map((service, index) => {
                  const IconComponent = iconMap[service.icon] || Star;
                  
                  const getServiceBackground = (serviceName) => {
                    const backgrounds = {
                      'Free WiFi': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
                      'Concierge Service': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
                      '24/7 Room Service': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                      'Valet Parking': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                      'Fitness Center': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                      'Spa & Wellness': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
                      'Swimming Pool': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
                      'Yoga Classes': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
                      'Fine Dining Restaurant': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
                      'Rooftop Bar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop',
                      'In-Room Dining': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                      'Live Entertainment': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
                      'Business Center': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
                      'Conference Rooms': 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400&h=300&fit=crop',
                      'Event Planning': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
                      'Airport Shuttle': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'
                    };
                    return backgrounds[serviceName] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
                  };
                  
                  return (
                    <motion.div key={service.id} variants={itemVariants}>
                      <Card className="group text-center hover:shadow-2xl transition-all duration-500 border-0 h-full relative overflow-hidden">
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                          style={{ backgroundImage: `url(${getServiceBackground(service.name)})` }}
                        />
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-luxury-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <CardHeader className="relative z-10">
                          <motion.div
                            className="w-20 h-20 mx-auto mb-6 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover:bg-luxury-gold group-hover:scale-110 transition-all duration-500"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-10 h-10 text-luxury-gold group-hover:text-white transition-colors duration-300" />
                          </motion.div>
                          <CardTitle className="text-xl font-bold text-luxury-dark group-hover:text-luxury-gold transition-colors duration-300">
                            {service.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                            {service.description}
                          </CardDescription>
                          
                          {/* Service Features */}
                          {service.features && (
                            <div className="space-y-2 mb-6">
                              {service.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-center justify-center text-sm text-gray-500">
                                  <Star className="w-3 h-3 text-luxury-gold mr-2" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ y: 10 }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Button 
                              size="sm" 
                              className="btn-luxury text-sm px-6"
                              onClick={() => window.open(`https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=I'm interested in ${service.name}`, '_blank')}
                            >
                              Learn More
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Services Highlight */}
      <section className="py-20 bg-gradient-to-br from-luxury-dark to-luxury-dark/90 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Signature Experiences
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our exclusive premium services that set us apart and create unforgettable memories.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: 'Spa',
                title: "Luxury Spa Treatments",
                description: "Indulge in our world-class spa with treatments inspired by ancient wellness traditions and modern techniques.",
                features: ["Couples Massage Suites", "Aromatherapy Sessions", "Wellness Consultations"]
              },
              {
                icon: 'Utensils',
                title: "Michelin-Star Dining",
                description: "Experience culinary excellence with our award-winning chefs creating innovative dishes using the finest ingredients.",
                features: ["Chef's Tasting Menu", "Wine Pairing Events", "Private Dining Rooms"]
              },
              {
                icon: 'Users',
                title: "Personal Concierge",
                description: "Your dedicated concierge team is available 24/7 to fulfill any request and ensure your stay exceeds expectations.",
                features: ["Personal Shopping", "Event Planning", "Local Experiences"]
              }
            ].map((service, index) => {
              const IconComponent = iconMap[service.icon] || Star;
              return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full group hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-8 h-8 text-luxury-gold group-hover:text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-center">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-200 text-center mb-6">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <Star className="w-3 h-3 text-luxury-gold mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
            })}
          </motion.div>
        </div>
      </section>

      {/* Service Hours & Contact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-luxury-dark mb-6">
                Service Information
              </h2>
              <p className="text-xl text-gray-600">
                Our dedicated team is here to assist you around the clock.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-luxury-dark">
                    <Clock className="w-6 h-6 mr-3 text-luxury-gold" />
                    Service Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Concierge</span>
                      <span className="text-gray-600">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Room Service</span>
                      <span className="text-gray-600">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Spa & Wellness</span>
                      <span className="text-gray-600">6:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fitness Center</span>
                      <span className="text-gray-600">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Restaurant</span>
                      <span className="text-gray-600">6:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Business Center</span>
                      <span className="text-gray-600">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-luxury-dark">
                    <Phone className="w-6 h-6 mr-3 text-luxury-gold" />
                    Contact Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-1">General Services</p>
                      <p className="text-gray-600">{hotelData.contact.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Concierge Direct</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Spa Reservations</p>
                      <p className="text-gray-600">+1 (555) 123-4568</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Dining Reservations</p>
                      <p className="text-gray-600">+1 (555) 123-4569</p>
                    </div>
                    <div className="pt-4 border-t">
                      <Link href="/contact">
                        <Button className="w-full btn-luxury">
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
              Book your stay today and discover why our guests return time and time again for our exceptional service.
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
                onClick={() => window.open(`https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=I'd like to learn more about your services`, '_blank')}
              >
                Chat with Concierge
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;