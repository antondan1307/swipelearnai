'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Star, 
  Trophy, 
  Target, 
  Calendar, 
  Clock, 
  TrendingUp,
  Award,
  Flame,
  BookOpen,
  Video,
  Brain,
  Settings,
  Edit3
} from 'lucide-react';

interface UserStats {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  maxStreak: number;
  totalCards: number;
  masteredCards: number;
  videosWatched: number;
  studyTime: number;
  joinDate: string;
  badges: Badge[];
}

interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export function UserStats() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock user data
    const mockUserStats: UserStats = {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      level: 12,
      xp: 2450,
      nextLevelXp: 3000,
      streak: 7,
      maxStreak: 21,
      totalCards: 156,
      masteredCards: 89,
      videosWatched: 45,
      studyTime: 1240, // minutes
      joinDate: '2024-01-15',
      badges: []
    };

    const mockBadges: BadgeType[] = [
      {
        id: '1',
        name: 'First Steps',
        description: 'Complete your first flashcard',
        icon: '🎯',
        earned: true,
        earnedDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        earned: true,
        earnedDate: '2024-01-22'
      },
      {
        id: '3',
        name: 'Video Master',
        description: 'Watch 50 learning videos',
        icon: '📹',
        earned: false
      },
      {
        id: '4',
        name: 'Card Collector',
        description: 'Master 100 flashcards',
        icon: '🎴',
        earned: false
      },
      {
        id: '5',
        name: 'Study Streak',
        description: 'Maintain a 30-day streak',
        icon: '⚡',
        earned: false
      },
      {
        id: '6',
        name: 'Knowledge Seeker',
        description: 'Reach level 20',
        icon: '🧠',
        earned: false
      }
    ];

    setUserStats(mockUserStats);
    setBadges(mockBadges);
  }, []);

  if (!userStats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = (userStats.xp / userStats.nextLevelXp) * 100;
  const masteryPercentage = (userStats.masteredCards / userStats.totalCards) * 100;
  const earnedBadges = badges.filter(badge => badge.earned);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-gray-600">Track your learning progress and achievements</p>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={userStats.avatar} alt={userStats.name} />
                  <AvatarFallback>{userStats.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {userStats.level}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{userStats.name}</h2>
                  <Button variant="ghost" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-600">{userStats.email}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(userStats.joinDate).toLocaleDateString()}
                  </span>
                  <Badge className="bg-purple-100 text-purple-800">
                    Level {userStats.level}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* XP Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Experience Progress
              </CardTitle>
              <CardDescription>
                Level {userStats.level} - {userStats.xp} / {userStats.nextLevelXp} XP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progressPercentage} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current XP: {userStats.xp}</span>
                  <span>Next level: {userStats.nextLevelXp - userStats.xp} XP to go</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
                <div className="text-xs text-gray-500 mt-1">Max: {userStats.maxStreak} days</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-green-600">{userStats.masteredCards}</div>
                <div className="text-sm text-gray-600">Cards Mastered</div>
                <div className="text-xs text-gray-500 mt-1">of {userStats.totalCards}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Video className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-blue-600">{userStats.videosWatched}</div>
                <div className="text-sm text-gray-600">Videos Watched</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-purple-600">{Math.round(userStats.studyTime / 60)}</div>
                <div className="text-sm text-gray-600">Hours Studied</div>
                <div className="text-xs text-gray-500 mt-1">{userStats.studyTime} minutes</div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Flashcard Mastery</span>
                  <span className="text-sm text-gray-600">{Math.round(masteryPercentage)}%</span>
                </div>
                <Progress value={masteryPercentage} className="h-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{userStats.masteredCards} mastered</span>
                  <span>{userStats.totalCards - userStats.masteredCards} remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements
              </CardTitle>
              <CardDescription>
                {earnedBadges.length} of {badges.length} badges earned
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${
                      badge.earned 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{badge.name}</h3>
                          {badge.earned && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Earned
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                        {badge.earned && badge.earnedDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed flashcard session</p>
                    <p className="text-xs text-gray-600">15 cards mastered • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Watched learning video</p>
                    <p className="text-xs text-gray-600">Business English fundamentals • 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Level up!</p>
                    <p className="text-xs text-gray-600">Reached level 12 • Yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Achievement unlocked</p>
                    <p className="text-xs text-gray-600">Week Warrior badge earned • 2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}