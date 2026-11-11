
import { useMemo, useState } from 'react';
import {
  Search,
  Scale,
  MapPin,
  Phone,
  Globe,
  Mail,
  ShieldCheck,
  Users,
  ExternalLink,
  Info,
} from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader, EmptyState } from '@/components/ui/PageHeader';

interface LegalService {
  id: number;
  name: string;
  bnName: string;
  category: string;
  bnCategory: string;
  description: string;
  bnDescription: string;
  location: string;
  bnLocation: string;
  phone: string;
  email?: string;
  website: string;
  hours?: string;
}

const legalServices: LegalService[] = [
  {
    id: 1,
    name: 'National Legal Aid Services Organization (NLASO)',
    bnName: 'জাতীয় আইনগত সহায়তা প্রদান সংস্থা',
    category: 'Government Legal Aid',
    bnCategory: 'সরকারি আইনগত সহায়তা',
    description:
      'Government legal aid service for people who need legal assistance. Contact the national helpline for information.',
    bnDescription:
      'আইনগত সহায়তা প্রয়োজন এমন মানুষের জন্য সরকারি সেবা। বিস্তারিত জানতে জাতীয় হেল্পলাইনে যোগাযোগ করুন।',
    location: 'Bangladesh',
    bnLocation: 'বাংলাদেশ',
    phone: '16699',
    website: 'https://nlaso.gov.bd/',
  },
  {
    id: 2,
    name: 'Bangladesh Legal Aid and Services Trust (BLAST)',
    bnName: 'বাংলাদেশ লিগ্যাল এইড অ্যান্ড সার্ভিসেস ট্রাস্ট (BLAST)',
    category: 'Legal Aid Organization',
    bnCategory: 'আইনগত সহায়তা সংস্থা',
    description:
      'A non-governmental legal services organization providing legal aid and working for access to justice.',
    bnDescription:
      'আইনগত সহায়তা প্রদান এবং সবার জন্য ন্যায়বিচার নিশ্চিত করতে কাজ করা একটি বেসরকারি সংস্থা।',
    location: 'Kakrail, Dhaka',
    bnLocation: 'কাকরাইল, ঢাকা',
    phone: '01715-220220',
    email: 'mail@blast.org.bd',
    website: 'https://blast.org.bd/',
    hours: '9:00 AM – 5:00 PM',
  },
  {
    id: 3,
    name: 'Ain o Salish Kendra (ASK)',
    bnName: 'আইন ও সালিশ কেন্দ্র (আসক)',
    category: 'Human Rights and Legal Aid',
    bnCategory: 'মানবাধিকার ও আইনগত সহায়তা',
    description:
      'A human rights and legal aid organization offering legal assistance and other supportive services.',
    bnDescription:
      'মানবাধিকার ও আইনগত সহায়তা প্রদানকারী সংস্থা। আইনগত সহায়তা এবং অন্যান্য সহযোগিতামূলক সেবা দেয়।',
    location: 'Lalmatia, Dhaka',
    bnLocation: 'লালমাটিয়া, ঢাকা',
    phone: '01724-415677',
    email: 'ask@citechco.net',
    website: 'https://www.askbd.org/ask/',
    hours: '9:00 AM – 5:00 PM',
  },
];

export function LegalHelpPage() {
  const { isBn } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredServices = useMemo(() => {
    const search = query.toLowerCase().trim();

    return legalServices.filter((service) => {
      const matchesCategory =
        category === 'all' || service.category === category;

      const matchesSearch =
        !search ||
        service.name.toLowerCase().includes(search) ||
        service.bnName.includes(query) ||
        service.location.toLowerCase().includes(search) ||
        service.bnLocation.includes(query) ||
        service.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, category]);

  return (
    <div className="space-y-5">
      <PageHeader
        title={isBn ? 'আইনগত সহায়তা ডিরেক্টরি' : 'Legal Help Directory'}
        subtitle={
          isBn
            ? 'বাংলাদেশে আইনগত সহায়তা প্রদানকারী প্রতিষ্ঠান ও যোগাযোগের তথ্য খুঁজুন।'
            : 'Find legal aid organizations and their contact information in Bangladesh.'
        }
        icon={<Scale size={20} />}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                <Scale size={19} />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">
                  {legalServices.length}
                </p>
                <p className="text-xs text-muted">
                  {isBn ? 'সহায়তা প্রতিষ্ঠান' : 'Legal Aid Services'}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gold-soft/50 text-gold-dark flex items-center justify-center">
                <Phone size={19} />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">16699</p>
                <p className="text-xs text-muted">
                  {isBn ? 'জাতীয় আইনগত সহায়তা হেল্পলাইন' : 'National Legal Aid Helpline'}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                <Users size={19} />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">BD</p>
                <p className="text-xs text-muted">
                  {isBn ? 'বাংলাদেশভিত্তিক তথ্য' : 'Bangladesh Directory'}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Search and filters */}
      <Card>
        <CardBody className="space-y-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isBn
                  ? 'প্রতিষ্ঠান, এলাকা বা সেবা খুঁজুন...'
                  : 'Search organization, location or service...'
              }
              className={`input pl-9 ${isBn ? 'bn' : ''}`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                category === 'all'
                  ? 'bg-navy text-gold'
                  : 'bg-surface text-muted hover:bg-navy/5'
              }`}
            >
              {isBn ? 'সব প্রতিষ্ঠান' : 'All Services'}
            </button>

            {legalServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setCategory(service.category)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  category === service.category
                    ? 'bg-navy text-gold'
                    : 'bg-surface text-muted hover:bg-navy/5'
                }`}
              >
                {isBn ? service.bnCategory : service.category}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Verification notice */}
      <div className="flex gap-2 items-start rounded-xl bg-gold-soft/30 border border-gold/20 px-4 py-3">
        <Info size={16} className="text-gold-dark mt-0.5 shrink-0" />
        <p className={`text-xs text-navy leading-relaxed ${isBn ? 'bn' : ''}`}>
          {isBn
            ? 'যোগাযোগের তথ্য পরিবর্তিত হতে পারে। যোগাযোগের আগে সংশ্লিষ্ট প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইটে তথ্য যাচাই করুন। এই তালিকা আইনি পরামর্শের বিকল্প নয়।'
            : 'Contact details may change. Verify information through the organization’s official website before contacting them. This directory is not a substitute for legal advice.'}
        </p>
      </div>

      {/* Directory results */}
      {filteredServices.length === 0 ? (
        <EmptyState
          icon={<Search size={28} />}
          title={isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results found'}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Card key={service.id} hover>
              <CardBody>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                    <ShieldCheck size={19} />
                  </div>
                  <Badge variant="gold">
                    {isBn ? 'আইনগত সহায়তা' : 'Legal Aid'}
                  </Badge>
                </div>

                <h3 className={`text-sm font-semibold text-navy leading-snug ${isBn ? 'bn' : ''}`}>
                  {isBn ? service.bnName : service.name}
                </h3>

                <p className={`text-xs text-muted mt-2 leading-relaxed ${isBn ? 'bn' : ''}`}>
                  {isBn ? service.bnDescription : service.description}
                </p>

                <div className="mt-4 space-y-2 border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <MapPin size={14} className="shrink-0" />
                    {isBn ? service.bnLocation : service.location}
                  </div>

                  <a
                    href={`tel:${service.phone}`}
                    className="flex items-center gap-2 text-xs font-medium text-gold-dark hover:underline"
                  >
                    <Phone size={14} />
                    {service.phone}
                  </a>

                  {service.email && (
                    <a
                      href={`mailto:${service.email}`}
                      className="flex items-center gap-2 text-xs text-muted hover:text-gold-dark break-all"
                    >
                      <Mail size={14} />
                      {service.email}
                    </a>
                  )}

                  {service.hours && (
                    <p className="text-xs text-muted">
                      {isBn ? 'সময়: ' : 'Hours: '}
                      {service.hours}
                    </p>
                  )}
                </div>

                <a
                  href={service.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2.5 text-xs font-medium text-gold hover:bg-navy/90 transition"
                >
                  <Globe size={14} />
                  {isBn ? 'অফিসিয়াল ওয়েবসাইট' : 'Official Website'}
                  <ExternalLink size={13} />
                </a>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <div className="text-xs text-muted text-center">
        {isBn
          ? `মোট ${filteredServices.length}টি প্রতিষ্ঠানের তথ্য দেখানো হচ্ছে।`
          : `Showing ${filteredServices.length} of ${legalServices.length} organizations.`}
      </div>
    </div>
  );
}
