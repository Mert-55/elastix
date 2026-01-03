import {
  AlertCircle,
  ArrowUpToLine,
  AudioWaveform,
  BadgeDollarSign,
  BadgePercent,
  BadgePoundSterling,
  BarChart3,
  Bell,
  BookUser,
  BowArrow,
  Boxes,
  Calendar,
  ChartNetwork,
  ChartPie,
  ChartSpline,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit,
  FileText,
  Heart,
  HeartOff,
  HeartPlus,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  LoaderCircle,
  type LucideIcon,
  Mail,
  Menu,
  Minus,
  Moon,
  MoreHorizontal,
  Percent,
  Pilcrow,
  Search,
  Settings,
  ShieldAlert,
  SquareArrowLeft,
  SquarePlus,
  Star,
  Sun,
  TriangleAlert,
  Users,
  UserStar,
  Warehouse,
  X,
} from 'lucide-react';

import { Icons } from '@/common/ui/icons';

const { deFlag, gbFlag } = Icons;

export const iconMap = {
  home: Home,
  heart: Heart,
  star: Star,
  'heart-plus': HeartPlus,
  'heart-off': HeartOff,
  'bow-arrow': BowArrow,
  'shield-alert': ShieldAlert,
  'chart-pie': ChartPie,
  'chart-spline': ChartSpline,
  'badge-pound-sterling': BadgePoundSterling,
  back: SquareArrowLeft,
  pilcrow: Pilcrow,
  'more-horizontal': MoreHorizontal,
  'show-less': ArrowUpToLine,
  boxes: Boxes,
  percent: Percent,
  'badge-percent': BadgePercent,
  moon: Moon,
  dashboard: LayoutDashboard,
  settings: Settings,
  users: Users,
  'customer-data': BookUser,
  'transaction-data': BadgeDollarSign,
  'stock-data': Warehouse,
  'customer-segmentation': UserStar,
  'revenue-segmentation': AudioWaveform,
  'elasticity-segmentation': ChartNetwork,
  dark: Moon,
  light: Sun,
  edit: Edit,
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
  plus: SquarePlus,
  minus: Minus,
  check: Check,
  alert: AlertCircle,
  info: Info,
  help: HelpCircle,
  'loader-circle': LoaderCircle,
  'triangle-alert': TriangleAlert,
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
