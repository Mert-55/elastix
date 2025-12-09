import {
  AlertCircle,
  BadgeDollarSign,
  BarChart3,
  Bell,
  BookUser,
  Calendar,
  ChartNetwork,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  type LucideIcon,
  Mail,
  Menu,
  Minus,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Users,
  UserStar,
  Warehouse,
  X,
} from 'lucide-react';

import { Icons } from '../icons';

const { deFlag, gbFlag } = Icons;

export const iconMap = {
  home: Home,
  dashboard: LayoutDashboard,
  settings: Settings,
  users: Users,
  'customer-data': BookUser,
  'transaction-data': BadgeDollarSign,
  'stock-data': Warehouse,
  'customer-segmentation': UserStar,
  'elasticity-segmentation': ChartNetwork,
  dark: Moon,
  light: Sun,
  files: FileText,
  analytics: BarChart3,
  calendar: Calendar,
  mail: Mail,
  notifications: Bell,
  search: Search,
  menu: Menu,
  close: X,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  plus: Plus,
  minus: Minus,
  check: Check,
  alert: AlertCircle,
  info: Info,
  help: HelpCircle,
  deFlag,
  gbFlag,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
  active?: boolean;
}

export function Icon({
  name,
  className = '',
  size = 20,
  strokeWidth,
  active = false,
}: IconProps) {
  const IconComponent = iconMap[name] as LucideIcon;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  const activeStyles = active
    ? {
        strokeWidth: strokeWidth ?? 2.5,
        fill: 'currentColor',
        fillOpacity: 0.1,
      }
    : {
        strokeWidth: strokeWidth ?? 2,
      };

  return (
    <IconComponent
      size={size}
      className={className}
      {...activeStyles}
      aria-hidden="true"
    />
  );
}
