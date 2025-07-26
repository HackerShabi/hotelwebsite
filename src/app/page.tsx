"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Star, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import ScrollAnimation from '@/components/common/ScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { hotelData } from '@/lib/hotelData';
import { useRooms, useServices } from '@/hooks/useHotelData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Icon mapping for services
const iconMap: { [key: string]: string | React.ComponentType } = {
  '🧘‍♀️': '🧘‍♀️',
  '🍽️': '🍽️',
  '💪': '💪',
  '💼': '💼',
  '🛎️': '🛎️',
  '🏊‍♂️': '🏊‍♂️',
  'Wifi': Wifi,
  'Car': Car,
  'Coffee': Coffee,
  'Dumbbell': Dumbbell
};

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    comment: "Absolutely stunning hotel with exceptional service. The ocean view from our suite was breathtaking!"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Tokyo, Japan",
    comment: "Perfect location and amenities. The staff went above and beyond to make our stay memorable."
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    comment: "Luxurious accommodations with attention to every detail. Will definitely return on our next visit."
  }
];

const HomePage: React.FC = () => {
  const { rooms: featuredRooms, loading: roomsLoading } = useRooms(true);
  const { services: featuredServices, loading: servicesLoading } = useServices(true);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        <motion.div
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 luxury-gradient bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {hotelData.name}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {hotelData.description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link href="/rooms">
              <Button size="lg" className="btn-luxury text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Stay
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-black">
                Discover More
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="slideUp" delay={0.2}>
            <div className="max-w-4xl mx-auto">
            <Card className="glass-effect border-0 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-luxury-dark">
                  Quick Reservation
                </CardTitle>
                <CardDescription>
                  Check availability and book your perfect stay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Link href="/rooms" className="w-full">
                      <Button className="w-full btn-luxury">
                        Check Availability
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fadeUp" delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-luxury-dark mb-4">
                Luxurious Accommodations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience unparalleled comfort in our carefully designed rooms and suites
              </p>
            </div>
          </ScrollAnimation>

          {roomsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="overflow-hidden border-0">
                    <div className="h-64 bg-gray-300"></div>
                    <CardHeader>
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredRooms?.map((room, index) => (
                <motion.div key={room._id} variants={itemVariants}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0">
                    <div className="relative h-64 overflow-hidden">
                      {room.images && room.images.length > 0 ? (
                        <img 
                          src={room.images[0]} 
                          alt={room.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-luxury-dark bg-cover bg-center group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <div className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${room.price}/night
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-luxury-dark group-hover:text-luxury-gold transition-colors">
                        {room.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {room.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {room.maxGuests} guests
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {room.size} m²
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <Link href={`/rooms/${room.id}`}>
                        <Button className="w-full btn-luxury">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          <ScrollAnimation animation="fadeUp" delay={0.5}>
            <div className="text-center mt-12">
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white">
                  View All Rooms
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-4">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Indulge in our world-class amenities and personalized services
            </p>
          </motion.div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <Card className="text-center border-0 h-full">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full"></div>
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredServices?.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Wifi;
                const isEmoji = typeof IconComponent === 'string';

                return (
                  <motion.div key={service._id} variants={itemVariants}>
                    <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 h-full">
                      <CardHeader>
                        <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold/10 rounded-full flex items-center justify-center group-hover:bg-luxury-gold group-hover:text-white transition-all duration-300">
                          {isEmoji ? (
                            <span className="text-2xl">{IconComponent}</span>
                          ) : (
                            <IconComponent className="w-8 h-8 text-luxury-gold group-hover:text-white" />
                          )}
                        </div>
                        <CardTitle className="text-xl font-bold text-luxury-dark">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600">
                          {service.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white">
                Explore All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-luxury-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Discover why travelers choose us for their perfect getaway
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                      ))}
                    </div>
                    <CardDescription className="text-black text-base italic">
                      "{testimonial.comment}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{testimonial.name}</p>
                        <p className="text-sm text-black">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-4">
              Explore Nearby Attractions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover famous places and attractions within walking distance of our hotel
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Central Park",
                distance: "0.3 km",
                description: "Beautiful urban park perfect for morning walks and relaxation",
                image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop",
                type: "Park"
              },
              {
                name: "Metropolitan Museum",
                distance: "0.8 km",
                description: "World-renowned art museum with extensive collections",
                image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&h=300&fit=crop",
                type: "Museum"
              },
              {
                name: "Times Square",
                distance: "1.2 km",
                description: "Iconic entertainment and shopping district",
                image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
                type: "Entertainment"
              },
              {
                name: "Broadway Theater District",
                distance: "1.5 km",
                description: "Home to world-class theatrical performances",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                type: "Theater"
              },
              {
                name: "Fifth Avenue Shopping",
                distance: "0.6 km",
                description: "Luxury shopping destination with flagship stores",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
                type: "Shopping"
              },
              {
                name: "Rockefeller Center",
                distance: "1.0 km",
                description: "Historic landmark with observation deck and ice rink",
                image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=400&h=300&fit=crop",
                type: "Landmark"
              }
            ].map((place, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                        {place.distance}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-luxury-dark px-3 py-1 rounded-full text-sm font-medium">
                        {place.type}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-luxury-dark mb-2">{place.name}</h3>
                    <p className="text-gray-600">{place.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-luxury-dark mb-4">
              Find Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Located in the heart of the city with easy access to major attractions
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-96 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959729807!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location"
              ></iframe>
            </div>
            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-luxury-dark mb-2">Address</h3>
                  <p className="text-gray-600">
                    {hotelData.address.street}<br />
                    {hotelData.address.city}, {hotelData.address.state} {hotelData.address.zipCode}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-luxury-dark mb-2">Phone</h3>
                  <p className="text-gray-600">
                    {hotelData.contact.phone}<br />
                    Available 24/7
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-luxury-dark mb-2">Email</h3>
                  <p className="text-gray-600">
                    {hotelData.contact.email}<br />
                    Quick Response Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark via-luxury-gold/20 to-luxury-dark" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Book your stay today and discover the perfect blend of luxury, comfort, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/rooms">
                <Button size="lg" className="btn-luxury text-lg px-8 py-4">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-luxury-dark">
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

export default HomePage;
