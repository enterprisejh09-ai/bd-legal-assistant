export interface Law {
  id: string;
  name: string;
  bnName: string;
  category: string;
  year: number;
  description: string;
  bnDescription: string;
  sourceUrl: string;
  popular?: boolean;
}

export const lawCategories = [
  'catConstitution',
  'catCriminal',
  'catCivil',
  'catFamily',
  'catLand',
  'catCyber',
  'catLabour',
  'catConsumer',
  'catContract',
  'catBusiness',
] as const;

export const laws: Law[] = [
  {
    id: 'constitution',
    name: 'Constitution of the People\u2019s Republic of Bangladesh',
    bnName: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
    category: 'catConstitution',
    year: 1972,
    description:
      'The supreme law of Bangladesh, establishing the framework of government and fundamental rights of citizens.',
    bnDescription:
      'বাংলাদেশের সর্বোচ্চ আইন, যা সরকারের কাঠামো এবং নাগরিকদের মৌলিক অধিকার প্রতিষ্ঠা করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
    popular: true,
  },
  {
    id: 'penal-code',
    name: 'Penal Code, 1860',
    bnName: 'দণ্ডবিধি, ১৮৬০',
    category: 'catCriminal',
    year: 1860,
    description:
      'Defines criminal offenses and their punishments in Bangladesh, covering offenses against the body, property, and public order.',
    bnDescription:
      'বাংলাদেশে ফৌজদারি অপরাধ এবং তাদের শাস্তি নির্ধারণ করে, যা শরীর, সম্পত্তি এবং জনশৃঙ্খলার বিরুদ্ধে অপরাধ কভার করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
    popular: true,
  },
  {
    id: 'crpc',
    name: 'Code of Criminal Procedure, 1898',
    bnName: 'ফৌজদারি কার্যবিধি, ১৮৯৮',
    category: 'catCriminal',
    year: 1898,
    description:
      'Governs the procedure for criminal trials, including investigation, arrest, bail, trial, and appeals.',
    bnDescription:
      'ফৌজদারি বিচারের পদ্ধতি নিয়ন্ত্রণ করে, যার মধ্যে তদন্ত, গ্রেপ্তার, জামিন, বিচার এবং আপিল অন্তর্ভুক্ত।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
  {
    id: 'cpc',
    name: 'Code of Civil Procedure, 1908',
    bnName: 'দেওয়ানি কার্যবিধি, ১৯০৮',
    category: 'catCivil',
    year: 1908,
    description:
      'Sets out the procedure for civil lawsuits, including filing, hearings, evidence, decrees, and execution.',
    bnDescription:
      'দেওয়ানি মামলার পদ্ধতি নির্ধারণ করে, যার মধ্যে দায়ের, শুনানি, প্রমাণ, ডিক্রি এবং বাস্তবায়ন অন্তর্ভুক্ত।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
  {
    id: 'evidence-act',
    name: 'Evidence Act, 1872',
    bnName: 'প্রমাণ আইন, ১৮৭২',
    category: 'catCivil',
    year: 1872,
    description:
      'Governs the admissibility and evaluation of evidence in courts of law in Bangladesh.',
    bnDescription: 'বাংলাদেশের আদালতে প্রমাণের গ্রহণযোগ্যতা এবং মূল্যায়ন নিয়ন্ত্রণ করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
  {
    id: 'contract-act',
    name: 'Contract Act, 1872',
    bnName: 'চুক্তি আইন, ১৮৭২',
    category: 'catContract',
    year: 1872,
    description:
      'Defines the formation, performance, and enforcement of contracts, and remedies for breach of contract.',
    bnDescription:
      'চুক্তির গঠন, পালন এবং প্রয়োগ এবং চুক্তি লঙ্ঘনের প্রতিকার নির্ধারণ করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
    popular: true,
  },
  {
    id: 'property-act',
    name: 'Transfer of Property Act, 1882',
    bnName: 'সম্পত্তি হস্তান্তর আইন, ১৮৮২',
    category: 'catLand',
    year: 1882,
    description:
      'Governs the transfer of property by sale, mortgage, lease, gift, and exchange in Bangladesh.',
    bnDescription:
      'বাংলাদেশে বিক্রয়, বন্ধক, লিজ, উপহার এবং বিনিময়ের মাধ্যমে সম্পত্তি হস্তান্তর নিয়ন্ত্রণ করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
  {
    id: 'labour-act',
    name: 'Labour Act, 2006',
    bnName: 'শ্রম আইন, ২০০৬',
    category: 'catLabour',
    year: 2006,
    description:
      'Consolidates labor laws covering employment conditions, wages, working hours, leave, and worker welfare.',
    bnDescription:
      'কর্মসংস্থানের শর্ত, মজুরি, কর্মঘণ্টা, ছুটি এবং শ্রমিক কল্যাণ সম্পর্কিত শ্রম আইন একত্রিত করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
    popular: true,
  },
  {
    id: 'consumer-rights',
    name: 'Consumer Rights Protection Act, 2009',
    bnName: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯',
    category: 'catConsumer',
    year: 2009,
    description:
      'Protects consumers from unfair trade practices, adulterated goods, and misleading advertisements.',
    bnDescription:
      'অন্যায্য বাণিজ্য অনুশীলন, ভেজাল পণ্য এবং বিভ্রান্তিকর বিজ্ঞাপন থেকে ভোক্তাদের রক্ষা করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
    popular: true,
  },
  {
    id: 'cyber-security',
    name: 'Digital Security Act, 2018',
    bnName: 'ডিজিটাল নিরাপত্তা আইন, ২০১৮',
    category: 'catCyber',
    year: 2018,
    description:
      'Addresses cybercrimes, digital security, and offenses committed through electronic communication platforms.',
    bnDescription:
      'সাইবার অপরাধ, ডিজিটাল নিরাপত্তা এবং ইলেকট্রনিক যোগাযোগ মাধ্যমের মাধ্যমে সংঘটিত অপরাধ মোকাবেলা করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
  {
    id: 'muslim-family-law',
    name: 'Muslim Family Law Ordinance, 1961',
    bnName: 'মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১',
    category: 'catFamily',
    year: 1961,
    description:
      'Governs marriage, divorce, dower, and maintenance matters for Muslims in Bangladesh.',
    bnDescription: 'বাংলাদেশে মুসলমানদের বিবাহ, তালাক, দেনমোহর এবং ভরণপোষণ বিষয় নিয়ন্ত্রণ করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
  {
    id: 'companies-act',
    name: 'Companies Act, 1994',
    bnName: 'কোম্পানি আইন, ১৯৯৪',
    category: 'catBusiness',
    year: 1994,
    description:
      'Regulates the formation, management, and dissolution of companies in Bangladesh.',
    bnDescription: 'বাংলাদেশে কোম্পানি গঠন, ব্যবস্থাপনা এবং বিলুপ্তি নিয়ন্ত্রণ করে।',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/',
  },
];
