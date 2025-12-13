import deMessages from './DE-de.json';
import enMessages from './GB-en.json';

export type MessageId = keyof typeof deMessages;

export const messages = {
  de: deMessages,
  en: enMessages,
};

export const defaultLocale = 'de';
export const supportedLocales = ['de', 'en'] as const;
export type Locale = (typeof supportedLocales)[number];
