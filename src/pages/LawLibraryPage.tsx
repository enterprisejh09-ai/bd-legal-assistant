import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Library, Search, ExternalLink, Info, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PageHeader, EmptyState } from '@/components/ui/PageHeader';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { laws, lawCategories, type Law } from '@/data/laws';
import type { TranslationKey } from '@/data/translations';

export function LawLibraryPage() {
  const { t, isBn } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('cat') || '');
  const [selected, setSelected] = useState<Law | null>(null);

  useEffect(() => {
    const q = searchParams.get('q');
    const c = searchParams.get('cat');
    setQuery(q || '');
    setCategory(c || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return laws.filter((l) => {
      const matchesCat = !category || l.category === category;
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.bnName.includes(query) ||
        l.description.toLowerCase().includes(q) ||
        l.bnDescription.includes(query);
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="space-y-5">
      <PageHeader title={t('lawLibraryTitle')} subtitle={t('lawLibrarySubtitle')} icon={<Library size={20} />} />

      {/* Filters */}
      <Card>
        <CardBody className="space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                updateParam('q', e.target.value);
              }}
              placeholder={t('searchLaws')}
              className={`input pl-9 ${isBn ? 'bn' : ''}`}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setCategory('');
                updateParam('cat', '');
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                !category ? 'bg-navy text-gold' : 'bg-surface text-muted hover:bg-navy/5'
              }`}
            >
              {t('allCategories')}
            </button>
            {lawCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  updateParam('cat', cat);
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  category === cat ? 'bg-navy text-gold' : 'bg-surface text-muted hover:bg-navy/5'
                } ${isBn ? 'bn' : ''}`}
              >
                <CategoryIcon category={cat} size={12} />
                {t(cat)}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Verification notice */}
      <div className="flex gap-2 items-start rounded-xl bg-gold-soft/30 border border-gold/20 px-4 py-3">
        <Info size={16} className="text-gold-dark mt-0.5 shrink-0" />
        <p className={`text-xs text-navy leading-relaxed ${isBn ? 'bn' : ''}`}>{t('verificationNotice')}</p>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState icon={<BookOpen size={28} />} title={t('noResults')} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((law) => (
            <Card key={law.id} hover>
              <CardBody>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/5 text-navy shrink-0">
                    <CategoryIcon category={law.category} size={16} />
                  </div>
                  <Badge variant="gold">{law.year}</Badge>
                </div>
                <h3 className={`text-sm font-semibold text-navy leading-tight ${isBn ? 'bn' : ''}`}>
                  {isBn ? law.bnName : law.name}
                </h3>
                <p className={`text-xs text-muted mt-2 line-clamp-3 ${isBn ? 'bn' : ''}`}>
                  {isBn ? law.bnDescription : law.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => setSelected(law)} className="text-xs font-medium text-gold-dark hover:underline">
                    {t('viewDetails')}
                  </button>
                  <span className="text-muted/30">·</span>
                  <span className={`text-xs text-muted ${isBn ? 'bn' : ''}`}>{t(law.category as TranslationKey)}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Details modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? (isBn ? selected.bnName : selected.name) : ''} maxWidth="max-w-lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="navy"><CategoryIcon category={selected.category} size={11} /> {t(selected.category as TranslationKey)}</Badge>
              <Badge variant="gold">{selected.year}</Badge>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">{isBn ? 'বর্ণনা' : 'Description'}</p>
              <p className={`text-sm text-ink leading-relaxed ${isBn ? 'bn' : ''}`}>{isBn ? selected.bnDescription : selected.description}</p>
            </div>
            <div className="rounded-xl bg-surface p-3">
              <p className="text-xs text-muted mb-2">{t('verificationNotice')}</p>
              <a
                href={selected.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark hover:underline"
              >
                <ExternalLink size={14} /> {t('officialSource')} · bdlaws.minlaw.gov.bd
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Info size={12} />
              {isBn ? 'আইনি বিধান যাচাইয়ের জন্য অফিসিয়াল উৎস দেখুন।' : 'Refer to the official source for verified legal provisions.'}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
