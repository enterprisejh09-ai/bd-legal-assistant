import { useState, useMemo } from 'react';
import {
  FilePlus2,
  ScrollText,
  FileText,
  MessageSquareWarning,
  Home,
  Banknote,
  FileSignature,
  Mail,
  Copy,
  Check,
  Download,
  Printer,
  Edit3,
  Eye,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/Toast';
import { Card, CardBody } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { docTemplates, type DocTemplate } from '@/data/docTemplates';
import type { TranslationKey } from '@/data/translations';
import { copyToClipboard, downloadTextFile } from '@/utils/helpers';

const iconMap: Record<string, typeof ScrollText> = {
  ScrollText,
  FileText,
  MessageSquareWarning,
  Home,
  Banknote,
  FileSignature,
  Mail,
};

export function DocumentGeneratorPage() {
  const { t, isBn } = useLanguage();
  const { notify } = useToast();
  const [selectedTpl, setSelectedTpl] = useState<DocTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [editedDoc, setEditedDoc] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedDoc = useMemo(() => {
    if (!selectedTpl) return '';
    return selectedTpl.body({ ...values, date: values.date || new Date().toLocaleDateString() });
  }, [selectedTpl, values]);

  const currentDoc = isEditing ? editedDoc : generatedDoc;

  const selectTemplate = (tpl: DocTemplate) => {
    setSelectedTpl(tpl);
    setValues({});
    setEditedDoc('');
    setIsEditing(false);
  };

  const handleCopy = async () => {
    if (!currentDoc) return;
    await copyToClipboard(currentDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    notify(t('copied'), 'success');
  };

  const handleDownload = () => {
    if (!currentDoc || !selectedTpl) return;
    const name = `${selectedTpl.id}-draft.txt`;
    downloadTextFile(name, `${t('draftWarning')}\n\n${currentDoc}`);
    notify(t('download'), 'success');
  };

  const handlePrint = () => {
    if (!currentDoc) return;
    const w = window.open('', '_blank');
    if (!w) {
      notify(isBn ? 'পপ-আপ ব্লক করা হয়েছে' : 'Pop-up blocked', 'error');
      return;
    }
    w.document.write(`<html><head><title>BD Legal Assistant - Document Draft</title>
      <style>body{font-family:Georgia,serif;padding:40px;max-width:720px;margin:0 auto;line-height:1.6;color:#202938;}
      .warn{background:#F7E9B6;padding:12px;border-radius:8px;font-size:12px;margin-bottom:24px;font-family:sans-serif;}</style></head>
      <body><div class="warn">${t('draftWarning')}</div><pre style="white-space:pre-wrap;font-family:inherit">${currentDoc.replace(/</g, '&lt;')}</pre></body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="space-y-5">
      <PageHeader title={t('docGenTitle')} subtitle={t('docGenSubtitle')} icon={<FilePlus2 size={20} />} />

      {!selectedTpl ? (
        /* Template selection */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docTemplates.map((tpl) => {
            const Icon = iconMap[tpl.icon] ?? FileText;
            return (
              <button
                key={tpl.id}
                onClick={() => selectTemplate(tpl)}
                className="card card-hover p-5 text-left"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold mb-3">
                  <Icon size={20} />
                </div>
                <h3 className={`text-sm font-semibold text-navy ${isBn ? 'bn' : ''}`}>{t(tpl.labelKey as TranslationKey)}</h3>
                <p className={`text-xs text-muted mt-1 ${isBn ? 'bn' : ''}`}>{t('selectTemplate')}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Form */}
          <Card>
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{t(selectedTpl.labelKey as TranslationKey)}</Badge>
                </div>
                <button onClick={() => { setSelectedTpl(null); setValues({}); setEditedDoc(''); }} className="text-xs text-muted hover:text-navy">
                  {isBn ? 'টেমপ্লেট পরিবর্তন' : 'Change template'}
                </button>
              </div>
              <div className="space-y-3">
                {selectedTpl.fields.map((field) => (
                  field.key === 'details' ? (
                    <Textarea
                      key={field.key}
                      label={t(field.labelKey as TranslationKey)}
                      value={values[field.key] || ''}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      rows={4}
                    />
                  ) : (
                    <Input
                      key={field.key}
                      label={t(field.labelKey as TranslationKey)}
                      value={values[field.key] || ''}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                    />
                  )
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Preview */}
          <Card className="flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-navy/5">
              <div className="flex items-center gap-2">
                <Eye size={15} className="text-muted" />
                <h3 className={`text-sm font-semibold text-navy ${isBn ? 'bn' : ''}`}>{t('livePreview')}</h3>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    if (!isEditing) setEditedDoc(generatedDoc);
                    setIsEditing(!isEditing);
                  }}
                  className={`btn-ghost p-2 ${isEditing ? 'text-gold-dark bg-gold-soft/30' : ''}`}
                  title={t('editPreview')}
                >
                  <Edit3 size={15} />
                </button>
                <button onClick={handleCopy} className="btn-ghost p-2" title={t('copy')}>
                  {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                </button>
                <button onClick={handleDownload} className="btn-ghost p-2" title={t('download')}>
                  <Download size={15} />
                </button>
                <button onClick={handlePrint} className="btn-ghost p-2" title={t('print')}>
                  <Printer size={15} />
                </button>
              </div>
            </div>

            {/* Draft warning */}
            <div className="mx-5 mt-3 rounded-lg bg-gold-soft/40 border border-gold/20 px-3 py-2">
              <p className={`text-[11px] text-navy leading-relaxed ${isBn ? 'bn' : ''}`}>{t('draftWarning')}</p>
            </div>

            <div className="flex-1 p-5 overflow-y-auto scrollbar-thin">
              {isEditing ? (
                <textarea
                  value={editedDoc}
                  onChange={(e) => setEditedDoc(e.target.value)}
                  className="w-full h-full min-h-[300px] rounded-xl border border-navy/10 p-4 text-sm font-serif resize-none focus:outline-none focus:ring-2 focus:ring-gold/40"
                />
              ) : (
                <pre className={`whitespace-pre-wrap text-sm text-ink font-serif leading-relaxed ${/[\u0980-\u09FF]/.test(generatedDoc) ? 'bn' : ''}`}>
                  {generatedDoc || 'Fill the form to see preview...'}
                </pre>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
