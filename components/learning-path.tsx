'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Route, 
  Calendar, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Lock,
  Brain,
  Target,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  videoCount: number;
  flashcardCount: number;
  completed: boolean;
  locked: boolean;
  progress: number;
  topics: string[];
  day: number;
}

export function LearningPath() {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    // Mock learning path data
    const mockModules: LearningModule[] = [
      {
        id: '1',
        title: 'Business English Fundamentals',
        description: 'Master essential business vocabulary and phrases for professional communication.',
        difficulty: 'intermediate',
        duration: '45 min',
        videoCount: 8,
        flashcardCount: 32,
        completed: true,
        locked: false,
        progress: 100,
        topics: ['Email Writing', 'Meetings', 'Presentations'],
        day: 1
      },
      {
        id: '2',
        title: 'Travel & Tourism Vocabulary',
        description: 'Learn essential words and phrases for traveling and tourism contexts.',
        difficulty: 'beginner',
        duration: '30 min',
        videoCount: 6,
        flashcardCount: 24,
        completed: false,
        locked: false,
        progress: 65,
        topics: ['Airport', 'Hotel', 'Directions'],
        day: 2
      },
      {
        id: '3',
        title: 'Academic English Advanced',
        description: 'Complex vocabulary and structures for academic writing and research.',
        difficulty: 'advanced',
        duration: '60 min',
        videoCount: 10,
        flashcardCount: 40,
        completed: false,
        locked: false,
        progress: 0,
        topics: ['Research', 'Analysis', 'Argumentation'],
        day: 3
      },
      {
        id: '4',
        title: 'Idioms & Expressions',
        description: 'Common English idioms and expressions used in everyday conversation.',
        difficulty: 'intermediate',
        duration: '35 min',
        videoCount: 7,
        flashcardCount: 28,
        completed: false,
        locked: true,
        progress: 0,
        topics: ['Common Idioms', 'Phrasal Verbs', 'Slang'],
        day: 4
      },
      {
        id: '5',
        title: 'Technical English',
        description: 'Specialized vocabulary for technology and engineering fields.',
        difficulty: 'advanced',
        duration: '50 min',
        videoCount: 9,
        flashcardCount: 36,
        completed: false,
        locked: true,
        progress: 0,
        topics: ['Programming', 'Engineering', 'Science'],
        day: 5
      }
    ];
    
    setModules(mockModules);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const totalProgress = modules.reduce((acc, mod) => acc + mod.progress, 0) / modules.length;
  const completedModules = modules.filter(mod => mod.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Learning Path</h1>
        <p className="text-gray-600">
          AI-curated 7-day learning journey personalized for you
        </p>
      </div>

      {/* Weekly Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Week {currentWeek} Progress
          </CardTitle>
          <CardDescription>
            {completedModules} of {modules.length} modules completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completedModules}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {modules.reduce((acc, mod) => acc + mod.flashcardCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Cards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {modules.reduce((acc, mod) => acc + mod.videoCount, 0)}
                </div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {modules.reduce((acc, mod) => acc + parseInt(mod.duration), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Minutes</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Route className="w-5 h-5" />
          Daily Modules
        </h2>
        
        <div className="grid gap-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${module.locked ? 'opacity-60' : 'hover:shadow-lg transition-shadow cursor-pointer'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Day {module.day}
                        </Badge>
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        {module.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        {module.locked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : module.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-blue-500" />
                        )}
                        {module.title}
                      </CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {module.progress}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    {/* Module Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {module.videoCount} videos
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {module.flashcardCount} cards
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1">
                      {module.topics.map(topic => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                      <Button
                        disabled={module.locked}
                        variant={module.completed ? "outline" : "default"}
                        size="sm"
                        className={!module.completed ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" : ""}
                      >
                        {module.locked ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </>
                        ) : module.completed ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            {module.progress > 0 ? 'Continue' : 'Start'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Completion Overlay */}
                {module.completed && (
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Challenge */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-600" />
            Weekly Challenge
          </CardTitle>
          <CardDescription>
            Complete all modules this week to unlock bonus content!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Progress to bonus unlock</p>
              <Progress value={totalProgress} className="w-48 h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(totalProgress)}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}