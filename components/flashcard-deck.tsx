'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  Eye, 
  EyeOff,
  Play,
  Pause,
  SkipForward,
  Star,
  Brain,
  Timer
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  videoUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  timeStamp: string;
  isAnswered: boolean;
  isCorrect?: boolean;
}

export function FlashcardDeck() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0,
    timeStarted: new Date()
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Mock flashcard data with Vietnamese content
    const mockCards: Flashcard[] = [
      {
        id: '1',
        question: 'Từ "serendipity" có nghĩa là gì? | What does "serendipity" mean?',
        answer: 'Sự xuất hiện của các sự kiện một cách tình cờ theo cách hạnh phúc hoặc có lợi; một bất ngờ dễ chịu. | The occurrence of events by chance in a happy or beneficial way; a pleasant surprise.',
        videoUrl: 'https://example.com/video1',
        difficulty: 'medium',
        topic: 'Từ vựng nâng cao | Advanced Vocabulary',
        timeStamp: '0:15',
        isAnswered: false
      },
      {
        id: '2',
        question: 'Làm thế nào để sử dụng "ubiquitous" trong câu? | How do you use "ubiquitous" in a sentence?',
        answer: 'Điện thoại thông minh đã trở nên phổ biến khắp nơi trong xã hội hiện đại. (nghĩa là: có mặt ở khắp mọi nơi) | Smartphones have become ubiquitous in modern society. (meaning: present everywhere)',
        videoUrl: 'https://example.com/video2',
        difficulty: 'hard',
        topic: 'Tiếng Anh học thuật | Academic English',
        timeStamp: '0:23',
        isAnswered: false
      },
      {
        id: '3',
        question: 'Sự khác biệt giữa "affect" và "effect" là gì? | What is the difference between "affect" and "effect"?',
        answer: '"Affect" là động từ (ảnh hưởng), "Effect" là danh từ (kết quả). Ví dụ: Mưa sẽ ảnh hưởng đến kế hoạch của chúng ta. Hiệu ứng là ngay lập tức. | "Affect" is a verb (to influence), "Effect" is a noun (the result). Example: The rain will affect our plans. The effect was immediate.',
        videoUrl: 'https://example.com/video3',
        difficulty: 'easy',
        topic: 'Ngữ pháp | Grammar',
        timeStamp: '0:08',
        isAnswered: false
      }
    ];
    
    setCards(mockCards);
  }, []);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentCard || currentCard.isAnswered) return;

    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      ...currentCard,
      isAnswered: true,
      isCorrect
    };
    setCards(updatedCards);

    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      streak: isCorrect ? prev.streak + 1 : 0
    }));

    if (isCorrect) {
      toast.success('Chính xác! 🎉 | Correct! 🎉');
    } else {
      toast.error('Thử lại lần sau! 💪 | Try again next time! 💪');
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      nextCard();
    }, 2000);
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowAnswer(false);
    } else {
      // Session complete
      const accuracy = (sessionStats.correct / cards.length) * 100;
      toast.success(`Hoàn thành phiên học! Độ chính xác: ${accuracy.toFixed(1)}% | Session complete! Accuracy: ${accuracy.toFixed(1)}%`);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ | Easy';
      case 'medium': return 'Trung bình | Medium';
      case 'hard': return 'Khó | Hard';
      default: return difficulty;
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center py-12">
        <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-2">
          Không có flashcard nào | No flashcards available
        </h2>
        <p className="text-gray-600">
          Tải lên video để tạo flashcard | Upload a video to generate flashcards
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Luyện tập Flashcard | Flashcard Practice
        </h1>
        <p className="text-gray-600">
          Thẻ {currentIndex + 1} / {cards.length} | Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tiến độ | Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">{sessionStats.correct}</p>
            <p className="text-sm text-gray-600">Đúng | Correct</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</p>
            <p className="text-sm text-gray-600">Sai | Incorrect</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-yellow-600">{sessionStats.streak}</p>
            <p className="text-sm text-gray-600">Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Flashcard */}
      <div className="relative h-96 perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <Card className="h-full cursor-pointer hover:shadow-xl transition-shadow" onClick={toggleFlip}>
              <CardContent className="p-8 h-full flex flex-col justify-between">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(currentCard.difficulty)}>
                      {getDifficultyText(currentCard.difficulty)}
                    </Badge>
                    <Badge variant="outline">{currentCard.topic}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{currentCard.timeStamp}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 flex items-center justify-center text-center">
                  <div className="space-y-4">
                    {!showAnswer ? (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {currentCard.question}
                        </h2>
                        <p className="text-gray-500 flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          Nhấp để xem đáp án | Click to reveal answer
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-lg font-semibold text-gray-600 mb-4">
                          {currentCard.question}
                        </h2>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                          <p className="text-xl text-gray-800 leading-relaxed">
                            {currentCard.answer}
                          </p>
                        </div>
                        <p className="text-gray-500 flex items-center justify-center gap-2">
                          <EyeOff className="w-4 h-4" />
                          Nhấp để ẩn đáp án | Click to hide answer
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Audio Button */}
                <div className="flex justify-center">
                  <Button variant="outline" size="sm">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Nghe | Listen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Buttons */}
      {showAnswer && !currentCard.isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleAnswer(false)}
            className="border-red-200 text-red-700 hover:bg-red-50"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Cần luyện thêm | Need More Practice
          </Button>
          <Button
            size="lg"
            onClick={() => handleAnswer(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Hiểu rồi! | Got It!
          </Button>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={previousCard}
          disabled={currentIndex === 0}
        >
          Trước | Previous
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleFlip}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Lật | Flip
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>

        <Button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Tiếp | Next
          <SkipForward className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}