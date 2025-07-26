"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Users, Heart, Shield, Star, Clock, 
  MapPin, Phone, Mail, Calendar, Trophy, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { hotelData } from '@/lib/hotelData';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const stats = [
    { icon: Calendar, label: "Years of Excellence", value: "25+" },
    { icon: Users, label: "Happy Guests", value: "50K+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Star, label: "Average Rating", value: "4.9" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Exceptional Service",
      description: "We believe in creating memorable experiences through personalized attention and genuine care for every guest."
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "Our commitment to excellence and consistency has earned us the trust of guests from around the world."
    },
    {
      icon: Target,
      title: "Attention to Detail",
      description: "Every aspect of your stay is carefully curated to ensure perfection in comfort, luxury, and service."
    },
    {
      icon: Trophy,
      title: "Continuous Innovation",
      description: "We constantly evolve and improve our services to exceed expectations and set new standards in hospitality."
    }
  ];

  const milestones = [
    {
      year: "1998",
      title: "Grand Opening",
      description: "Luxury Grand Hotel opened its doors with 50 rooms and a vision to redefine luxury hospitality."
    },
    {
      year: "2005",
      title: "First Award",
      description: "Received our first 'Hotel of the Year' award, marking our commitment to excellence."
    },
    {
      year: "2012",
      title: "Major Renovation",
      description: "Completed a $20M renovation, adding the spa, rooftop bar, and modernizing all facilities."
    },
    {
      year: "2018",
      title: "Sustainability Initiative",
      description: "Launched our green hospitality program, becoming carbon neutral and eco-certified."
    },
    {
      year: "2023",
      title: "Digital Innovation",
      description: "Introduced cutting-edge technology for seamless guest experiences and smart room features."
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
              About {hotelData.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Discover the story behind our commitment to luxury, excellence, and creating unforgettable experiences for every guest who walks through our doors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90 text-white text-lg px-8 py-4">
                  Contact Us
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-dark text-lg px-8 py-4">
                  View Gallery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hotel Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-luxury-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 1998 with a vision to create an oasis of luxury and comfort, {hotelData.name} has been setting the standard for exceptional hospitality for over two decades.
                </p>
                <p>
                  What began as a boutique hotel with 50 rooms has evolved into a world-class destination that seamlessly blends timeless elegance with modern sophistication. Our journey has been marked by continuous innovation, unwavering commitment to service excellence, and a deep understanding of what makes a stay truly memorable.
                </p>
                <p>
                  Located in the heart of the city, we have witnessed and contributed to the transformation of our neighborhood while maintaining our core values of warmth, authenticity, and attention to detail that our guests have come to expect and cherish.
                </p>
                <p>
                  Today, we stand proud as a beacon of luxury hospitality, having welcomed over 50,000 guests from around the world and earned numerous accolades for our service, sustainability efforts, and contribution to the local community.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Hotel History"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/30 to-transparent" />
              </div>
              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-6 border-l-4 border-luxury-gold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-luxury-dark">25+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-luxury-dark to-luxury-dark/90">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and the trust our guests place in us.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-luxury-gold/20 rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-10 h-10 text-luxury-gold group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape every interaction with our guests.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <value.icon className="w-8 h-8 text-luxury-gold group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-luxury-dark group-hover:text-luxury-gold transition-colors duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that have shaped our evolution into the luxury destination we are today.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex items-center mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-luxury-gold/20" />
                
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-luxury-gold rounded-full border-4 border-white shadow-lg z-10"
                  whileHover={{ scale: 1.2 }}
                />
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'ml-auto pl-8'}`}>
                  <motion.div
                    className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-luxury-gold"
                    whileHover={{ scale: 1.02, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-2xl font-bold text-luxury-gold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-luxury-dark mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals who make every stay exceptional through their dedication and expertise.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {hotelData.teamMembers.map((member, index) => (
              <motion.div key={member.id} variants={itemVariants}>
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-luxury-dark group-hover:text-luxury-gold transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-luxury-gold font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-luxury-gold hover:bg-luxury-gold hover:text-white"
                        onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-luxury-gold hover:bg-luxury-gold hover:text-white"
                        onClick={() => window.open(`tel:${hotelData.contact.phone}`, '_blank')}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location & Contact Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-luxury-dark mb-6">
                Visit Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-luxury-dark mb-1">Address</h3>
                    <p className="text-gray-600">{hotelData.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-luxury-dark mb-1">Phone</h3>
                    <p className="text-gray-600">{hotelData.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-luxury-dark mb-1">Email</h3>
                    <p className="text-gray-600">{hotelData.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-luxury-dark mb-1">Reception Hours</h3>
                    <p className="text-gray-600">24/7 - We're always here for you</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="btn-luxury">
                    Get Directions
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Hotel Location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Prime Location</h3>
                  <p className="text-gray-200">
                    Situated in the heart of the city, we offer easy access to major attractions, business districts, and cultural landmarks.
                  </p>
                </div>
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
              Become Part of Our Story
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the thousands of guests who have made {hotelData.name} their home away from home. Your story begins here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms">
                <Button size="lg" className="bg-white text-luxury-gold hover:bg-gray-100 text-lg px-8 py-4">
                  Book Your Stay
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-luxury-gold text-lg px-8 py-4"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;