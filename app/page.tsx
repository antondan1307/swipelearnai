'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Navigation } from '@/components/navigation';
import { VideoUpload } from '@/components/video-upload';
import { FlashcardDeck } from '@/components/flashcard-deck';
import { LearningPath } from '@/components/learning-path';
import { Leaderboard } from '@/components/leaderboard';
import { UserStats } from '@/components/user-stats';
import { 
  Play, 
  Brain, 
  Trophy, 
  Zap, 
  Target, 
  BookOpen, 
  Star,
  TrendingUp,
  Users,
  Video,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({
    streak: 7,
    totalCards: 156,
    masteredCards: 89,
    level: 12,
    xp: 2450,
    nextLevelXp: 3000
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Video,
      title: 'AI Video Flashcards',
      titleVi: 'Flashcard Video AI',
      description: 'Convert YouTube/TikTok videos into 30s learning segments with auto-generated Q&A',
      descriptionVi: 'Chuyển đổi video YouTube/TikTok thành đoạn học 30 giây với câu hỏi tự động',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Brain,
      title: 'Personalized Learning',
      titleVi: 'Học tập cá nhân hóa',
      description: '7-day AI-curated playlists based on your learning preferences',
      descriptionVi: 'Playlist 7 ngày do AI tạo dựa trên sở thích học tập của bạn',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Trophy,
      title: 'Gamified Experience',
      titleVi: 'Trải nghiệm Gamification',
      description: 'Earn streaks, badges, and compete with friends on leaderboards',
      descriptionVi: 'Kiếm streak, huy hiệu và thi đua với bạn bè trên bảng xếp hạng',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Offline Learning',
      titleVi: 'Học offline',
      description: 'PWA-powered offline access to your cached videos and flashcards',
      descriptionVi: 'Truy cập offline với video và flashcard đã lưu cache',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const quickStats = [
    { 
      label: 'Current Streak', 
      labelVi: 'Streak hiện tại',
      value: userProgress.streak, 
      icon: Zap, 
      color: 'text-orange-500' 
    },
    { 
      label: 'Cards Mastered', 
      labelVi: 'Thẻ đã thành thạo',
      value: userProgress.masteredCards, 
      icon: Star, 
      color: 'text-yellow-500' 
    },
    { 
      label: 'Level', 
      labelVi: 'Cấp độ',
      value: userProgress.level, 
      icon: Target, 
      color: 'text-purple-500' 
    },
    { 
      label: 'Total XP', 
      labelVi: 'Tổng XP',
      value: userProgress.xp, 
      icon: TrendingUp, 
      color: 'text-green-500' 
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-gray-600">
            Đang tải SwipeLearn AI... | Loading SwipeLearn AI...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 pt-20 pb-24">
        {activeTab === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                SwipeLearn AI
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Thành thạo tiếng Anh với
                <br />
                Video AI thông minh
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Chuyển đổi video YouTube và TikTok thành flashcard cá nhân hóa. 
                Học từ vựng qua nội dung hấp dẫn, dễ hiểu.
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Transform YouTube and TikTok videos into personalized flashcards. 
                Learn vocabulary through engaging, bite-sized content.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.labelVi}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Tiến độ của bạn | Your Progress
                </CardTitle>
                <CardDescription>
                  Cấp độ {userProgress.level} - {userProgress.xp} / {userProgress.nextLevelXp} XP
                  <br />
                  Level {userProgress.level} - {userProgress.xp} / {userProgress.nextLevelXp} XP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={(userProgress.xp / userProgress.nextLevelXp) * 100} 
                  className="h-3 mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{userProgress.masteredCards} thẻ đã thành thạo | cards mastered</span>
                  <span>{userProgress.totalCards - userProgress.masteredCards} thẻ còn lại | cards remaining</span>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">
                        {feature.titleVi}
                        <br />
                        <span className="text-base text-gray-600 font-normal">{feature.title}</span>
                      </CardTitle>
                      <CardDescription className="space-y-1">
                        <span className="block">{feature.descriptionVi}</span>
                        <span className="block text-xs text-gray-500">{feature.description}</span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                onClick={() => setActiveTab('learn')}
              >
                <Play className="w-5 h-5 mr-2" />
                Bắt đầu học | Start Learning
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setActiveTab('upload')}
              >
                <Video className="w-5 h-5 mr-2" />
                Tải video lên | Upload Video
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === 'learn' && <FlashcardDeck />}
        {activeTab === 'path' && <LearningPath />}
        {activeTab === 'upload' && <VideoUpload />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'profile' && <UserStats />}
      </main>
    </div>
  );
}