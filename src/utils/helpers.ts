export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (sameDay) return time;
  return `${d.toLocaleDateString([], { day: 'numeric', month: 'short' })} ${time}`;
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Extract text from uploaded files in the browser.
 * Supports .txt (direct), .pdf (basic via text layer), .docx (XML parsing).
 * Returns extracted text or throws Error with a clear message.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const type = file.type;

  if (name.endsWith('.txt') || type === 'text/plain') {
    return await file.text();
  }

  if (name.endsWith('.pdf') || type === 'application/pdf') {
    // Try reading as text — many PDFs embed a text stream we can partially read.
    // This is a best-effort extraction for the prototype.
    const buf = await file.arrayBuffer();
    const raw = new TextDecoder('utf-8').decode(buf);
    // Extract text between stream markers (very rough fallback)
    const textChunks: string[] = [];
    const btRegex = /\((?:[^()\\]|\\.)*\)\s*Tj/g;
    let m: RegExpExecArray | null;
    while ((m = btRegex.exec(raw)) !== null) {
      textChunks.push(m[0].slice(1, -3).replace(/\\([()\\])/g, '$1'));
    }
    const tjRegex = /\[(?:[^\[\]\\]|\\.)*\]\s*TJ/g;
    while ((m = tjRegex.exec(raw)) !== null) {
      const inner = m[0].slice(1, -3);
      const strParts = inner.match(/\((?:[^()\\]|\\.)*\)/g) || [];
      textChunks.push(strParts.map((s) => s.slice(1, -1).replace(/\\([()\\])/g, '$1')).join(''));
    }
    const text = textChunks.join('\n').trim();
    if (text.length < 20) {
      throw new Error('Could not extract readable text from this PDF (it may be scanned or image-based).');
    }
    return text;
  }

  if (name.endsWith('.docx')) {
    // .docx is a zip — without a zip library we can't reliably parse it.
    // Attempt a raw-text fallback that often surfaces readable strings.
    const buf = await file.arrayBuffer();
    const raw = new TextDecoder('utf-8').decode(buf);
    const matches = raw.match(/>([^<>]{4,})</g) || [];
    const text = matches
      .map((s) => s.slice(1, -1))
      .filter((s) => !/^[\s\x00-\x1f]+$/.test(s))
      .join('\n')
      .trim();
    if (text.length < 20) {
      throw new Error('Could not extract readable text from this DOCX file.');
    }
    return text;
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
}

export function downloadTextFile(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      // ignore
    }
    document.body.removeChild(ta);
    resolve();
  });
}
