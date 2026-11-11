import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Scale,
  Library,
  FileSearch,
  FilePlus2,
  MessageSquare,
  FileText,
  Phone,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Activity,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardBody } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Badge } from '@/components/ui/Badge';
import { laws, lawCategories } from '@/data/laws';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: string;
}

const quickActions = [
  { key: 'askAI', to: '/ai-assistant', icon: Bot, color: 'bg-navy text-gold' },
  { key: 'analyzeCaseShort', to: '/analyze-case', icon: Scale, color: 'bg-navy-light text-gold' },
  { key: 'exploreLaws', to: '/law-library', icon: Library, color: 'bg-navy text-gold' },
  { key: 'analyzeDoc', to: '/document-analyzer', icon: FileSearch, color: 'bg-navy-light text-gold' },
  { key: 'generateDoc', to: '/document-generator', icon: FilePlus2, color: 'bg-navy text-gold' },
] as const;

const sampleActivity: ActivityItem[] = [
  { id: '1', text: 'Asked AI about property rights', time: '2 hours ago', type: 'ai' },
  { id: '2', text: 'Saved case: "Land dispute analysis"', time: '5 hours ago', type: 'case' },
  { id: '3', text: 'Generated: Legal Notice draft', time: '1 day ago', type: 'doc' },
  { id: '4', text: 'Searched: Consumer Rights Protection Act', time: '2 days ago', type: 'search' },
];

export function DashboardPage() {
  const { t, isBn } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [stats] = useLocalStorage('bdla_stats', { questions: 24, savedCases: 3 });
  const [activity] = useLocalStorage<ActivityItem[]>('bdla_activity', sampleActivity);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/ai-assistant?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const popularLaws = laws.filter((l) => l.popular).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome hero */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 lg:p-8 animate-fadeIn">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold/10" />
        <div className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-gold/5" />
        <div className="relative">
          <Badge variant="gold" className="mb-3">
            <Scale size={11} /> {isBn ? 'আইনি প্ল্যাটফর্ম' : 'Legal Platform'}
          </Badge>
          <h1 className={`text-2xl lg:text-3xl font-bold text-white ${isBn ? 'bn' : ''}`}>{t('welcomeTitle')}</h1>
          <p className={`mt-2 text-white/70 max-w-xl ${isBn ? 'bn' : ''}`}>{t('welcomeSubtitle')}</p>

          {/* AI search */}
          <form onSubmit={handleSearch} className="mt-5 max-w-2xl">
            <div className="flex gap-2 rounded-xl bg-white p-1.5">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('askAnything')}
                className={`flex-1 bg-transparent px-3 py-2 text-sm text-ink outline-none ${isBn ? 'bn' : ''}`}
              />
              <button type="submit" className="btn-gold px-4 py-2">
                <Bot size={16} /> {t('askAI')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className={`text-base font-semibold text-navy mb-3 ${isBn ? 'bn' : ''}`}>{t('quickActions')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.key}
                onClick={() => navigate(a.to)}
                className="card card-hover p-4 flex flex-col items-start gap-3 text-left"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-sm font-medium text-navy ${isBn ? 'bn' : ''}`}>{t(a.key)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<MessageSquare size={18} />} label={t('questionsAsked')} value={stats.questions} trend="+12%" color="navy" />
        <StatCard icon={<Bookmark size={18} />} label={t('savedCases')} value={stats.savedCases} trend="+2" color="gold" />
        <StatCard icon={<Library size={18} />} label={t('popularLaws')} value={laws.length} trend="" color="navy" />
        <StatCard icon={<Activity size={18} />} label={t('recentActivity')} value={activity.length} trend="" color="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold text-navy ${isBn ? 'bn' : ''}`}>{t('recentActivity')}</h3>
            </div>
            <div className="space-y-1">
              {activity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface transition">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/5 text-navy shrink-0">
                    {item.type === 'ai' && <Bot size={15} />}
                    {item.type === 'case' && <Scale size={15} />}
                    {item.type === 'doc' && <FileText size={15} />}
                    {item.type === 'search' && <Library size={15} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm text-ink truncate ${isBn ? 'bn' : ''}`}>{item.text}</p>
                    <p className="text-xs text-muted">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Emergency */}
        <Card className="border-gold/20">
          <CardBody>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-gold-dark" />
              <h3 className={`font-semibold text-navy ${isBn ? 'bn' : ''}`}>{t('emergencyAssistance')}</h3>
            </div>
            <p className={`text-xs text-muted mb-4 leading-relaxed ${isBn ? 'bn' : ''}`}>{t('emergencyDesc')}</p>
            <a href="tel:999" className="btn-gold w-full justify-center">
              <Phone size={16} /> {t('callNow')}
            </a>
            <div className="mt-3 space-y-2 text-sm">
              <a href="https://www.police.gov.bd/" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-surface transition">
                <span className={isBn ? 'bn' : ''}>Bangladesh Police</span>
                <ArrowRight size={14} className="text-muted" />
              </a>
              <a href="https://nlaso.gov.bd/" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-surface transition">
                <span className={isBn ? 'bn' : ''}>NLASO Legal Aid</span>
                <ArrowRight size={14} className="text-muted" />
              </a>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Popular laws + categories */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold text-navy ${isBn ? 'bn' : ''}`}>{t('popularLaws')}</h3>
              <button onClick={() => navigate('/law-library')} className="text-xs text-gold-dark font-medium hover:underline flex items-center gap-1">
                {isBn ? 'সব দেখুন' : 'View all'} <ArrowRight size={12} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {popularLaws.map((law) => (
                <button
                  key={law.id}
                  onClick={() => navigate('/law-library')}
                  className="rounded-xl border border-navy/5 p-3 text-left hover:border-gold/30 hover:shadow-card transition"
                >
                  <p className={`text-sm font-medium text-navy leading-tight ${isBn ? 'bn' : ''}`}>{isBn ? law.bnName : law.name}</p>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{isBn ? law.bnDescription : law.description}</p>
                  <Badge variant="gold" className="mt-2">{law.year}</Badge>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className={`font-semibold text-navy mb-4 ${isBn ? 'bn' : ''}`}>{t('legalCategories')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {lawCategories.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/law-library?cat=${cat}`)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-navy hover:bg-surface transition"
                >
                  <CategoryIcon category={cat} size={14} />
                  <span className={`truncate ${isBn ? 'bn' : ''}`}>{t(cat)}</span>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode; label: string; value: number; trend: string; color: 'navy' | 'gold' }) {
  return (
    <Card hover>
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color === 'navy' ? 'bg-navy text-gold' : 'bg-gold-soft text-gold-dark'}`}>
            {icon}
          </div>
          {trend && (
            <span className="flex items-center gap-0.5 text-xs text-green-600 font-medium">
              <TrendingUp size={11} /> {trend}
            </span>
          )}
        </div>
        <p className="mt-3 text-2xl font-bold text-navy">{value}</p>
        <p className="text-xs text-muted">{label}</p>
      </CardBody>
    </Card>
  );
}
