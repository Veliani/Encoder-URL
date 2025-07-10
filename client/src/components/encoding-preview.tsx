import { Button } from '@/components/ui/button';
import { Copy, Eye } from 'lucide-react';
import { EncodingResult, copyToClipboard } from '@/lib/encoding';
import { useToast } from '@/hooks/use-toast';

interface EncodingPreviewProps {
  result: EncodingResult;
  repetitionCount: number;
}

export function EncodingPreview({ result, repetitionCount }: EncodingPreviewProps) {
  const { toast } = useToast();

  const handleCopyAll = async () => {
    const allRepetitions = Array.from({ length: repetitionCount }, () => result.encoded).join('\n');
    const success = await copyToClipboard(allRepetitions);
    
    if (success) {
      toast({
        title: "Copied to clipboard!",
        description: `All ${repetitionCount} repetition${repetitionCount > 1 ? 's' : ''} copied successfully.`,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyIndividual = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    
    if (success) {
      toast({
        title: "Copied to clipboard!",
        description: `Repetition ${index + 1} copied successfully.`,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const colors = {
    bg: 'encoding-blue-bg',
    text: 'encoding-blue-text',
    border: 'border-blue-200',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-medium text-gray-900">Live Preview</h2>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
            Real-time
          </span>
        </div>
        <Button
          onClick={handleCopyAll}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Copy All</span>
        </Button>
      </div>

      {/* Original Text Display */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Original Text:
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <code className="text-sm font-mono text-gray-800 break-all">
            {result.original || 'No text entered'}
          </code>
        </div>
      </div>

      {/* Encoded Results */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Encoded Result (URL Encoding):
          <span className="text-gray-500 font-normal">
            {' '}
            - {repetitionCount} repetition{repetitionCount > 1 ? 's' : ''}
          </span>
        </label>
        <div className="space-y-3">
          {Array.from({ length: repetitionCount }, (_, index) => (
            <div key={index} className="relative group">
              <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
                <code className={`text-sm font-mono ${colors.text} break-all`}>
                  {result.encoded || 'No encoded result'}
                </code>
              </div>
              <Button
                onClick={() => handleCopyIndividual(result.encoded, index)}
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-50 border border-gray-300 text-gray-600 p-2 rounded text-xs"
                title={`Copy repetition ${index + 1}`}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Encoding Statistics */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {result.originalLength}
          </div>
          <div className="text-xs text-gray-500">Original Characters</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-blue-600">
            {result.encodedLength}
          </div>
          <div className="text-xs text-gray-500">Encoded Characters</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-semibold ${
            result.sizeChange >= 0 ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {result.sizeChangePercent}
          </div>
          <div className="text-xs text-gray-500">Size Change</div>
        </div>
      </div>
    </div>
  );
}
