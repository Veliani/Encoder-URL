export interface EncodingResult {
  original: string;
  encoded: string;
  originalLength: number;
  encodedLength: number;
  sizeChange: number;
  sizeChangePercent: string;
}

export function urlEncode(text: string): string {
  return encodeURIComponent(text);
}

export function encodeText(text: string): EncodingResult {
  const encoded = urlEncode(text);
  
  const originalLength = text.length;
  const encodedLength = encoded.length;
  const sizeChange = encodedLength - originalLength;
  const sizeChangePercent = originalLength > 0 
    ? `${sizeChange >= 0 ? '+' : ''}${Math.round((sizeChange / originalLength) * 100)}%`
    : '0%';
  
  return {
    original: text,
    encoded,
    originalLength,
    encodedLength,
    sizeChange,
    sizeChangePercent,
  };
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve(successful);
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.resolve(false);
  }
}

export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function pasteFromClipboard(): Promise<string> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.readText().catch(() => '');
  }
  
  return Promise.resolve('');
}

export const SAMPLE_TEXT = "Hello World! This is a sample text with special characters: @#$%^&*()<>\"'&";

export const URL_ENCODING_EXAMPLES = [
  { char: 'Space', encoded: '%20' },
  { char: '!', encoded: '%21' },
  { char: '&', encoded: '%26' },
  { char: '@', encoded: '%40' },
  { char: '#', encoded: '%23' },
  { char: '%', encoded: '%25' },
];
