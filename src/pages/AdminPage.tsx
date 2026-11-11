
import { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Search,
  Trash2,
  Calendar,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Clock,
  BriefcaseBusiness,
} from 'lucide-react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, EmptyState } from '@/components/ui/PageHeader';

interface SavedCase {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  fileName?: string;
  analysis: {
    summary: string;
    issues: string[];
    topics: string[];
    steps: string[];
    cautions: string[];
    whenToLawyer: string[];
  };
  createdAt: number;
}

export function AdminPage() {
  const { isBn } = useLanguage();

  const [cases, setCases] = useLocalStorage<SavedCase[]>(
    'bdla_cases',
    []
  );

  const [query, setQuery] = useState('');

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => b.createdAt - a.createdAt);
  }, [cases]);

  const filteredCases = useMemo(() => {
    const search = query.toLowerCase().trim();

    return sortedCases.filter((item) =>
      item.title.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search)
    );
  }, [sortedCases, query]);

  const categoryCount = new Set(
    cases.map((item) => item.category)
  ).size;

  const deleteCase = (id: string) => {
    const confirmed = window.confirm(
      isBn
        ? 'আপনি কি এই কেসটি মুছে ফেলতে চান?'
        : 'Are you sure you want to delete this case?'
    );

    if (!confirmed) return;

    setCases((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const stats = [
    {
      title: isBn ? 'মোট কেস' : 'Total Cases',
      value: cases.length,
      icon: <FileText size={20} />,
      color: 'bg-navy/5 text-navy',
    },
    {
      title: isBn ? 'কেস ক্যাটাগরি' : 'Case Categories',
      value: categoryCount,
      icon: <BriefcaseBusiness size={20} />,
      color: 'bg-gold-soft/50 text-gold-dark',
    },
    {
      title: isBn ? 'সর্বশেষ কেস' : 'Latest Cases',
      value: cases.filter(
        (item) =>
          Date.now() - item.createdAt < 7 * 24 * 60 * 60 * 1000
      ).length,
      icon: <Activity size={20} />,
      color: 'bg-navy/5 text-navy',
    },
    {
      title: isBn ? 'ব্যবহারকারী' : 'Registered Users',
      value: 'N/A',
      icon: <Users size={20} />,
      color: 'bg-gold-soft/50 text-gold-dark',
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title={isBn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}
        subtitle={
          isBn
            ? 'সিস্টেমের কেস ও কার্যক্রম পর্যবেক্ষণ করুন।'
            : 'Monitor cases and system activities.'
        }
        icon={<LayoutDashboard size={20} />}
      />

      {/* Admin notice */}
      <div className="flex items-start gap-3 rounded-xl border border-gold/20 bg-gold-soft/30 px-4 py-3">
        <ShieldCheck
          size={18}
          className="mt-0.5 shrink-0 text-gold-dark"
        />
        <div>
          <p className="text-sm font-semibold text-navy">
            {isBn ? 'অ্যাডমিন কন্ট্রোল প্যানেল' : 'Admin Control Panel'}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {isBn
              ? 'এটি বর্তমানে লোকাল ডেমো ড্যাশবোর্ড। ডেটাবেজ ও অ্যাডমিন অথেনটিকেশন এখনো সংযুক্ত হয়নি।'
              : 'This is currently a local demo dashboard. Database integration and admin authentication are not connected yet.'}
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-navy">
                    {stat.value}
                  </p>
                </div>

                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* System overview */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={18} className="text-gold-dark" />
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'সিস্টেম ওভারভিউ' : 'System Overview'}
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {isBn ? 'কেস ম্যানেজমেন্ট' : 'Case Management'}
                </span>
                <Badge variant="success">
                  {isBn ? 'সক্রিয়' : 'Available'}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {isBn ? 'লোকাল স্টোরেজ' : 'Local Storage'}
                </span>
                <Badge variant="success">
                  {isBn ? 'সক্রিয়' : 'Active'}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {isBn ? 'Supabase Database' : 'Supabase Database'}
                </span>
                <Badge variant="warning">
                  {isBn ? 'সংযুক্ত নয়' : 'Not Connected'}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {isBn ? 'অ্যাডমিন অথেনটিকেশন' : 'Admin Authentication'}
                </span>
                <Badge variant="warning">
                  {isBn ? 'সংযুক্ত নয়' : 'Not Connected'}
                </Badge>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-gold-dark" />
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Activity'}
              </h2>
            </div>

            {sortedCases.length > 0 ? (
              <div className="space-y-3">
                {sortedCases.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-start gap-2">
                    <div className="mt-1 h-2 w-2 rounded-full bg-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-navy truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted mt-1">
                        {new Date(item.createdAt).toLocaleString(
                          isBn ? 'bn-BD' : 'en-US'
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">
                {isBn
                  ? 'এখনো কোনো কার্যক্রম নেই।'
                  : 'No activity recorded yet.'}
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Case management */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-semibold text-navy">
                {isBn ? 'কেস ম্যানেজমেন্ট' : 'Case Management'}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'সংরক্ষিত কেসগুলো পর্যবেক্ষণ ও পরিচালনা করুন।'
                  : 'Monitor and manage saved cases.'}
              </p>
            </div>

            <Badge variant="navy">
              {cases.length} {isBn ? 'টি কেস' : 'Cases'}
            </Badge>
          </div>

          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isBn ? 'কেস খুঁজুন...' : 'Search cases...'
              }
              className="input pl-9"
            />
          </div>

          {filteredCases.length === 0 ? (
            <EmptyState
              icon={<FileText size={28} />}
              title={
                isBn
                  ? 'কোনো কেস পাওয়া যায়নি'
                  : 'No cases found'
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredCases.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border p-3 sm:p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-navy">
                        {item.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness size={13} />
                          {item.category}
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {item.location || 'N/A'}
                        </span>

                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {new Date(item.createdAt).toLocaleDateString(
                            isBn ? 'bn-BD' : 'en-US'
                          )}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-muted line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteCase(item.id)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition shrink-0"
                    >
                      <Trash2 size={14} />
                      {isBn ? 'মুছুন' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Important note */}
      <div className="flex items-start gap-2 rounded-xl bg-surface p-3">
        <AlertTriangle size={16} className="text-gold-dark mt-0.5 shrink-0" />
        <p className="text-xs text-muted leading-relaxed">
          {isBn
            ? 'গুরুত্বপূর্ণ: এই ডেমো ভার্সনে কেস ডেটা ব্রাউজারের Local Storage-এ থাকে। এটি নিরাপদ সার্ভার-ভিত্তিক অ্যাডমিন প্যানেল নয়।'
            : 'Important: In this demo version, case data is stored in browser Local Storage. This is not a secure server-based admin panel.'}
        </p>
      </div>
    </div>
  );
}
