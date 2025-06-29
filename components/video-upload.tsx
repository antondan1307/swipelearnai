'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Link, 
  Youtube, 
  Video, 
  Clock, 
  Brain, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

export function VideoUpload() {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [difficulty, setDifficulty] = useState('intermediate');
  const [topic, setTopic] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleUrlSubmit = async () => {
    if (!videoUrl.trim()) {
      toast.error('Vui lòng nhập URL video hợp lệ | Please enter a valid video URL');
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      // Simulate processing steps
      const steps = [
        { message: 'Đang tải video... | Fetching video...', progress: 20 },
        { message: 'Trích xuất âm thanh... | Extracting audio...', progress: 40 },
        { message: 'Tạo phụ đề... | Generating transcript...', progress: 60 },
        { message: 'Tạo flashcard... | Creating flashcards...', progress: 80 },
        { message: 'Hoàn thành... | Finalizing...', progress: 100 }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(step.progress);
        toast.success(step.message);
      }

      toast.success('Xử lý video thành công! 🎉 | Video processed successfully! 🎉');
      setVideoUrl('');
      setTopic('');
      setCustomPrompt('');
    } catch (error) {
      toast.error('Xử lý video thất bại. Vui lòng thử lại. | Failed to process video. Please try again.');
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error('Kích thước file phải nhỏ hơn 100MB | File size must be less than 100MB');
      return;
    }

    setVideoFile(file);
    toast.success('Chọn file thành công | File selected successfully');
  };

  const processFile = async () => {
    if (!videoFile) return;

    setProcessing(true);
    setProgress(0);

    try {
      // Simulate file processing
      const steps = [
        { message: 'Đang tải file... | Uploading file...', progress: 25 },
        { message: 'Xử lý video... | Processing video...', progress: 50 },
        { message: 'Tạo nội dung... | Generating content...', progress: 75 },
        { message: 'Hoàn thành! | Complete!', progress: 100 }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProgress(step.progress);
        toast.success(step.message);
      }

      toast.success('Xử lý file thành công! 🎉 | File processed successfully! 🎉');
      setVideoFile(null);
    } catch (error) {
      toast.error('Xử lý file thất bại. Vui lòng thử lại. | Failed to process file. Please try again.');
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Tải video lên | Upload Your Video
        </h1>
        <p className="text-gray-600">
          Chuyển đổi bất kỳ video nào thành flashcard cá nhân hóa với AI
        </p>
        <p className="text-sm text-gray-500">
          Transform any video into personalized flashcards with AI
        </p>
      </div>

      {/* Upload Method Selection */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <Button
            variant={uploadMethod === 'url' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setUploadMethod('url')}
            className={uploadMethod === 'url' ? 'bg-white shadow-sm' : ''}
          >
            <Link className="w-4 h-4 mr-2" />
            URL
          </Button>
          <Button
            variant={uploadMethod === 'file' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setUploadMethod('file')}
            className={uploadMethod === 'file' ? 'bg-white shadow-sm' : ''}
          >
            <Upload className="w-4 h-4 mr-2" />
            File
          </Button>
        </div>
      </div>

      {/* Main Upload Card */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {uploadMethod === 'url' ? <Youtube className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            {uploadMethod === 'url' ? 'URL Video | Video URL' : 'File Video | Video File'}
          </CardTitle>
          <CardDescription>
            {uploadMethod === 'url' 
              ? 'Dán URL YouTube hoặc TikTok để bắt đầu | Paste a YouTube or TikTok URL to get started'
              : 'Tải lên file video (MP4, MOV, AVI - Tối đa 100MB) | Upload a video file (MP4, MOV, AVI - Max 100MB)'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {uploadMethod === 'url' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-url">URL Video | Video URL</Label>
                <Input
                  id="video-url"
                  type="url"
                  placeholder="https://youtube.com/watch?v=... hoặc https://tiktok.com/@..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Youtube className="w-3 h-3" />
                  YouTube
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  TikTok
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Tối đa 30s | 30s Max
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <Label
                  htmlFor="video-file"
                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                >
                  {videoFile ? (
                    <div className="space-y-2">
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">Nhấp để tải lên hoặc kéo thả | Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">MP4, MOV, AVI (Tối đa 100MB | Max 100MB)</p>
                    </>
                  )}
                </Label>
                <Input
                  id="video-file"
                  type="file"
                  accept=".mp4,.mov,.avi"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </div>
            </div>
          )}

          {/* Advanced Options */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Cài đặt AI | AI Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Mức độ khó | Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Cơ bản | Beginner</SelectItem>
                    <SelectItem value="intermediate">Trung cấp | Intermediate</SelectItem>
                    <SelectItem value="advanced">Nâng cao | Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topic">Chủ đề (Tùy chọn) | Topic (Optional)</Label>
                <Input
                  id="topic"
                  placeholder="VD: Tiếng Anh thương mại, Du lịch | e.g., Business English, Travel"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-prompt">Hướng dẫn tùy chỉnh (Tùy chọn) | Custom Instructions (Optional)</Label>
              <Textarea
                id="custom-prompt"
                placeholder="Bất kỳ lĩnh vực trọng tâm hoặc hướng dẫn nào cho AI... | Any specific focus areas or instructions for the AI..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Processing Progress */}
          {processing && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">
                  Đang xử lý video của bạn... | Processing your video...
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-gray-500">
                Quá trình này có thể mất vài phút tùy thuộc vào độ dài video
                <br />
                This may take a few minutes depending on video length
              </p>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={uploadMethod === 'url' ? handleUrlSubmit : processFile}
            disabled={processing || (uploadMethod === 'url' ? !videoUrl : !videoFile)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            size="lg"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang xử lý... | Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Tạo Flashcard | Generate Flashcards
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">
            Mẹo để có kết quả tốt nhất | Tips for Best Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              <span>Chất lượng âm thanh rõ ràng | Clear audio quality</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              <span>Nội dung giáo dục | Educational content</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              <span>30 giây hoặc ít hơn | 30 seconds or less</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              <span>Tiếng Anh | English language</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}