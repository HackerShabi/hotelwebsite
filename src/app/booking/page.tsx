"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CreditCard, Check, ArrowLeft, MapPin, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { hotelData } from '@/lib/hotelData';
import { buildApiUrl, API_CONFIG } from '@/lib/config';

interface BookingData {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: string;
}

const BookingPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') || '';
  const selectedRoom = hotelData.rooms.find(room => room.id === roomId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    roomId,
    checkIn: '',
    checkOut: '',
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit-card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    const roomTotal = selectedRoom.price * nights;
    const tax = roomTotal * 0.12; // 12% tax
    return roomTotal + tax;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BOOKINGS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: bookingData.roomId,
          guestName: `${bookingData.firstName} ${bookingData.lastName}`,
          guestEmail: bookingData.email,
          guestPhone: bookingData.phone,
          checkInDate: bookingData.checkIn,
          checkOutDate: bookingData.checkOut,
          numberOfGuests: bookingData.guests,
          specialRequests: bookingData.specialRequests,
          totalAmount: calculateTotal(),
          paymentMethod: bookingData.paymentMethod
        }),
      });

      if (response.ok) {
        setBookingConfirmed(true);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Dates & Guests', icon: Calendar },
    { number: 2, title: 'Guest Details', icon: Users },
    { number: 3, title: 'Payment', icon: CreditCard }
  ];

  if (bookingConfirmed) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                </motion.div>
                <h1 className="text-3xl font-bold text-luxury-dark mb-4">
                  Booking Confirmed!
                </h1>
                <p className="text-gray-600 mb-8">
                  Thank you for choosing our hotel. Your reservation has been confirmed and you will receive a confirmation email shortly.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-luxury-dark mb-4">Booking Details</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span>Room:</span>
                      <span className="font-medium">{selectedRoom?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guest:</span>
                      <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span className="font-medium">{bookingData.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span className="font-medium">{bookingData.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span className="font-medium">{bookingData.guests}</span>
                    </div>
                    <div className="flex justify-between font-bold text-luxury-gold">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button className="btn-luxury">
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/rooms">
                    <Button variant="outline" className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white">
                      Book Another Room
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!selectedRoom) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-luxury-dark mb-4">Room Not Found</h1>
            <p className="text-gray-600 mb-8">The selected room could not be found.</p>
            <Link href="/rooms">
              <Button className="btn-luxury">
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-luxury-dark mb-4">
              Complete Your Booking
            </h1>
            <p className="text-xl text-gray-600">
              Just a few more steps to secure your luxury stay
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-luxury-gold border-luxury-gold text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-luxury-gold' : 'text-gray-400'
                    }`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-luxury-gold' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-luxury-dark">
                      {steps[currentStep - 1].title}
                    </CardTitle>
                    <CardDescription>
                      {currentStep === 1 && "Select your check-in and check-out dates"}
                      {currentStep === 2 && "Please provide your contact information"}
                      {currentStep === 3 && "Choose your payment method"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Step 1: Dates & Guests */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="checkIn">Check-in Date</Label>
                            <Input
                              id="checkIn"
                              name="checkIn"
                              type="date"
                              value={bookingData.checkIn}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="checkOut">Check-out Date</Label>
                            <Input
                              id="checkOut"
                              name="checkOut"
                              type="date"
                              value={bookingData.checkOut}
                              onChange={handleInputChange}
                              min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="guests">Number of Guests</Label>
                          <select
                            id="guests"
                            name="guests"
                            value={bookingData.guests}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                          >
                            {[...Array(selectedRoom.maxGuests)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1} Guest{i > 0 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Guest Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={bookingData.firstName}
                              onChange={handleInputChange}
                              required
                              className="mt-1"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={bookingData.lastName}
                              onChange={handleInputChange}
                              required
                              className="mt-1"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={bookingData.email}
                              onChange={handleInputChange}
                              required
                              className="mt-1"
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={bookingData.phone}
                              onChange={handleInputChange}
                              required
                              className="mt-1"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                          <textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={bookingData.specialRequests}
                            onChange={handleInputChange}
                            rows={4}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent resize-none"
                            placeholder="Any special requests or preferences..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <Label>Payment Method</Label>
                          <div className="mt-3 space-y-3">
                            {[
                              { id: 'credit-card', label: 'Credit Card', icon: CreditCard },
                              { id: 'paypal', label: 'PayPal', icon: CreditCard },
                              { id: 'bank-transfer', label: 'Bank Transfer', icon: CreditCard }
                            ].map((method) => (
                              <label key={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={method.id}
                                  checked={bookingData.paymentMethod === method.id}
                                  onChange={handleInputChange}
                                  className="mr-3"
                                />
                                <method.icon className="w-5 h-5 mr-3 text-luxury-gold" />
                                <span className="font-medium">{method.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {bookingData.paymentMethod === 'credit-card' && (
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="mt-1"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      
                      {currentStep < 3 ? (
                        <Button
                          onClick={nextStep}
                          className="btn-luxury"
                          disabled={!bookingData.checkIn || !bookingData.checkOut || (currentStep === 2 && (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone))}
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="btn-luxury"
                        >
                          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Booking Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="shadow-xl border-0 sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-luxury-dark">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Room Details */}
                    <div>
                      <img
                        src={selectedRoom.images[0]}
                        alt={selectedRoom.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-bold text-luxury-dark mb-2">{selectedRoom.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{selectedRoom.description}</p>
                      
                      {/* Amenities */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Wifi className="w-4 h-4 mr-2" />
                          Free WiFi
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Car className="w-4 h-4 mr-2" />
                          Parking
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Coffee className="w-4 h-4 mr-2" />
                          Breakfast
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Dumbbell className="w-4 h-4 mr-2" />
                          Gym Access
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    {bookingData.checkIn && bookingData.checkOut && (
                      <div className="border-t pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Check-in:</span>
                            <span className="font-medium">{bookingData.checkIn}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Check-out:</span>
                            <span className="font-medium">{bookingData.checkOut}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Nights:</span>
                            <span className="font-medium">{calculateNights()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Guests:</span>
                            <span className="font-medium">{bookingData.guests}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    {calculateNights() > 0 && (
                      <div className="border-t pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Room rate (per night):</span>
                            <span>${selectedRoom.price}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Subtotal ({calculateNights()} nights):</span>
                            <span>${(selectedRoom.price * calculateNights()).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Taxes & fees:</span>
                            <span>${(selectedRoom.price * calculateNights() * 0.12).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg text-luxury-gold border-t pt-2">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-luxury-dark mb-2">Need Help?</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {hotelData.contact.address}
                        </div>
                        <p>Call us: {hotelData.contact.phone}</p>
                        <p>Email: {hotelData.contact.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;