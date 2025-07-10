import { HelpCircle, Link } from 'lucide-react';
import { URL_ENCODING_EXAMPLES } from '@/lib/encoding';

export function EncodingExamples() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <HelpCircle className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-medium text-gray-900">URL Encoding Examples</h2>
      </div>
      
      <div className="max-w-md">
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <Link className="w-4 h-4 text-blue-600" />
            <span>Common Character Encodings</span>
          </h3>
          <div className="text-sm space-y-2">
            {URL_ENCODING_EXAMPLES.map(({ char, encoded }, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <code className="text-gray-600 bg-gray-50 px-2 py-1 rounded">{char}</code>
                <span className="text-gray-400">→</span>
                <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">{encoded}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
