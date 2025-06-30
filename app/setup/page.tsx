import { ApiKeySetup } from '@/components/api-key-setup';

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <ApiKeySetup />
      </div>
    </div>
  );
}