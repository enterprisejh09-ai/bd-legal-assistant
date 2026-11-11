import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bot, Send, Plus, Trash2, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/Toast';
import { PageHeader, EmptyState, LoadingDots } from '@/components/ui/PageHeader';
import { DemoLabel } from '@/components/ui/Disclaimer';
import { Badge } from '@/components/ui/Badge';
import { suggestedQuestions } from '@/data/demoData';
import { generateDemoResponse } from '@/utils/aiLogic';
import { formatTimestamp, copyToClipboard } from '@/utils/helpers';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  ts: number;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export function AIAssistantPage() {
  const { t, isBn } = useLanguage();
  const { notify } = useToast();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('bdla_conversations', []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages.length, loading]);

  // Handle query param from dashboard search
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !loading) {
      sendQuestion(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const newChat = () => {
    setActiveId(null);
    setInput('');
  };

  const clearChat = () => {
    if (active) {
      setConversations((prev) => prev.filter((c) => c.id !== active.id));
    }
    setActiveId(null);
  };

  const sendQuestion = (question: string) => {
    const text = question.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: `m${Date.now()}`, role: 'user', text, ts: Date.now() };
    let convId = activeId;

    if (!convId) {
      convId = `c${Date.now()}`;
      const newConv: Conversation = {
        id: convId,
        title: text.slice(0, 40),
        messages: [userMsg],
        createdAt: Date.now(),
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveId(convId);
    } else {
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, userMsg] } : c))
      );
    }

    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateDemoResponse(text);
      const aiMsg: Message = { id: `m${Date.now() + 1}`, role: 'assistant', text: response, ts: Date.now() };
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: [...c.messages, aiMsg] } : c))
      );
      setLoading(false);
      // Update stats
      const statsRaw = localStorage.getItem('bdla_stats');
      if (statsRaw) {
        try {
          const stats = JSON.parse(statsRaw);
          localStorage.setItem('bdla_stats', JSON.stringify({ ...stats, questions: stats.questions + 1 }));
        } catch {
          // ignore
        }
      }
    }, 900 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleCopy = async (msg: Message) => {
    await copyToClipboard(msg.text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 1500);
    notify(t('copied'), 'success');
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title={t('aiTitle')}
        subtitle={t('aiSubtitle')}
        icon={<Bot size={20} />}
        action={
          <div className="flex gap-2">
            <button onClick={newChat} className="btn-outline">
              <Plus size={15} /> {t('newChat')}
            </button>
            {active && (
              <button onClick={clearChat} className="btn-ghost text-red-600 hover:bg-red-50">
                <Trash2 size={15} /> {t('clearChat')}
              </button>
            )}
          </div>
        }
      />

      <div className="grid lg:grid-cols-[260px_1fr] gap-4 h-[calc(100vh-280px)] min-h-[500px]">
        {/* Conversation list */}
        <div className="card overflow-hidden hidden lg:flex flex-col">
          <div className="px-4 py-3 border-b border-navy/5">
            <p className="text-xs font-semibold text-muted uppercase tracking-wide">History</p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
            {conversations.length === 0 ? (
              <p className="text-xs text-muted text-center py-8">No conversations yet</p>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left rounded-lg px-3 py-2.5 mb-1 transition ${
                    c.id === activeId ? 'bg-navy/5 text-navy' : 'hover:bg-surface text-muted'
                  }`}
                >
                  <p className={`text-sm font-medium truncate ${isBn ? 'bn' : ''}`}>{c.title}</p>
                  <p className="text-xs text-muted/70">{c.messages.length} messages</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat */}
        <div className="card overflow-hidden flex flex-col">
          {!active ? (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-xl">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold mb-3">
                      <Sparkles size={24} />
                    </div>
                    <h3 className={`font-semibold text-navy ${isBn ? 'bn' : ''}`}>{t('aiTitle')}</h3>
                    <p className={`text-sm text-muted mt-1 ${isBn ? 'bn' : ''}`}>{t('noMessages')}</p>
                  </div>
                  <div className="grid gap-2">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendQuestion(q.text)}
                        className={`rounded-xl border border-navy/5 px-4 py-3 text-left text-sm text-navy hover:border-gold/30 hover:bg-gold-soft/20 transition ${q.bn ? 'bn' : ''}`}
                      >
                        {q.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
              {active.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? '' : 'w-full'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted">
                        {msg.role === 'user' ? t('messageFrom') : t('messageTo')}
                      </span>
                      {msg.role === 'assistant' && <DemoLabel />}
                      <span className="flex items-center gap-1 text-[10px] text-muted/60">
                        <Clock size={9} /> {formatTimestamp(msg.ts)}
                      </span>
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-navy text-white rounded-br-md'
                          : 'bg-surface text-ink rounded-bl-md'
                      } ${msg.role === 'user' && isBn ? 'bn' : ''} ${msg.role === 'assistant' && /[\u0980-\u09FF]/.test(msg.text) ? 'bn' : ''}`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => handleCopy(msg)}
                        className="mt-1.5 flex items-center gap-1 text-xs text-muted hover:text-navy transition"
                      >
                        {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                        {copiedId === msg.id ? t('copied') : t('copy')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="rounded-2xl rounded-bl-md bg-surface px-4 py-3">
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <div className="border-t border-navy/5 p-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className={`input flex-1 ${isBn ? 'bn' : ''} ${/[\u0980-\u09FF]/.test(input) ? 'bn' : ''}`}
              />
              <button type="submit" disabled={!input.trim() || loading} className="btn-primary px-4">
                <Send size={15} /> <span className="hidden sm:inline">{t('send')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
