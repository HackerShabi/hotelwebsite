"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { hotelData } from '@/lib/hotelData';
import { Button } from '@/components/ui/button';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const predefinedMessages = [
    "I'd like to make a reservation",
    "What are your room rates?",
    "Do you have availability for tonight?",
    "What amenities do you offer?",
    "I need help with my booking",
  ];

  const handleSendMessage = (messageText: string) => {
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  const handleCustomMessage = () => {
    if (message.trim()) {
      handleSendMessage(message);
    }
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{hotelData.name}</h3>
                  <p className="text-sm text-green-100">We're here to help!</p>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  <p className="text-sm text-gray-700">
                    👋 Hello! Welcome to {hotelData.name}. How can we assist you today?
                  </p>
                </div>
              </div>

              {/* Predefined Messages */}
              <div className="space-y-2 mb-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Quick Messages
                </p>
                {predefinedMessages.map((msg, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSendMessage(msg)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors duration-200 text-sm text-gray-700 hover:text-green-700 border border-transparent hover:border-green-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {msg}
                  </motion.button>
                ))}
              </div>

              {/* Custom Message Input */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                  Or type your message
                </p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomMessage()}
                  />
                  <Button
                    onClick={handleCustomMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Direct WhatsApp Button */}
                <div className="mt-3">
                  <Button
                    onClick={() => {
                      const whatsappUrl = `https://wa.me/${hotelData.contact.whatsapp.replace(/[^0-9]/g, '')}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 text-center">
              <p className="text-xs text-gray-500">
                Powered by WhatsApp • Usually replies instantly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppChat;