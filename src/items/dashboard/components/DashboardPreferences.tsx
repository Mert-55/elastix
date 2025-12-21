import { LanguageSelector } from '@/common/ui/LanguageSelector';
import { ThemeToggle } from '@/common/ui/ThemeToggle';

export default function DashboardPreferences() {
  return (
    <div className="flex inline-flex gap-4">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );
}
