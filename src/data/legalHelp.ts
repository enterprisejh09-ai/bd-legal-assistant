export interface LegalHelpEntry {
  id: string;
  name: string;
  bnName: string;
  category: string;
  description: string;
  bnDescription: string;
  website: string;
  verified: boolean;
}

export const legalHelp: LegalHelpEntry[] = [
  {
    id: 'nlaso',
    name: 'National Legal Aid Services Organization (NLASO)',
    bnName: 'জাতীয় আইনি সহায়তা প্রদান সংস্থা',
    category: 'Legal Aid',
    description:
      'Provides free legal aid and assistance to poor and disadvantaged citizens of Bangladesh.',
    bnDescription:
      'বাংলাদেশের দরিদ্র এবং অসহায় নাগরিকদের বিনামূল্যে আইনি সহায়তা প্রদান করে।',
    website: 'https://nlaso.gov.bd/',
    verified: true,
  },
  {
    id: 'police',
    name: 'Bangladesh Police',
    bnName: 'বাংলাদেশ পুলিশ',
    category: 'Law Enforcement',
    description:
      'National police force. Call 999 for emergencies. File GDs and reports at local police stations.',
    bnDescription:
      'জাতীয় পুলিশ বাহিনী। জরুরি অবস্থার জন্য ৯৯৯ এ কল করুন। স্থানীয় থানায় জিডি এবং রিপোর্ট দাখিল করুন।',
    website: 'https://www.police.gov.bd/',
    verified: true,
  },
  {
    id: 'supreme-court',
    name: 'Supreme Court of Bangladesh',
    bnName: 'বাংলাদেশ সুপ্রিম কোর্ট',
    category: 'Judiciary',
    description:
      'The highest court of the land. Includes the Appellate Division and High Court Division.',
    bnDescription:
      'দেশের সর্বোচ্চ আদালত। আপিল বিভাগ এবং হাইকোর্ট বিভাগ অন্তর্ভুক্ত।',
    website: 'https://www.supremecourt.gov.bd/',
    verified: true,
  },
  {
    id: 'bar-council',
    name: 'Bangladesh Bar Council',
    bnName: 'বাংলাদেশ বার কাউন্সিল',
    category: 'Legal Profession',
    description:
      'The statutory body that regulates the legal profession and licenses advocates in Bangladesh.',
    bnDescription:
      'বাংলাদেশে আইন পেশা নিয়ন্ত্রণ এবং অ্যাডভোকেটদের লাইসেন্স প্রদানকারী সংবিধিবদ্ধ সংস্থা।',
    website: 'https://www.barcouncil.gov.bd/',
    verified: true,
  },
  {
    id: 'emergency-999',
    name: 'Emergency Service 999',
    bnName: 'জরুরি সেবা ৯৯৯',
    category: 'Emergency',
    description:
      'National emergency hotline for police, fire, and ambulance services. Free call from any number.',
    bnDescription:
      'পুলিশ, ফায়ার এবং অ্যাম্বুলেন্স পরিষেবার জন্য জাতীয় জরুরি হটলাইন। যেকোনো নম্বর থেকে বিনামূল্যে কল।',
    website: 'https://www.police.gov.bd/',
    verified: true,
  },
];
