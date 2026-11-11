import { useRef, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Globe, ChevronDown, User, Settings as SettingsIcon, LogOut, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { laws } from '@/data/laws';

export function TopBar() {
  const { t, lang, toggle, isBn } = useLanguage();
  const { setMobileNavOpen } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof laws>([]);
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = laws
      .filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.bnName.includes(searchQuery) ||
          l.description.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      )
      .slice(0, 5);
    setSearchResults(results);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/law-library?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-navy/5 flex items-center gap-3 px-4 lg:px-6">
      {/* Mobile menu */}
      <button
        onClick={() => setMobileNavOpen(true)}
        className="lg:hidden btn-ghost p-2"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`input pl-9 pr-3 py-2 text-sm ${isBn ? 'bn' : ''}`}
            />
          </div>
        </form>
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 card overflow-hidden shadow-cardHover z-40">
            {searchResults.map((l) => (
              <Link
                key={l.id}
                to={`/law-library?q=${encodeURIComponent(l.name)}`}
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition text-sm border-b border-navy/5 last:border-0"
              >
                <div>
                  <p className="font-medium text-navy">{isBn ? l.bnName : l.name}</p>
                  <p className="text-xs text-muted">{isBn ? l.bnDescription : l.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Language toggle */}
        <button
          onClick={toggle}
          className="btn-ghost gap-1.5 px-3 py-2 text-sm font-medium"
          aria-label="Toggle language"
        >
          <Globe size={16} />
          <span>{lang === 'en' ? 'EN' : 'বাংলা'}</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="btn-ghost p-2 relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 w-72 card shadow-cardHover overflow-hidden animate-fadeIn">
              <div className="px-4 py-3 border-b border-navy/5">
                <p className="font-semibold text-sm text-navy">Notifications</p>
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-thin">
                {[
                  { title: 'New law added', desc: 'Digital Security Act updated', time: '1h ago' },
                  { title: 'Case saved', desc: 'Your case analysis was saved', time: '3h ago' },
                  { title: 'Welcome', desc: 'Thanks for joining BD Legal Assistant', time: '1d ago' },
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-surface border-b border-navy/5 last:border-0">
                    <p className="text-sm font-medium text-navy">{n.title}</p>
                    <p className="text-xs text-muted">{n.desc}</p>
                    <p className="text-[10px] text-muted/70 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-surface transition"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-gold text-xs font-semibold">
              RU
            </div>
            <ChevronDown size={14} className="text-muted hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-56 card shadow-cardHover overflow-hidden animate-fadeIn">
              <div className="px-4 py-3 border-b border-navy/5">
                <p className="font-medium text-sm text-navy">Rahim User</p>
                <p className="text-xs text-muted">rahim@example.com</p>
              </div>
              <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-surface transition">
                <User size={15} className="text-muted" /> Profile
              </Link>
              <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-surface transition">
                <SettingsIcon size={15} className="text-muted" /> {t('settings')}
              </Link>
              <button className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-surface transition text-red-600 w-full border-t border-navy/5">
                <LogOut size={15} /> {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const { t, isBn } = useLanguage();
  const { mobileNavOpen, setMobileNavOpen } = useApp();

  if (!mobileNavOpen) return null;

  const items = [
    { to: '/', label: t('dashboard') },
    { to: '/ai-assistant', label: t('aiAssistant') },
    { to: '/analyze-case', label: t('analyzeCase') },
    { to: '/law-library', label: t('lawLibrary') },
    { to: '/document-analyzer', label: t('docAnalyzer') },
    { to: '/document-generator', label: t('docGenerator') },
    { to: '/case-history', label: t('caseHistory') },
    { to: '/legal-help', label: t('legalHelp') },
    { to: '/admin', label: t('admin') },
    { to: '/settings', label: t('settings') },
  ];

  return (
    <div className="lg:hidden fixed inset-0 z-50 animate-fadeIn">
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-navy text-white flex flex-col animate-slideIn">
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <span className="font-semibold text-gold">BD Legal Assistant</span>
          <button onClick={() => setMobileNavOpen(false)} className="p-1.5 text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm mb-1 ${isActive ? 'bg-white/10 text-gold font-medium' : 'text-white/70 hover:bg-white/5'} ${isBn ? 'bn' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
