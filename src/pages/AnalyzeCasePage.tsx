import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, FileText, AlertTriangle, Lightbulb, CheckCircle2, ShieldAlert, Paperclip } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/components/ui/Toast';
import { Card, CardBody } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { DemoLabel } from '@/components/ui/Disclaimer';
import { caseCategories, generateCaseAnalysis, type CaseAnalysisResult } from '@/utils/aiLogic';
import { formatDate } from '@/utils/helpers';

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

export function AnalyzeCasePage() {
  const { t, isBn } = useLanguage();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [, setSavedCases] = useLocalStorage<SavedCase[]>('bdla_cases', []);

  const [form, setForm] = useState({
    title: '',
    category: '',
    incidentDate: '',
    location: '',
    description: '',
  });
  const [fileName, setFileName] = useState<string | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<CaseAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = t('requiredField');
    if (!form.category) e.category = t('requiredField');
    if (!form.description.trim()) e.description = t('requiredField');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      notify(isBn ? 'অনুগ্রহ করে প্রয়োজনীয় ক্ষেত্র পূরণ করুন' : 'Please fill required fields', 'error');
      return;
    }
    setLoading(true);
    setAnalysis(null);
    setTimeout(() => {
      const result = generateCaseAnalysis({
        title: form.title,
        category: t(form.category as never),
        description: form.description,
        location: form.location,
      });
      setAnalysis(result);
      setLoading(false);

      const newCase: SavedCase = {
        id: `case${Date.now()}`,
        title: form.title,
        category: form.category,
        date: form.incidentDate,
        location: form.location,
        description: form.description,
        fileName,
        analysis: result,
        createdAt: Date.now(),
      };
      setSavedCases((prev) => [newCase, ...prev]);
      notify(isBn ? 'মামলা বিশ্লেষণ সংরক্ষিত হয়েছে' : 'Case analysis saved', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-5">
      <PageHeader title={t('analyzeTitle')} subtitle={t('analyzeSubtitle')} icon={<Scale size={20} />} />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Form */}
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('caseTitle')}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                error={errors.title}
                placeholder={isBn ? 'মামলার শিরোনাম লিখুন' : 'Enter case title'}
              />
              <Select
                label={t('legalCategory')}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                error={errors.category}
              >
                <option value="">{isBn ? 'বিভাগ নির্বাচন করুন' : 'Select category'}</option>
                {caseCategories.map((cat) => (
                  <option key={cat} value={cat} className={isBn ? 'bn' : ''}>
                    {t(cat)}
                  </option>
                ))}
              </Select>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  label={t('incidentDate')}
                  value={form.incidentDate}
                  onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                />
                <Input
                  label={t('location')}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder={isBn ? 'অবস্থান' : 'Location'}
                />
              </div>
              <Textarea
                label={t('description')}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                error={errors.description}
                rows={5}
                placeholder={isBn ? 'ঘটনা বিস্তারিত বর্ণনা করুন...' : 'Describe the incident in detail...'}
              />
              <div>
                <label className="label">{t('documentAttachment')}</label>
                <label className="flex items-center gap-2 rounded-xl border border-dashed border-navy/15 px-4 py-3 cursor-pointer hover:bg-surface transition text-sm text-muted">
                  <Paperclip size={16} />
                  {fileName ? <span className="text-navy font-medium">{fileName}</span> : isBn ? 'ফাইল নির্বাচন করুন' : 'Choose file (optional)'}
                  <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.docx,.txt" />
                </label>
              </div>
              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? t('loading') : t('submitAnalysis')}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Results */}
        <div>
          {loading && (
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy mb-3">
                  <Scale size={22} className="animate-pulse" />
                </div>
                <p className={`text-sm text-muted ${isBn ? 'bn' : ''}`}>{t('loading')}</p>
              </CardBody>
            </Card>
          )}
          {!loading && !analysis && (
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-16 text-center">
                <FileText size={40} className="text-muted/40 mb-3" />
                <p className={`text-sm text-muted max-w-xs ${isBn ? 'bn' : ''}`}>
                  {isBn ? 'বিশ্লেষণ দেখতে ফর্ম পূরণ করে জমা দিন।' : 'Fill the form and submit to see your case analysis.'}
                </p>
              </CardBody>
            </Card>
          )}
          {analysis && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <Badge variant="gold"><Scale size={11} /> {t('caseSummary')}</Badge>
                <DemoLabel />
              </div>
              <Card><CardBody><p className={`text-sm text-ink leading-relaxed ${isBn ? 'bn' : ''}`}>{analysis.summary}</p></CardBody></Card>

              <ResultSection icon={<AlertTriangle size={16} />} title={t('possibleIssues')} items={analysis.issues} />
              <ResultSection icon={<FileText size={16} />} title={t('relevantTopics')} items={analysis.topics} />
              <ResultSection icon={<Lightbulb size={16} />} title={t('suggestedSteps')} items={analysis.steps} numbered />
              <ResultSection icon={<ShieldAlert size={16} />} title={t('cautions')} items={analysis.cautions} warning />
              <ResultSection icon={<CheckCircle2 size={16} />} title={t('whenContactLawyer')} items={analysis.whenToLawyer} />

              <Card className="border-gold/20 bg-gold-soft/20">
                <CardBody>
                  <p className={`text-xs text-navy leading-relaxed ${isBn ? 'bn' : ''}`}>{t('disclaimer')}</p>
                  <button onClick={() => navigate('/case-history')} className="mt-3 btn-outline text-xs">
                    {isBn ? 'ইতিহাসে দেখুন' : 'View in History'}
                  </button>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultSection({
  icon,
  title,
  items,
  numbered,
  warning,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  numbered?: boolean;
  warning?: boolean;
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-2 mb-3">
          <span className={warning ? 'text-gold-dark' : 'text-navy'}>{icon}</span>
          <h4 className={`text-sm font-semibold ${warning ? 'text-gold-dark' : 'text-navy'}`}>{title}</h4>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className={`flex gap-2 text-sm text-ink leading-relaxed ${/[\u0980-\u09FF]/.test(item) ? 'bn' : ''}`}>
              <span className={`shrink-0 ${warning ? 'text-gold-dark' : 'text-muted'} font-medium`}>
                {numbered ? `${i + 1}.` : '•'}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
