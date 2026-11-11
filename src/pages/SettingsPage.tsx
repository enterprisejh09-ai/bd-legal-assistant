
import { useState } from 'react';
import {
  Settings,
  Languages,
  User,
  Bell,
  ShieldCheck,
  Database,
  Download,
  Save,
  Info,
  CheckCircle2,
} from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/ui/PageHeader';

interface UserProfile {
  name: string;
  email: string;
}

interface Preferences {
  emailNotifications: boolean;
  caseNotifications: boolean;
  securityNotifications: boolean;
}

export function SettingsPage() {
  const { lang, setLang, isBn } = useLanguage();

  const [profile, setProfile] = useLocalStorage<UserProfile>(
    'bdla_profile',
    {
      name: '',
      email: '',
    }
  );

  const [preferences, setPreferences] =
    useLocalStorage<Preferences>('bdla_preferences', {
      emailNotifications: true,
      caseNotifications: true,
      securityNotifications: true,
    });

  const [saved, setSaved] = useState(false);

  const [cases] = useLocalStorage<any[]>('bdla_cases', []);

  const updatePreference = (
    key: keyof Preferences,
    value: boolean
  ) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const saveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const exportData = () => {
    const data = {
      profile,
      preferences,
      cases,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'bd-legal-assistant-data.json';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title={isBn ? 'সেটিংস' : 'Settings'}
        subtitle={
          isBn
            ? 'আপনার অ্যাকাউন্ট ও অ্যাপ্লিকেশনের পছন্দ পরিবর্তন করুন।'
            : 'Manage your profile and application preferences.'
        }
        icon={<Settings size={20} />}
      />

      {/* Language Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
              <Languages size={19} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'ভাষা সেটিংস' : 'Language Settings'}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'আপনার পছন্দের ভাষা নির্বাচন করুন।'
                  : 'Choose your preferred language.'}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => setLang('en')}
              className={`rounded-xl border p-4 text-left transition ${
                lang === 'en'
                  ? 'border-gold bg-gold-soft/20'
                  : 'border-border hover:border-gold/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-navy">
                  English
                </span>
                {lang === 'en' && (
                  <CheckCircle2 size={17} className="text-gold-dark" />
                )}
              </div>
              <p className="text-xs text-muted mt-1">
                English interface
              </p>
            </button>

            <button
              onClick={() => setLang('bn')}
              className={`rounded-xl border p-4 text-left transition ${
                lang === 'bn'
                  ? 'border-gold bg-gold-soft/20'
                  : 'border-border hover:border-gold/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-navy bn">
                  বাংলা
                </span>
                {lang === 'bn' && (
                  <CheckCircle2 size={17} className="text-gold-dark" />
                )}
              </div>
              <p className="text-xs text-muted mt-1 bn">
                বাংলা ইন্টারফেস
              </p>
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
              <User size={19} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'আপনার ব্যক্তিগত তথ্য সংরক্ষণ করুন।'
                  : 'Manage your personal information.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-navy mb-2">
                {isBn ? 'আপনার নাম' : 'Full Name'}
              </label>
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile((previous) => ({
                    ...previous,
                    name: e.target.value,
                  }))
                }
                placeholder={isBn ? 'আপনার নাম লিখুন' : 'Enter your name'}
                className="input"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-navy mb-2">
                {isBn ? 'ইমেইল ঠিকানা' : 'Email Address'}
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((previous) => ({
                    ...previous,
                    email: e.target.value,
                  }))
                }
                placeholder="example@email.com"
                className="input"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={saveProfile}
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-xs font-medium text-gold hover:bg-navy/90 transition"
              >
                <Save size={15} />
                {isBn ? 'প্রোফাইল সংরক্ষণ' : 'Save Profile'}
              </button>

              {saved && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle2 size={14} />
                  {isBn ? 'সংরক্ষিত হয়েছে' : 'Saved successfully'}
                </span>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold-soft/50 text-gold-dark flex items-center justify-center">
              <Bell size={19} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'নোটিফিকেশন সেটিংস' : 'Notification Preferences'}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'আপনার নোটিফিকেশন পছন্দ নির্বাচন করুন।'
                  : 'Choose your notification preferences.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: 'emailNotifications' as const,
                title: isBn ? 'ইমেইল নোটিফিকেশন' : 'Email Notifications',
                description: isBn
                  ? 'ইমেইলের মাধ্যমে আপডেট পাওয়ার পছন্দ।'
                  : 'Preference for receiving email updates.',
              },
              {
                key: 'caseNotifications' as const,
                title: isBn ? 'কেস আপডেট' : 'Case Notifications',
                description: isBn
                  ? 'কেস সংক্রান্ত আপডেটের পছন্দ।'
                  : 'Preference for case-related updates.',
              },
              {
                key: 'securityNotifications' as const,
                title: isBn ? 'নিরাপত্তা নোটিফিকেশন' : 'Security Notifications',
                description: isBn
                  ? 'নিরাপত্তা সংক্রান্ত আপডেটের পছন্দ।'
                  : 'Preference for security-related updates.',
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-medium text-navy">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {item.description}
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={preferences[item.key]}
                  onChange={(e) =>
                    updatePreference(item.key, e.target.checked)
                  }
                  className="h-4 w-4 accent-[#B08D35] shrink-0"
                />
              </div>
            ))}
          </div>

          <p className="text-xs text-muted mt-4">
            {isBn
              ? 'এগুলো বর্তমানে শুধু আপনার নোটিফিকেশন পছন্দ সংরক্ষণ করে; প্রকৃত নোটিফিকেশন সার্ভিস এখনো যুক্ত হয়নি।'
              : 'These settings currently save your preferences only; an actual notification service is not connected yet.'}
          </p>
        </CardBody>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
              <ShieldCheck size={19} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'প্রাইভেসি ও নিরাপত্তা' : 'Privacy & Security'}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'আপনার ডেটা কীভাবে সংরক্ষিত হচ্ছে তা জানুন।'
                  : 'Understand how your data is currently stored.'}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">
                {isBn ? 'ডেটা স্টোরেজ' : 'Data Storage'}
              </span>
              <Badge variant="warning">
                {isBn ? 'লোকাল' : 'Local'}
              </Badge>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              {isBn
                ? 'বর্তমানে প্রোফাইল, কেস এবং পছন্দসমূহ আপনার ব্রাউজারের Local Storage-এ রাখা হচ্ছে। এটি সার্ভার-ভিত্তিক নিরাপদ অ্যাকাউন্ট নয়।'
                : 'Currently, profile, case and preference data are stored in your browser Local Storage. This is not a server-based secure account system.'}
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Data Management */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-gold-soft/50 text-gold-dark flex items-center justify-center">
              <Database size={19} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">
                {isBn ? 'ডেটা ম্যানেজমেন্ট' : 'Data Management'}
              </h2>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'আপনার সংরক্ষিত ডেটা Export করুন।'
                  : 'Export your locally stored information.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border p-4">
            <div>
              <p className="text-sm font-medium text-navy">
                {isBn ? 'ডেটা Export' : 'Export Data'}
              </p>
              <p className="text-xs text-muted mt-1">
                {isBn
                  ? 'প্রোফাইল, পছন্দ এবং সংরক্ষিত কেস JSON ফাইলে ডাউনলোড করুন।'
                  : 'Download your profile, preferences and saved cases as a JSON file.'}
              </p>
            </div>

            <button
              onClick={exportData}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-xs font-medium text-gold hover:bg-navy/90 transition shrink-0"
            >
              <Download size={15} />
              {isBn ? 'ডাউনলোড' : 'Export JSON'}
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Information */}
      <div className="flex items-start gap-2 rounded-xl bg-gold-soft/20 border border-gold/20 p-3">
        <Info size={16} className="text-gold-dark mt-0.5 shrink-0" />
        <p className="text-xs text-muted leading-relaxed">
          {isBn
            ? 'BD Legal Assistant-এর এই সংস্করণে Settings-এর কিছু ফিচার Local Storage ভিত্তিক Demo হিসেবে কাজ করছে। প্রকৃত Login, Cloud Backup ও নিরাপত্তা ব্যবস্থা পরবর্তী Backend Integration-এর মাধ্যমে যুক্ত হবে।'
            : 'Some settings in this version of BD Legal Assistant work as Local Storage demos. Real login, cloud backup and security features will require backend integration.'}
        </p>
      </div>
    </div>
  );
}
