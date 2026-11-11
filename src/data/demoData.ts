export interface SuggestedQuestion {
  text: string;
  bn: boolean;
}

export const suggestedQuestions: SuggestedQuestion[] = [
  { text: 'What are my rights if someone does not return borrowed money?', bn: false },
  { text: 'What should I do if my landlord refuses to return my security deposit?', bn: false },
  { text: 'What are the legal requirements for marriage in Bangladesh?', bn: false },
  { text: 'What can I do if my employer does not pay my salary?', bn: false },
  { text: 'বাংলাদেশে জমি দখল হলে কী আইনি ব্যবস্থা নেওয়া যায়?', bn: true },
  { text: 'থানায় জিডি করার নিয়ম কী?', bn: true },
];

export const demoAdminStats = {
  totalUsers: 1284,
  totalQuestions: 8472,
  activeCases: 156,
  totalLaws: 12,
};

export const demoAdminUsers = [
  { id: 'u1', name: 'Rahim Uddin', email: 'rahim@example.com', role: 'user', status: 'active', joined: '2025-09-12' },
  { id: 'u2', name: 'Sadia Islam', email: 'sadia@example.com', role: 'user', status: 'active', joined: '2025-10-03' },
  { id: 'u3', name: 'Karim Hossain', email: 'karim@example.com', role: 'admin', status: 'active', joined: '2025-07-21' },
  { id: 'u4', name: 'Nusrat Jahan', email: 'nusrat@example.com', role: 'user', status: 'inactive', joined: '2025-10-28' },
  { id: 'u5', name: 'Arif Mahmud', email: 'arif@example.com', role: 'user', status: 'active', joined: '2025-11-01' },
];

export const demoRecentActivity = [
  { id: 'a1', user: 'Rahim Uddin', action: 'Asked a question', time: '2 hours ago' },
  { id: 'a2', user: 'Sadia Islam', action: 'Analyzed a case', time: '5 hours ago' },
  { id: 'a3', user: 'Nusrat Jahan', action: 'Generated a document', time: '1 day ago' },
  { id: 'a4', user: 'Arif Mahmud', action: 'Searched law library', time: '1 day ago' },
  { id: 'a5', user: 'Karim Hossain', action: 'Uploaded a document', time: '2 days ago' },
];

export const demoSystemStatus = [
  { service: 'Web Application', status: 'operational' },
  { service: 'AI Assistant (Demo)', status: 'operational' },
  { service: 'Law Library', status: 'operational' },
  { service: 'Document Tools', status: 'operational' },
  { service: 'User Authentication', status: 'operational' },
];

export const demoQuestionsByDay = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 58 },
  { day: 'Wed', value: 71 },
  { day: 'Thu', value: 64 },
  { day: 'Fri', value: 89 },
  { day: 'Sat', value: 53 },
  { day: 'Sun', value: 38 },
];
