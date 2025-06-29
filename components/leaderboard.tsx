'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Calendar,
  Users,
  Flame,
  Target,
  Crown,
  Award
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  cardsCompleted: number;
  weeklyXp: number;
  level: number;
  rank: number;
  isCurrentUser?: boolean;
}

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState('weekly');

  useEffect(() => {
    // Mock leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        id: '1',
        name: 'Emma Chen',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        score: 2850,
        streak: 15,
        cardsCompleted: 234,
        weeklyXp: 1250,
        level: 18,
        rank: 1
      },
      {
        id: '2',
        name: 'You',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        score: 2340,
        streak: 7,
        cardsCompleted: 156,
        weeklyXp: 890,
        level: 12,
        rank: 2,
        isCurrentUser: true
      },
      {
        id: '3',
        name: 'Marcus Johnson',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        score: 2180,
        streak: 12,
        cardsCompleted: 198,
        weeklyXp: 720,
        level: 15,
        rank: 3
      },
      {
        id: '4',
        name: 'Sarah Kim',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        score: 1950,
        streak: 8,
        cardsCompleted: 143,
        weeklyXp: 650,
        level: 11,
        rank: 4
      },
      {
        id: '5',
        name: 'David Miller',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        score: 1820,
        streak: 5,
        cardsCompleted: 127,
        weeklyXp: 580,
        level: 10,
        rank: 5
      }
    ];
    
    setLeaderboardData(mockData);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  const currentUser = leaderboardData.find(entry => entry.isCurrentUser);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-gray-600">
          Compete with friends and climb the rankings
        </p>
      </div>

      {/* Current User Stats */}
      {currentUser && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Your Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.rank}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                  <p className="text-sm text-gray-600">Level {currentUser.level}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{currentUser.score}</div>
                  <div className="text-xs text-gray-600">Total XP</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{currentUser.streak}</div>
                  <div className="text-xs text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{currentUser.cardsCompleted}</div>
                  <div className="text-xs text-gray-600">Cards Done</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Monthly
          </TabsTrigger>
          <TabsTrigger value="alltime" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            All Time
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Weekly Champions
              </CardTitle>
              <CardDescription>
                Top performers this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.slice(0, 3).map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${entry.isCurrentUser ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(entry.rank)}
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={entry.avatar} alt={entry.name} />
                            <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{entry.name}</h3>
                            {entry.isCurrentUser && (
                              <Badge variant="secondary">You</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Level {entry.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{entry.weeklyXp}</div>
                        <div className="text-sm text-gray-600">XP this week</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Full Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                      entry.isCurrentUser ? 'bg-purple-50 border border-purple-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {entry.rank <= 3 ? getRankIcon(entry.rank) : (
                          <span className="font-bold text-gray-600">#{entry.rank}</span>
                        )}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={entry.avatar} alt={entry.name} />
                        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.name}</span>
                          {entry.isCurrentUser && (
                            <Badge variant="secondary" className="text-xs">You</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>Level {entry.level}</span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            {entry.streak}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">{entry.weeklyXp}</div>
                      <div className="text-xs text-gray-600">XP</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                <Trophy className="w-16 h-16 mx-auto text-gray-400" />
                <h3 className="text-xl font-semibold">Monthly Rankings</h3>
                <p className="text-gray-600">Monthly leaderboard coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alltime" className="space-y-4">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                <Star className="w-16 h-16 mx-auto text-gray-400" />
                <h3 className="text-xl font-semibold">All-Time Champions</h3>
                <p className="text-gray-600">All-time rankings coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Challenge of the Week */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-green-600" />
            Weekly Challenge
          </CardTitle>
          <CardDescription>
            Complete 50 flashcards this week to earn bonus XP!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Progress: 32/50 cards</p>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+500</div>
              <div className="text-sm text-gray-600">Bonus XP</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}