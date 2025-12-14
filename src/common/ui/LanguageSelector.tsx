import { useLocale } from '@/app/providers';
import { type Locale, supportedLocales } from '@/common/i18n';
import { Icon } from '@/common/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/ui/select';

const localeConfig: Record<
  Locale,
  { name: string; icon: 'deFlag' | 'gbFlag' }
> = {
  de: { name: 'Deutsch', icon: 'deFlag' },
  en: { name: 'English', icon: 'gbFlag' },
};

const LocaleOption = ({ locale }: { locale: Locale }) => (
  <div className="flex items-center gap-2">
    <div className="flex size-5 items-center justify-center rounded-full overflow-hidden bg-muted">
      <Icon name={localeConfig[locale].icon} className="shrink-0 size-7" />
    </div>
    <span>{localeConfig[locale].name}</span>
  </div>
);

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <Select
      value={locale}
      onValueChange={(value) => setLocale(value as Locale)}
    >
      <SelectTrigger className="w-[160px] overflow-hidden md:inline-flex hidden">
        <SelectValue>
          <LocaleOption locale={locale} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {supportedLocales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            <LocaleOption locale={loc} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
