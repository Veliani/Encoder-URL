import { useState, useEffect } from 'react';
import { Code } from 'lucide-react';
import { EncodingForm } from '@/components/encoding-form';
import { EncodingPreview } from '@/components/encoding-preview';
import { QuickActions } from '@/components/quick-actions';
import { EncodingExamples } from '@/components/encoding-examples';
import { encodeText, SAMPLE_TEXT } from '@/lib/encoding';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [repetitionCount, setRepetitionCount] = useState(1);

  // Generate encoding result in real-time
  const result = encodeText(inputText);

  // Load sample text on component mount
  useEffect(() => {
    setInputText(SAMPLE_TEXT);
  }, []);

  const handleClearText = () => {
    setInputText('');
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT);
  };

  const handlePasteText = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Code className="text-blue-600 text-xl w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">URL Encoder</h1>
              <p className="text-gray-600 text-sm">
                Simple URL encoding with repetition support
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Input Section */}
        <EncodingForm
          inputText={inputText}
          onInputTextChange={setInputText}
          repetitionCount={repetitionCount}
          onRepetitionCountChange={setRepetitionCount}
        />

        {/* Real-time Preview */}
        <EncodingPreview
          result={result}
          repetitionCount={repetitionCount}
        />

        {/* Quick Actions */}
        <QuickActions
          onClearText={handleClearText}
          onLoadSample={handleLoadSample}
          onPasteText={handlePasteText}
          encodedText={result.encoded}
          repetitionCount={repetitionCount}
        />

        {/* Help & Examples */}
        <EncodingExamples />
      </main>
    </div>
  );
}
