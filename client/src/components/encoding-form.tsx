import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EncodingFormProps {
  inputText: string;
  onInputTextChange: (text: string) => void;
  repetitionCount: number;
  onRepetitionCountChange: (count: number) => void;
}

export function EncodingForm({
  inputText,
  onInputTextChange,
  repetitionCount,
  onRepetitionCountChange,
}: EncodingFormProps) {
  const handleRepetitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      onRepetitionCountChange(value);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <h2 className="text-lg font-medium text-gray-900">Input Text</h2>
      </div>
      
      <div className="space-y-4">
        {/* Text Input */}
        <div>
          <Label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your text to encode:
          </Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => onInputTextChange(e.target.value)}
            placeholder="Type your text here... (e.g., Hello World! This will be encoded.)"
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm"
          />
        </div>

        {/* Repetition Count */}
        <div>
          <Label htmlFor="repetitions" className="block text-sm font-medium text-gray-700 mb-2">
            Number of repetitions:
          </Label>
          <div className="flex items-center space-x-2 max-w-xs">
            <Input
              type="number"
              id="repetitions"
              value={repetitionCount}
              onChange={handleRepetitionChange}
              min="1"
              max="10"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Max: 10
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            How many times to display the URL encoded result
          </p>
        </div>
      </div>
    </div>
  );
}
