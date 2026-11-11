export interface DocTemplate {
  id: string;
  labelKey: string;
  icon: string;
  fields: { key: string; labelKey: string; placeholder: string }[];
  body: (v: Record<string, string>) => string;
}

const header = (sender: string, date: string, subject: string) =>
  `${sender || '[Sender Name]'}\n${date || '[Date]'}\n\nSubject: ${subject}\n\n`;

export const docTemplates: DocTemplate[] = [
  {
    id: 'legal-notice',
    labelKey: 'tplLegalNotice',
    icon: 'ScrollText',
    fields: [
      { key: 'sender', labelKey: 'fullName', placeholder: 'Your name' },
      { key: 'recipient', labelKey: 'fullName', placeholder: 'Recipient name' },
      { key: 'subject', labelKey: 'caseTitle', placeholder: 'Subject of notice' },
      { key: 'details', labelKey: 'description', placeholder: 'Describe the issue and demand' },
    ],
    body: (v) =>
      header(v.sender || '', v.date || '', `Legal Notice — ${v.subject || ''}`) +
      `To: ${v.recipient || '[Recipient Name]'}\n\n` +
      `Take notice that I, ${v.sender || '[Sender Name]'}, hereby issue this legal notice regarding the following matter:\n\n` +
      `${v.details || '[Describe the issue and the relief demanded]'}\n\n` +
      `You are hereby requested to comply within 15 (fifteen) days of receipt of this notice. ` +
      `Failure to do so shall compel me to initiate appropriate legal proceedings against you, ` +
      `at your own risk and cost.\n\n` +
      `Sincerely,\n${v.sender || '[Sender Name]'}`,
  },
  {
    id: 'general-application',
    labelKey: 'tplGeneralApplication',
    icon: 'FileText',
    fields: [
      { key: 'sender', labelKey: 'fullName', placeholder: 'Applicant name' },
      { key: 'recipient', labelKey: 'fullName', placeholder: 'Authority name' },
      { key: 'subject', labelKey: 'caseTitle', placeholder: 'Subject of application' },
      { key: 'details', labelKey: 'description', placeholder: 'Application details' },
    ],
    body: (v) =>
      header(v.sender || '', v.date || '', `Application — ${v.subject || ''}`) +
      `To\nThe ${v.recipient || '[Authority Name]'}\n\n` +
      `With due respect, I, ${v.sender || '[Applicant Name]'}, would like to submit the following application:\n\n` +
      `${v.details || '[Application details]'}\n\n` +
      `I therefore pray that you would be kind enough to take necessary action in this regard.\n\n` +
      `Sincerely,\n${v.sender || '[Applicant Name]'}`,
  },
  {
    id: 'complaint-letter',
    labelKey: 'tplComplaintLetter',
    icon: 'MessageSquareWarning',
    fields: [
      { key: 'sender', labelKey: 'fullName', placeholder: 'Complainant name' },
      { key: 'recipient', labelKey: 'fullName', placeholder: 'Authority name' },
      { key: 'subject', labelKey: 'caseTitle', placeholder: 'Complaint subject' },
      { key: 'details', labelKey: 'description', placeholder: 'Complaint details' },
    ],
    body: (v) =>
      header(v.sender || '', v.date || '', `Complaint — ${v.subject || ''}`) +
      `To\nThe ${v.recipient || '[Authority Name]'}\n\n` +
      `I, ${v.sender || '[Complainant Name]'}, would like to lodge the following complaint:\n\n` +
      `${v.details || '[Complaint details]'}\n\n` +
      `I request you to investigate the matter and take appropriate action as per law.\n\n` +
      `Sincerely,\n${v.sender || '[Complainant Name]'}`,
  },
  {
    id: 'rental-agreement',
    labelKey: 'tplRentalAgreement',
    icon: 'Home',
    fields: [
      { key: 'landlord', labelKey: 'fullName', placeholder: 'Landlord name' },
      { key: 'tenant', labelKey: 'fullName', placeholder: 'Tenant name' },
      { key: 'address', labelKey: 'location', placeholder: 'Property address' },
      { key: 'rent', labelKey: 'caseTitle', placeholder: 'Monthly rent amount (BDT)' },
    ],
    body: (v) =>
      `RENTAL AGREEMENT (DRAFT)\nDate: ${v.date || '[Date]'}\n\n` +
      `This Rental Agreement is made between ${v.landlord || '[Landlord Name]'} (hereinafter "Landlord") ` +
      `and ${v.tenant || '[Tenant Name]'} (hereinafter "Tenant").\n\n` +
      `1. PROPERTY: The Landlord agrees to rent the property located at ${v.address || '[Property Address]'}.\n\n` +
      `2. RENT: The monthly rent shall be BDT ${v.rent || '[Amount]'}, payable in advance by the 5th of each month.\n\n` +
      `3. TERM: The tenancy shall be for a period of 11 (eleven) months, renewable by mutual consent.\n\n` +
      `4. UTILITIES: Electricity, water, and gas bills shall be borne by the Tenant.\n\n` +
      `5. TERMINATION: Either party may terminate this agreement with 1 (one) month's notice.\n\n` +
      `Landlord: ____________________\nTenant: ____________________`,
  },
  {
    id: 'loan-agreement',
    labelKey: 'tplLoanAgreement',
    icon: 'Banknote',
    fields: [
      { key: 'lender', labelKey: 'fullName', placeholder: 'Lender name' },
      { key: 'borrower', labelKey: 'fullName', placeholder: 'Borrower name' },
      { key: 'amount', labelKey: 'caseTitle', placeholder: 'Loan amount (BDT)' },
      { key: 'details', labelKey: 'description', placeholder: 'Repayment terms' },
    ],
    body: (v) =>
      `LOAN AGREEMENT (DRAFT)\nDate: ${v.date || '[Date]'}\n\n` +
      `This Loan Agreement is made between ${v.lender || '[Lender Name]'} (hereinafter "Lender") ` +
      `and ${v.borrower || '[Borrower Name]'} (hereinafter "Borrower").\n\n` +
      `1. LOAN AMOUNT: The Lender agrees to lend BDT ${v.amount || '[Amount]'} to the Borrower.\n\n` +
      `2. REPAYMENT: ${v.details || '[Repayment terms]'}\n\n` +
      `3. INTEREST: As mutually agreed between the parties and permissible under law.\n\n` +
      `4. DEFAULT: In case of default, the Lender reserves the right to take legal action.\n\n` +
      `Lender: ____________________\nBorrower: ____________________`,
  },
  {
    id: 'affidavit',
    labelKey: 'tplAffidavit',
    icon: 'FileSignature',
    fields: [
      { key: 'deponent', labelKey: 'fullName', placeholder: 'Deponent name' },
      { key: 'address', labelKey: 'location', placeholder: 'Deponent address' },
      { key: 'subject', labelKey: 'caseTitle', placeholder: 'Affidavit subject' },
      { key: 'details', labelKey: 'description', placeholder: 'Declaration details' },
    ],
    body: (v) =>
      `AFFIDAVIT (DRAFT)\n\n` +
      `I, ${v.deponent || '[Deponent Name]'}, son/daughter of ____________, residing at ${v.address || '[Address]'}, ` +
      `do hereby solemnly affirm and declare as follows:\n\n` +
      `1. ${v.details || '[Declaration details]'}\n\n` +
      `2. The statements made above are true and correct to the best of my knowledge and belief.\n\n` +
      `Signed and affirmed by the deponent on this ${v.date || '[Date]'}.\n\n` +
      `Deponent: ____________________\n\n` +
      `Before me:\nCommissioner of Affidavits: ____________________`,
  },
  {
    id: 'general-letter',
    labelKey: 'tplGeneralLetter',
    icon: 'Mail',
    fields: [
      { key: 'sender', labelKey: 'fullName', placeholder: 'Your name' },
      { key: 'recipient', labelKey: 'fullName', placeholder: 'Recipient name' },
      { key: 'subject', labelKey: 'caseTitle', placeholder: 'Letter subject' },
      { key: 'details', labelKey: 'description', placeholder: 'Letter body' },
    ],
    body: (v) =>
      header(v.sender || '', v.date || '', v.subject || '') +
      `Dear ${v.recipient || '[Recipient Name]'},\n\n` +
      `${v.details || '[Letter body]'}\n\n` +
      `Sincerely,\n${v.sender || '[Sender Name]'}`,
  },
];
