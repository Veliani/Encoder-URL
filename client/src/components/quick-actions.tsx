import { Button } from '@/components/ui/button';
import { Eraser, Clipboard, FlaskConical, Download, Zap } from 'lucide-react';
import { pasteFromClipboard, downloadText, SAMPLE_TEXT } from '@/lib/encoding';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsProps {
  onClearText: () => void;
  onLoadSample: () => void;
  onPasteText: (text: string) => void;
  encodedText: string;
  repetitionCount: number;
}

export function QuickActions({
  onClearText,
  onLoadSample,
  onPasteText,
  encodedText,
  repetitionCount,
}: QuickActionsProps) {
  const { toast } = useToast();

  const handlePaste = async () => {
    try {
      const text = await pasteFromClipboard();
      if (text) {
        onPasteText(text);
        toast({
          title: "Text pasted",
          description: "Clipboard content has been pasted successfully.",
        });
      } else {
        toast({
          title: "Paste failed",
          description: "Unable to read from clipboard or clipboard is empty.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Paste failed",
        description: "Unable to access clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const handleLoadSample = () => {
    onLoadSample();
    toast({
      title: "Sample loaded",
      description: "Sample text with special characters has been loaded.",
    });
  };

  const handleDownload = () => {
    if (!encodedText) {
      toast({
        title: "Nothing to download",
        description: "Please enter some text to encode first.",
        variant: "destructive",
      });
      return;
    }

    const content = Array.from({ length: repetitionCount }, (_, index) => 
      `Repetition ${index + 1}:\n${encodedText}`
    ).join('\n\n');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `encoded-text-${timestamp}.txt`;
    
    downloadText(content, filename);
    toast({
      title: "Download started",
      description: `Encoded text saved as ${filename}`,
    });
  };

  const handleClear = () => {
    onClearText();
    toast({
      title: "Text cleared",
      description: "Input text has been cleared.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
        >
          <Eraser className="w-4 h-4" />
          <span>Clear Text</span>
        </Button>
        
        <Button
          onClick={handlePaste}
          variant="outline"
          className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
        >
          <Clipboard className="w-4 h-4" />
          <span>Paste Text</span>
        </Button>
        
        <Button
          onClick={handleLoadSample}
          variant="outline"
          className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
        >
          <FlaskConical className="w-4 h-4" />
          <span>Load Sample</span>
        </Button>
        
        <Button
          onClick={handleDownload}
          variant="outline"
          className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </Button>
      </div>
    </div>
  );
}
