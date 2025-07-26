"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { buildApiUrl, API_CONFIG } from '@/lib/config';

import { Booking, Room } from '@/lib/types';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    avgDailyRate: 0
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch bookings
        const bookingsResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BOOKINGS));
        const bookingsData = await bookingsResponse.json();
        if (bookingsData.success) {
          setBookings(bookingsData.data);
        }
        
        // Fetch rooms
        const roomsResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ROOMS));
        const roomsData = await roomsResponse.json();
        if (roomsData.success) {
          setRooms(roomsData.data);
        }
        
        // Fetch stats
        const statsResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STATS));
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'rooms', label: 'Rooms', icon: Users },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-luxury-dark">Admin Panel</h1>
                <p className="text-gray-600 mt-1">Manage your hotel operations</p>
              </div>
              <Button className="bg-luxury-gold hover:bg-luxury-gold/90">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-luxury-gold text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {loading && (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
                </div>
              )}
              
              {!loading && activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                            <p className="text-3xl font-bold text-luxury-dark">{stats.totalBookings || 0}</p>
                          </div>
                          <Calendar className="w-8 h-8 text-luxury-gold" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-3xl font-bold text-luxury-dark">${(stats.totalRevenue || 0).toLocaleString()}</p>
                          </div>
                          <DollarSign className="w-8 h-8 text-luxury-gold" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                            <p className="text-3xl font-bold text-luxury-dark">{stats.occupancyRate || 0}%</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-luxury-gold" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Avg Daily Rate</p>
                            <p className="text-3xl font-bold text-luxury-dark">${stats.avgDailyRate || 0}</p>
                          </div>
                          <Users className="w-8 h-8 text-luxury-gold" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>Latest booking activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{booking.guestName}</p>
                              <p className="text-sm text-gray-600">{booking.roomType}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${booking.totalAmount}</p>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {!loading && activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Bookings Management</CardTitle>
                          <CardDescription>Manage all hotel bookings</CardDescription>
                        </div>
                        <Button className="bg-luxury-gold hover:bg-luxury-gold/90">
                          <Plus className="w-4 h-4 mr-2" />
                          New Booking
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Filters */}
                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        >
                          <option value="all">All Status</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      {/* Bookings Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Booking ID</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Guest</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Room</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Dates</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredBookings.map((booking) => (
                              <tr key={booking.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium">{booking.id}</td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="font-medium">{booking.guestName}</p>
                                    <p className="text-sm text-gray-600">{booking.email}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4">{booking.roomType}</td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="text-sm">{booking.checkIn}</p>
                                    <p className="text-sm text-gray-600">to {booking.checkOut}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 font-medium">${booking.totalAmount}</td>
                                <td className="py-3 px-4">
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {!loading && activeTab === 'rooms' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Rooms Management</CardTitle>
                          <CardDescription>Manage hotel rooms and availability</CardDescription>
                        </div>
                        <Button className="bg-luxury-gold hover:bg-luxury-gold/90">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Room
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                          <Card key={room.id} className="border">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">{room.title}</h3>
                                <Badge className={room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  {room.available ? 'Available' : 'Occupied'}
                                </Badge>
                              </div>
                              <div className="space-y-2 mb-4">
                                <p className="text-2xl font-bold text-luxury-gold">${room.price}/night</p>
                                <p className="text-sm text-gray-600">Max {room.maxGuests} guests</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;