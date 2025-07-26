"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Users, Wifi, Filter, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { hotelData } from '@/lib/hotelData';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const RoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [showFilters, setShowFilters] = useState(false);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = hotelData.rooms.filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = room.price >= priceRange.min && room.price <= priceRange.max;
      const matchesCapacity = capacityFilter === 'all' || 
                             (capacityFilter === '1-2' && room.maxGuests <= 2) ||
                             (capacityFilter === '3-4' && room.maxGuests >= 3 && room.maxGuests <= 4) ||
                             (capacityFilter === '5+' && room.maxGuests >= 5);
      
      return matchesSearch && matchesPrice && matchesCapacity;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'capacity':
          return b.maxGuests - a.maxGuests;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, priceRange, capacityFilter, sortBy]);

  const maxPrice = Math.max(...hotelData.rooms.map(room => room.price));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-luxury-dark via-luxury-dark/90 to-luxury-gold/20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Luxury Accommodations
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Discover our collection of elegantly appointed rooms and suites, each designed to provide the ultimate in comfort and sophistication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="h-12 px-6 lg:w-auto w-full"
              >
                <Filter className="mr-2 h-5 w-5" />
                Filters
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filters Panel */}
            <motion.div
              className={`overflow-hidden transition-all duration-300 ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              initial={false}
            >
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (per night)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange.min}</span>
                        <span>${priceRange.max}</span>
                      </div>
                    </div>
                  </div>

                  {/* Capacity Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guest Capacity
                    </label>
                    <select
                      value={capacityFilter}
                      onChange={(e) => setCapacityFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    >
                      <option value="all">All Capacities</option>
                      <option value="1-2">1-2 Guests</option>
                      <option value="3-4">3-4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    >
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="capacity">Capacity: High to Low</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setPriceRange({ min: 0, max: maxPrice });
                        setCapacityFilter('all');
                        setSortBy('price-low');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedRooms.length} of {hotelData.rooms.length} rooms
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredAndSortedRooms.map((room, index) => (
              <motion.div key={room.id} variants={itemVariants}>
                <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-luxury-dark bg-cover bg-center group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-luxury-gold text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      ${room.price}/night
                    </div>
                    
                    {/* Availability Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-luxury-gold/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-xl font-bold mb-2">View Details</h3>
                        <p className="text-sm">Discover luxury amenities</p>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-luxury-dark group-hover:text-luxury-gold transition-colors mb-2">
                          {room.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2">
                          {room.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Room Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {room.maxGuests} guests
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Ocean View
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-luxury-gold/10 text-luxury-gold text-xs rounded-full">
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link href={`/booking?roomId=${room.id}`}>
                        <Button className="w-full btn-luxury group-hover:shadow-lg transition-shadow">
                          Book Now
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Wifi className="w-3 h-3 mr-1" />
                          Free WiFi
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredAndSortedRooms.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No rooms found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find the perfect room.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange({ min: 0, max: maxPrice });
                    setCapacityFilter('all');
                    setSortBy('price-low');
                  }}
                  className="btn-luxury"
                >
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our concierge team is available 24/7 to help you find the perfect accommodation for your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90 text-white text-lg px-8 py-4">
                  Contact Concierge
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-dark text-lg px-8 py-4">
                Call: {hotelData.contact.phone}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default RoomsPage;