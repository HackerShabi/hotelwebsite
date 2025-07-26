"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hotelData } from '@/lib/hotelData';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

interface LightboxProps {
  images: typeof hotelData.galleryImages;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}

        {/* Image Container */}
        <motion.div
          className="relative max-w-7xl max-h-[90vh] mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentImage.url}
            alt={currentImage.title}
            width={1200}
            height={800}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            priority
          />
          
          {/* Image Info */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white text-xl font-bold mb-2">{currentImage.title}</h3>
            <p className="text-gray-300 mb-4">{currentImage.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                {currentIndex + 1} of {images.length}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = currentImage.url;
                    link.download = `${currentImage.title}.jpg`;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: currentImage.title,
                        text: currentImage.description,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState(hotelData.galleryImages);

  const categories = [
    { id: 'all', name: 'All Photos', count: hotelData.galleryImages.length },
    { id: 'rooms', name: 'Rooms & Suites', count: hotelData.galleryImages.filter(img => img.category === 'rooms').length },
    { id: 'restaurant', name: 'Restaurant', count: hotelData.galleryImages.filter(img => img.category === 'restaurant').length },
    { id: 'amenities', name: 'Amenities', count: hotelData.galleryImages.filter(img => img.category === 'amenities').length },
    { id: 'exterior', name: 'Hotel Exterior', count: hotelData.galleryImages.filter(img => img.category === 'exterior').length },
  ];

  React.useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(hotelData.galleryImages);
    } else {
      setFilteredImages(hotelData.galleryImages.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
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
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Discover the elegance and luxury that awaits you through our curated collection of stunning photography showcasing every corner of our magnificent hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rooms">
                <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold/90 text-white text-lg px-8 py-4">
                  Book Your Stay
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-dark text-lg px-8 py-4">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-luxury-gold text-white hover:bg-luxury-gold/90'
                    : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory} // Re-animate when category changes
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${selectedCategory}-${image.id}`}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <ZoomIn className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 text-xl">No images found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Highlights */}
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
              Featured Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the pinnacle of luxury through these carefully selected moments that capture the essence of our hotel.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Large Featured Image */}
            <motion.div
              variants={itemVariants}
              className="lg:row-span-2 group cursor-pointer"
              onClick={() => {
                const featuredIndex = hotelData.galleryImages.findIndex(img => img.featured);
                if (featuredIndex !== -1) {
                  setSelectedCategory('all');
                  setTimeout(() => openLightbox(featuredIndex), 100);
                }
              }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 aspect-[4/5]">
                <Image
                  src={hotelData.galleryImages.find(img => img.featured)?.url || hotelData.galleryImages[0].url}
                  alt={hotelData.galleryImages.find(img => img.featured)?.title || hotelData.galleryImages[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {hotelData.galleryImages.find(img => img.featured)?.title || hotelData.galleryImages[0].title}
                  </h3>
                  <p className="text-gray-200">
                    {hotelData.galleryImages.find(img => img.featured)?.description || hotelData.galleryImages[0].description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <ZoomIn className="w-16 h-16 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Smaller Featured Images */}
            <div className="space-y-8">
              {hotelData.galleryImages.slice(1, 3).map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => {
                    const imageIndex = hotelData.galleryImages.findIndex(img => img.id === image.id);
                    setSelectedCategory('all');
                    setTimeout(() => openLightbox(imageIndex), 100);
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 aspect-[3/2]">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-lg font-bold mb-1">{image.title}</h4>
                      <p className="text-gray-200 text-sm line-clamp-2">{image.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <ZoomIn className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              Experience It Yourself
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              These images only capture a glimpse of the luxury that awaits. Book your stay and create your own unforgettable memories.
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
                  Plan Your Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </Layout>
  );
};

export default GalleryPage;