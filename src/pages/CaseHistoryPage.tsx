
import { useMemo, useState } from 'react';
import {
  History,
  Search,
  Trash2,
  Eye,
  X,
  Calendar,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ShieldAlert,
  BriefcaseBusiness,
} from 'lucide-react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/Toast';
import type { CaseAnalysisResult } from '@/utils/aiLogic';

interface SavedCase {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  fileName?: string;
  analysis: CaseAnalysisResult;
  createdAt: number;
}

export function CaseHistoryPage() {
  const { isBn } = useLanguage();
  const { notify } = useToast();

  const [savedCases, setSavedCases] = useLocalStorage<SavedCase[]>(
    'bdla_cases',
    []
  );

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState<SavedCase | null>(null);

  const filteredCases = useMemo(() => {
    return savedCases
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          category === 'all' || item.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [savedCases, search, category]);

  const categories = [...new Set(savedCases.map((item) => item.category))];

  const formatDate = (date: number) => {
    return new Date(date).toLocaleString(
      isBn ? 'bn-BD' : 'en-US',
      {
        dateStyle: 'medium',
        timeStyle: 'short',
      }
    );
  };

  const deleteCase = (id: string) => {
    if (!window.confirm(isBn ? 'এই রিপোর্টটি মুছে ফেলবেন?' : 'Delete this case report?')) {
      return;
    }

    setSavedCases((prev) => prev.filter((item) => item.id !== id));

    if (selectedCase?.id === id) {
      setSelectedCase(null);
    }

    notify(
      isBn ? 'রিপোর্ট মুছে ফেলা হয়েছে' : 'Case report deleted',
      'success'
    );
  };

  const clearHistory = () => {
    if (savedCases.length === 0) return;

    if (!window.confirm(
      isBn
        ? 'সব Case History মুছে ফেলতে চান?'
        : 'Are you sure you want to delete all case history?'
    )) {
      return;
    }

    setSavedCases([]);
    setSelectedCase(null);

    notify(
      isBn ? 'সব History মুছে ফেলা হয়েছে' : 'All history cleared',
      'success'
    );
  };

  const labels = {
    title: isBn ? 'কেস হিস্টোরি' : 'Case History',
    subtitle: isBn
      ? 'আপনার সংরক্ষিত সকল কেস বিশ্লেষণ দেখুন'
      : 'View and manage your previously saved case analyses',
    search: isBn ? 'কেস খুঁজুন...' : 'Search cases...',
    all: isBn ? 'সকল ক্যাটাগরি' : 'All Categories',
    empty: isBn ? 'কোনো রিপোর্ট পাওয়া যায়নি' : 'No case history found',
    emptyDesc: isBn
      ? 'Case Analysis পেজ থেকে নতুন রিপোর্ট তৈরি করুন।'
      : 'Create a new report from the Analyze Case page.',
    details: isBn ? 'বিস্তারিত দেখুন' : 'View Details',
    delete: isBn ? 'মুছুন' : 'Delete',
    summary: isBn ? 'সারসংক্ষেপ' : 'Summary',
    issues: isBn ? 'আইনি বিষয়সমূহ' : 'Legal Issues',
    topics: isBn ? 'সম্পর্কিত বিষয়' : 'Related Topics',
    steps: isBn ? 'পরবর্তী করণীয়' : 'Recommended Steps',
    cautions: isBn ? 'সতর্কতা' : 'Important Cautions',
    lawyer: isBn ? 'কখন আইনজীবীর সাহায্য নেবেন' : 'When to Consult a Lawyer',
    description: isBn ? 'ঘটনার বিবরণ' : 'Incident Description',
    date: isBn ? 'বিশ্লেষণের তারিখ' : 'Analysis Date',
    location: isBn ? 'স্থান' : 'Location',
    total: isBn ? 'মোট রিপোর্ট' : 'Total Reports',
    clear: isBn ? 'সব মুছুন' : 'Clear All',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <History className="text-gold" size={23} />
            <h1 className="text-2xl font-bold text-navy">
              {labels.title}
            </h1>
          </div>
          <p className="text-sm text-muted">{labels.subtitle}</p>
        </div>

        <button
          onClick={clearHistory}
          disabled={savedCases.length === 0}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
        >
          <Trash2 size={16} />
          {labels.clear}
        </button>
      </div>

      {/* Statistics */}
      <div className="bg-white border border-navy/5 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-amber-50 flex items-center justify-center">
            <BriefcaseBusiness className="text-gold" size={21} />
          </div>
          <div>
            <p className="text-sm text-muted">{labels.total}</p>
            <p className="text-2xl font-bold text-navy">
              {savedCases.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.search}
            className="input pl-10"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input sm:w-56"
        >
          <option value="all">{labels.all}</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Case List */}
      {filteredCases.length === 0 ? (
        <div className="bg-white rounded-2xl border border-navy/5 p-12 text-center">
          <History size={42} className="mx-auto text-muted/40 mb-4" />

          <h3 className="font-semibold text-navy text-lg">
            {labels.empty}
          </h3>

          <p className="text-sm text-muted mt-2">
            {labels.emptyDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-navy/5 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                      {item.category}
                    </span>

                    <span className="text-xs text-muted">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-navy text-lg mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {item.date || 'N/A'}
                    </span>

                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedCase(item)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy text-white text-sm hover:bg-navy/90"
                  >
                    <Eye size={15} />
                    {labels.details}
                  </button>

                  <button
                    onClick={() => deleteCase(item.id)}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    title={labels.delete}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-[80] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-navy/10 p-5 flex items-center justify-between z-10">
              <div className="min-w-0">
                <h2 className="font-bold text-lg text-navy">
                  {selectedCase.title}
                </h2>
                <p className="text-xs text-muted mt-1">
                  {formatDate(selectedCase.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 rounded-lg hover:bg-surface"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-amber-50 text-amber-700 rounded-lg px-3 py-2">
                  {selectedCase.category}
                </span>

                {selectedCase.location && (
                  <span className="bg-surface text-muted rounded-lg px-3 py-2">
                    <MapPin size={14} className="inline mr-1" />
                    {selectedCase.location}
                  </span>
                )}
              </div>

              <section>
                <h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <FileText size={18} />
                  {labels.description}
                </h3>
                <p className="text-sm text-muted whitespace-pre-wrap">
                  {selectedCase.description}
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-navy mb-2">
                  {labels.summary}
                </h3>
                <p className="text-sm text-muted leading-7">
                  {selectedCase.analysis.summary}
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  {labels.issues}
                </h3>
                <ul className="space-y-2">
                  {selectedCase.analysis.issues.map((text, index) => (
                    <li key={index} className="text-sm text-muted flex gap-2">
                      <span className="text-gold">•</span>
                      {text}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-navy mb-3">
                  {labels.topics}
                </h3>
                <ul className="space-y-2">
                  {selectedCase.analysis.topics.map((text, index) => (
                    <li key={index} className="text-sm text-muted">
                      • {text}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  {labels.steps}
                </h3>
                <ol className="space-y-2 list-decimal pl-5">
                  {selectedCase.analysis.steps.map((text, index) => (
                    <li key={index} className="text-sm text-muted">
                      {text}
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <ShieldAlert size={18} />
                  {labels.cautions}
                </h3>
                <ul className="space-y-2">
                  {selectedCase.analysis.cautions.map((text, index) => (
                    <li key={index} className="text-sm text-muted">
                      • {text}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <Lightbulb size={18} />
                  {labels.lawyer}
                </h3>
                <ul className="space-y-2">
                  {selectedCase.analysis.whenToLawyer.map((text, index) => (
                    <li key={index} className="text-sm text-muted">
                      • {text}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
                This is a preliminary demo analysis, not professional legal advice.
                Please consult a qualified lawyer for your specific situation.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
