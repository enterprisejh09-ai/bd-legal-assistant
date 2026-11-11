export const caseCategories = [
  'catCriminal',
  'catCivil',
  'catFamily',
  'catLand',
  'catCyber',
  'catLabour',
  'catConsumer',
  'catBusiness',
] as const;

export const categoryIcons: Record<string, string> = {
  catConstitution: 'Landmark',
  catCriminal: 'Gavel',
  catCivil: 'Scale',
  catFamily: 'Users',
  catLand: 'Map',
  catCyber: 'ShieldCheck',
  catLabour: 'Briefcase',
  catConsumer: 'ShoppingCart',
  catContract: 'FileText',
  catBusiness: 'Building2',
};

export interface CaseAnalysisResult {
  summary: string;
  issues: string[];
  topics: string[];
  steps: string[];
  cautions: string[];
  whenToLawyer: string[];
}

export function generateCaseAnalysis(input: {
  title: string;
  category: string;
  description: string;
  location: string;
}): CaseAnalysisResult {
  const catLabel = input.category || 'your legal area';
  return {
    summary: `Based on the information provided, this case appears to fall under ${catLabel}. The situation involves an incident described as: "${input.description.slice(0, 160)}${input.description.length > 160 ? '...' : ''}"${input.location ? ` occurring at ${input.location}` : ''}. This is a preliminary demo assessment and should not be treated as legal advice.`,
    issues: [
      'Determining the applicable law and jurisdiction for your situation.',
      'Assessing whether formal legal action is warranted or alternative dispute resolution may apply.',
      'Identifying the correct party or parties to take action against.',
      'Evaluating the strength of available evidence and documentation.',
    ],
    topics: [
      'Filing procedures and required documentation',
      'Statute of limitations considerations',
      'Evidence collection and preservation',
      'Potential costs and timelines',
    ],
    steps: [
      'Gather and organize all relevant documents, photos, and records.',
      'Write down a detailed timeline of events while memory is fresh.',
      'Identify and contact potential witnesses who can support your account.',
      'Consider sending a formal notice to the opposing party.',
      'Consult a qualified lawyer to evaluate your specific situation.',
    ],
    cautions: [
      'This demo analysis is for educational purposes and does not constitute legal advice.',
      'Time limits (statutes of limitation) may apply — delaying could weaken your position.',
      'Do not destroy or alter any documents or evidence related to the case.',
      'Avoid discussing details of the case publicly or on social media.',
      'Do not attempt to resolve the matter through intimidation or threats.',
    ],
    whenToLawyer: [
      'If you face criminal charges or potential imprisonment.',
      'If significant financial interests or property are at stake.',
      'If the opposing party is represented by legal counsel.',
      'If you receive any formal legal notice or court summons.',
      'If you are unsure which law applies to your situation.',
    ],
  };
}

export function generateDemoResponse(question: string): string {
  const q = question.toLowerCase();
  const isBn = /[\u0980-\u09FF]/.test(question);

  if (isBn) {
    if (q.includes('জমি') || q.includes('দখল')) {
      return `জমি দখল একটি গুরুতর আইনি সমস্যা। নিম্নলিখিত পদক্ষেপগুলো বিবেচনা করা যেতে পারে:\n\n১. স্থানীয় থানায় জিডি বা এজাহার দাখিল করুন।\n২. ভূমি রেকর্ড এবং দলিল সংগ্রহ করুন।\n৩. একজন ভূমি আইনজীবীর সাথে পরামর্শ করুন।\n৪. প্রযোজ্য ক্ষেত্রে দেওয়ানি আদালতে মামলা দায়ের করুন।\n\n⚠️ এটি একটি ডেমো উত্তর। প্রকৃত আইনি পদক্ষেপের জন্য একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন এবং বর্তমান আইনি বিধান যাচাই করুন।`;
    }
    if (q.includes('জিডি') || q.includes('থানা')) {
      return `থানায় জিডি (সাধারণ ডায়েরি) করার নিয়ম:\n\n১. সংশ্লিষ্ট থানায় গিয়ে জিডি ফরম পূরণ করুন।\n২. ঘটনার বিস্তারিত বিবরণ লিখুন।\n৩. প্রয়োজনীয় তথ্য ও পরিচয়পত্র সাথে রাখুন।\n৪. জিডির একটি কপি সংরক্ষণ করুন।\n\n⚠️ এটি একটি ডেমো উত্তর। বিস্তারিত জানতে স্থানীয় থানার সাথে যোগাযোগ করুন।`;
    }
    return `আপনার প্রশ্নটি সম্পর্কে ধন্যবাদ। এই প্রোটোটাইপে একটি ডেমো উত্তর ব্যবস্থা রয়েছে। প্রকৃত আইনি পরামর্শের জন্য একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।\n\n⚠️ এটি একটি ডেমো উত্তর — কোনো আসল এআই মডেল সংযুক্ত নেই।`;
  }

  if (q.includes('money') || q.includes('borrow') || q.includes('loan')) {
    return `If someone has not returned borrowed money, you may consider these steps:\n\n1. Send a formal legal notice demanding repayment within a specified period (often 15 days).\n2. Gather evidence: written agreements, messages, bank transfers, witnesses.\n3. If unpaid, you may file a civil suit for recovery of money under the Code of Civil Procedure, 1908.\n4. For smaller amounts, consider the small-cause procedure or alternative dispute resolution.\n\n⚠️ This is a demo response. Verify current legal provisions and consult a qualified lawyer for your specific situation.`;
  }
  if (q.includes('landlord') || q.includes('deposit') || q.includes('rent')) {
    return `If your landlord refuses to return your security deposit:\n\n1. Send a written demand notice requesting return of the deposit within a set period.\n2. Keep records of the tenancy agreement, payment receipts, and correspondence.\n3. If unresolved, you may file a civil suit for recovery under the Contract Act, 1872 and relevant tenancy law.\n4. Consider mediation through local dispute resolution channels first.\n\n⚠️ This is a demo response. Consult a qualified lawyer for advice specific to your situation.`;
  }
  if (q.includes('marriage')) {
    return `Legal requirements for marriage in Bangladesh generally include:\n\n1. For Muslim marriages: registration with a Kazi under the Muslim Family Law Ordinance, 1961.\n2. Both parties must meet the legal age of marriage and give free consent.\n3. A marriage registration certificate (Kabinnama) is issued.\n4. For other communities, respective personal laws and the Special Marriage Act may apply.\n\n⚠️ This is a demo response. Verify current requirements with the relevant marriage registrar or a qualified lawyer.`;
  }
  if (q.includes('salary') || q.includes('employer') || q.includes('wage') || q.includes('pay')) {
    return `If your employer does not pay your salary:\n\n1. Send a written demand to the employer requesting payment within a set period.\n2. Keep pay records, employment contract, and communication as evidence.\n3. You may file a complaint with the Labour Court under the Labour Act, 2006.\n4. The Labour Inspectorate can also be approached for resolution.\n\n⚠️ This is a demo response. Consult a qualified labour lawyer for your specific situation.`;
  }

  return `Thank you for your question. This prototype uses a clearly labeled demo response system — no real AI model is connected.\n\nFor legal matters, I recommend:\n1. Consulting a qualified lawyer in Bangladesh.\n2. Verifying current legal provisions through official sources such as https://bdlaws.minlaw.gov.bd/\n3. Visiting the Legal Help Directory for verified assistance resources.\n\n⚠️ This is a demo response and should not be relied upon for actual legal decisions.`;
}
