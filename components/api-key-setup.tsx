'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

export function ApiKeySetup() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Vui lòng nhập API key | Please enter API key');
      return;
    }

    setIsValidating(true);
    try {
      // Test API key with a simple request
      const response = await fetch('/api/test-perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      if (response.ok) {
        setIsValid(true);
        toast.success('API key hợp lệ! | API key is valid!');
      } else {
        setIsValid(false);
        toast.error('API key không hợp lệ | Invalid API key');
      }
    } catch (error) {
      setIsValid(false);
      toast.error('Lỗi khi kiểm tra API key | Error validating API key');
    } finally {
      setIsValidating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Đã copy! | Copied!');
  };

  const envContent = `# Perplexity AI Configuration
PERPLEXITY_API_KEY=${apiKey || 'your_perplexity_api_key_here'}

# Firebase Configuration (Optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Thiết lập API Keys | API Keys Setup
        </h1>
        <p className="text-gray-600">
          Cấu hình API keys để sử dụng đầy đủ tính năng của SwipeLearn AI
        </p>
        <p className="text-sm text-gray-500">
          Configure API keys to use all features of SwipeLearn AI
        </p>
      </div>

      {/* Perplexity API Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-600" />
            Perplexity API Key
            <Badge variant="outline" className="ml-2">Bắt buộc | Required</Badge>
          </CardTitle>
          <CardDescription>
            API key từ Perplexity AI để tạo flashcard và lộ trình học tập
            <br />
            API key from Perplexity AI for generating flashcards and learning paths
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="perplexity-key">Perplexity API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="perplexity-key"
                  type={showKey ? 'text' : 'password'}
                  placeholder="pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className={`pr-10 ${
                    isValid === true ? 'border-green-500' : 
                    isValid === false ? 'border-red-500' : ''
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <Button
                onClick={validateApiKey}
                disabled={isValidating || !apiKey.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isValidating ? 'Đang kiểm tra...' : 'Kiểm tra | Validate'}
              </Button>
            </div>
            
            {isValid === true && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  API key hợp lệ và sẵn sàng sử dụng! | API key is valid and ready to use!
                </AlertDescription>
              </Alert>
            )}
            
            {isValid === false && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  API key không hợp lệ. Vui lòng kiểm tra lại. | Invalid API key. Please check again.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.perplexity.ai/settings/api', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Lấy API Key | Get API Key
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.perplexity.ai/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Tài liệu | Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Environment File Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Copy className="w-5 h-5 text-blue-600" />
            File .env.local
          </CardTitle>
          <CardDescription>
            Copy nội dung này vào file .env.local trong thư mục gốc của dự án
            <br />
            Copy this content to .env.local file in your project root
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{envContent}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(envContent)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                <strong>Lưu ý bảo mật | Security Note:</strong>
                <br />
                • Không commit file .env.local lên Git | Never commit .env.local to Git
                <br />
                • Không chia sẻ API key với người khác | Never share API keys with others
                <br />
                • Thường xuyên rotate API keys | Regularly rotate API keys
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Hướng dẫn tiếp theo | Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Tạo file .env.local</h3>
                <p className="text-sm text-gray-600">
                  Tạo file .env.local trong thư mục gốc và paste nội dung ở trên
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">2. Restart server</h3>
                <p className="text-sm text-gray-600">
                  Chạy lại npm run dev để load environment variables
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">3. Test tính năng</h3>
                <p className="text-sm text-gray-600">
                  Thử tạo flashcard để kiểm tra API hoạt động
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">4. Deploy (tùy chọn)</h3>
                <p className="text-sm text-gray-600">
                  Thêm environment variables vào Vercel/Netlify
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}