'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BookOpen, 
  Upload, 
  Trophy, 
  User, 
  Route,
  Bell,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const navItems = [
    { id: 'home', label: 'Trang chủ', labelEn: 'Home', icon: Home },
    { id: 'learn', label: 'Học tập', labelEn: 'Learn', icon: BookOpen },
    { id: 'path', label: 'Lộ trình', labelEn: 'Path', icon: Route },
    { id: 'upload', label: 'Tải lên', labelEn: 'Upload', icon: Upload },
    { id: 'leaderboard', label: 'Xếp hạng', labelEn: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Hồ sơ', labelEn: 'Profile', icon: User },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SwipeLearn
                </span>
                <span className="text-xs text-gray-500 -mt-1">AI Learning</span>
              </div>
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.labelEn}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative hidden md:flex">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Settings className="w-4 h-4" />
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 dark:bg-gray-900/95 dark:border-gray-700"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center space-y-1 h-16 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="text-center">
                      <div className="text-xs font-medium">{item.label}</div>
                      <div className="text-xs opacity-70">{item.labelEn}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 ${
                activeTab === item.id ? 'text-purple-500' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <div className="text-center">
                <div className="text-xs">{item.label}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}