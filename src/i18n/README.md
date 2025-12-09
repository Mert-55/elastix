# i18n Usage Example

## Verwendung in Komponenten

```tsx
import { useFormatText } from '@/hooks/useFormatText';

function MyComponent() {
  const label = useFormatText({
    id: 'rfm.dashboard.sidebar.segmentation.label',
  });

  return <h1>{label}</h1>;
}
```

## Mit Variablen

```tsx
const message = useFormatText({
  id: 'rfm.welcome.message',
  values: { name: 'Max' },
});
```

## Neue Übersetzungen hinzufügen

1. Füge den Key in `src/i18n/DE-de.json` hinzu
2. Füge die englische Übersetzung in `src/i18n/GB-en.json` hinzu
3. TypeScript prüft automatisch, ob der Key existiert

## Crowdin Integration

Die JSON-Dateien sind bereit für Crowdin:

- `DE-de.json` als Source-Datei
- `GB-en.json` wird automatisch übersetzt
- Weitere Sprachen können einfach hinzugefügt werden

## Sprache wechseln

Der `I18nProvider` in `main.tsx` verwaltet die aktuelle Sprache.
Standardsprache ist Deutsch (`de`).
