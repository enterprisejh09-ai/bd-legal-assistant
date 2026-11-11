import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Scale,
  Library,
  FileSearch,
  FilePlus2,
  History,
  Phone,
  Settings as SettingsIcon,
  ChevronLeft,
  Scale as ScaleIcon,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import type { TranslationKey } from '@/data/translations';

const navItems: { to: string; labelKey: TranslationKey; icon: typeof LayoutDashboard }[] = [
  { to: '/', labelKey: 'dashboard', icon: LayoutDashboard },
  { to: '/ai-assistant', labelKey: 'aiAssistant', icon: Bot },
  { to: '/analyze-case', labelKey: 'analyzeCase', icon: Scale },
  { to: '/law-library', labelKey: 'lawLibrary', icon: Library },
  { to: '/document-analyzer', labelKey: 'docAnalyzer', icon: FileSearch },
  { to: '/document-generator', labelKey: 'docGenerator', icon: FilePlus2 },
  { to: '/case-history', labelKey: 'caseHistory', icon: History },
  { to: '/legal-help', labelKey: 'legalHelp', icon: Phone },
  { to: '/admin', labelKey: 'admin', icon: ShieldCheck },
  { to: '/settings', labelKey: 'settings', icon: SettingsIcon },
];

export function Sidebar() {
  const { t, isBn } = useLanguage();
  const { sidebarCollapsed, toggleSidebar } = useApp();

  return (
    <aside
      className={`hidden lg:flex flex-col bg-navy text-white transition-all duration-300 shrink-0 ${
        sidebarCollapsed ? 'w-[68px]' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-white/10 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-navy shrink-0">
          <ScaleIcon size={20} />
        </div>
        {!sidebarCollapsed && (
          <div className="overflow-hidden">
            <p className={`font-semibold text-sm leading-tight ${isBn ? 'bn' : ''}`}>{t('appName')}</p>
            <p className="text-[10px] text-gold leading-tight">Legal Assistant</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm mb-0.5 transition-all ${
                  isActive
                    ? 'bg-white/10 text-gold font-medium'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`
              }
              title={t(item.labelKey)}
            >
              <Icon size={18} className="shrink-0" />
              {!sidebarCollapsed && <span className={isBn ? 'bn' : ''}>{t(item.labelKey)}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center gap-2 h-12 border-t border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition text-xs"
      >
        <ChevronLeft size={16} className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        {!sidebarCollapsed && <span>Collapse</span>}
      </button>
    </aside>
  );
}
