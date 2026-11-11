import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar, MobileNav } from './TopBar';
import { Disclaimer } from '@/components/ui/Disclaimer';

export function Layout() {
  return (
    <div className="app-shell flex overflow-hidden bg-surface">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />
        <div className="app-scroll min-h-0 flex-1 overflow-y-auto scrollbar-thin">
          <main className="mx-auto w-full max-w-6xl px-4 lg:px-8 py-6">
            <div className="mb-5">
              <Disclaimer variant="banner" />
            </div>
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
