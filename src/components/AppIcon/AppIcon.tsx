/**
 * AppIcon Component
 * Unified Phosphor Icons wrapper & semantic mapper.
 * Maps CMS/static icon identifiers (including legacy Lucide names and emoji strings)
 * to cohesive @phosphor-icons/react icons with consistent sizing and stroke/duotone weights.
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bank,
  BookOpen,
  Briefcase,
  Buildings,
  Calculator,
  CalendarBlank,
  CalendarCheck,
  CaretDown,
  CaretRight,
  ChartBar,
  ChartLineUp,
  ChartPieSlice,
  Check,
  CheckCircle,
  Circle,
  ClipboardText,
  Clock,
  Compass,
  CurrencyCircleDollar,
  Database,
  EnvelopeSimple,
  FacebookLogo,
  FileText,
  FolderOpen,
  Funnel,
  GearSix,
  GitMerge,
  GlobeHemisphereEast,
  GraduationCap,
  Handshake,
  HardHat,
  Headset,
  Heart,
  Heartbeat,
  House,
  HouseLine,
  IdentificationBadge,
  InstagramLogo,
  Key,
  LinkedinLogo,
  List,
  LockKey,
  MagnifyingGlass,
  MapPin,
  Medal,
  Minus,
  Newspaper,
  Phone,
  PiggyBank,
  Plus,
  PresentationChart,
  Question,
  Scales,
  ShieldCheck,
  ShieldWarning,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  Star,
  TiktokLogo,
  TrendUp,
  Umbrella,
  Users,
  UsersThree,
  Vault,
  Wallet,
  WarningCircle,
  Wrench,
  X,
  XLogo,
  YoutubeLogo,
  ArrowsClockwise,
  type IconProps as PhosphorIconProps,
} from '@phosphor-icons/react';
import { cn } from '@/utils/cn';

export type AppIconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface AppIconProps {
  /** Semantic icon name from CMS/data or direct identifier */
  name: string;
  /** Pixel size of the icon (default: 20) */
  size?: number;
  /** Phosphor icon weight (default: 'duotone' for editorial depth, or 'regular' for UI controls) */
  weight?: AppIconWeight;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

type PhosphorComponent = React.ComponentType<PhosphorIconProps>;

/**
 * Comprehensive mapping from CMS/static icon strings, legacy Lucide names,
 * and legacy emoji characters to curated Phosphor Icon components.
 */
const ICON_MAP: Record<string, PhosphorComponent> = {
  // Real Estate, Property & Architecture
  Home: HouseLine,
  House: House,
  HouseLine: HouseLine,
  HousePlus: HouseLine,
  Building: Buildings,
  Building2: Buildings,
  Buildings: Buildings,
  Key: Key,
  KeyRound: Key,
  Wrench: Wrench,
  HardHat: HardHat,
  Compass: Compass,
  MapPin: MapPin,

  // Finance, Banking, Cooperatives & Advisory
  TrendingUp: TrendUp,
  TrendUp: TrendUp,
  ChartNoAxesCombined: ChartLineUp,
  ChartLineUp: ChartLineUp,
  ChartBar: ChartBar,
  PieChart: ChartPieSlice,
  PresentationChart: PresentationChart,
  PiggyBank: PiggyBank,
  Vault: Vault,
  Landmark: Bank,
  Bank: Bank,
  Wallet: Wallet,
  WalletCards: Wallet,
  Calculator: Calculator,
  CurrencyCircleDollar: CurrencyCircleDollar,
  Scales: Scales,
  Scale: Scales,
  Umbrella: Umbrella,

  // Governance, Compliance, Audit & Documents
  ShieldCheck: ShieldCheck,
  ShieldAlert: ShieldWarning,
  ShieldWarning: ShieldWarning,
  Lock: LockKey,
  LockKey: LockKey,
  ClipboardList: ClipboardText,
  ClipboardCheck: ClipboardText,
  ClipboardText: ClipboardText,
  FileText: FileText,
  Folder: FolderOpen,
  FolderOpen: FolderOpen,
  Database: Database,
  LayoutDashboard: SquaresFour,
  SquaresFour: SquaresFour,

  // People, Clients, Organizations & Care
  Users: Users,
  UsersRound: UsersThree,
  UsersThree: UsersThree,
  Briefcase: Briefcase,
  Handshake: Handshake,
  Heart: Heart,
  HeartPulse: Heartbeat,
  Heartbeat: Heartbeat,
  Award: Medal,
  Medal: Medal,
  GraduationCap: GraduationCap,
  IdentificationBadge: IdentificationBadge,
  HeadphonesIcon: Headset,
  Headset: Headset,

  // Operations, Systems & General
  Settings: GearSix,
  GearSix: GearSix,
  SlidersHorizontal: SlidersHorizontal,
  Globe: GlobeHemisphereEast,
  GlobeHemisphereEast: GlobeHemisphereEast,
  RefreshCw: ArrowsClockwise,
  ArrowsClockwise: ArrowsClockwise,
  Calendar: CalendarBlank,
  CalendarClock: CalendarCheck,
  CalendarCheck: CalendarCheck,
  Clock: Clock,
  BookOpen: BookOpen,
  Newspaper: Newspaper,
  GitMerge: GitMerge,
  Sparkle: Sparkle,
  Star: Star,
  HelpCircle: Question,
  Question: Question,
  Circle: Circle,

  // UI & Status Controls
  Check: Check,
  CheckCircle: CheckCircle,
  AlertCircle: WarningCircle,
  WarningCircle: WarningCircle,
  ArrowRight: ArrowRight,
  ArrowLeft: ArrowLeft,
  ArrowUpRight: ArrowUpRight,
  ChevronDown: CaretDown,
  CaretDown: CaretDown,
  ChevronRight: CaretRight,
  CaretRight: CaretRight,
  Menu: List,
  List: List,
  X: X,
  Plus: Plus,
  Minus: Minus,
  Search: MagnifyingGlass,
  MagnifyingGlass: MagnifyingGlass,
  Funnel: Funnel,
  Phone: Phone,
  Mail: EnvelopeSimple,
  EnvelopeSimple: EnvelopeSimple,

  // Brand / Social Logos
  Facebook: FacebookLogo,
  FacebookLogo: FacebookLogo,
  Linkedin: LinkedinLogo,
  LinkedinLogo: LinkedinLogo,
  Instagram: InstagramLogo,
  InstagramLogo: InstagramLogo,
  TikTok: TiktokLogo,
  TiktokLogo: TiktokLogo,
  Youtube: YoutubeLogo,
  YoutubeLogo: YoutubeLogo,
  Twitter: XLogo,
  XLogo: XLogo,

  // Legacy Emoji Fallbacks (in case Strapi CMS returns emoji characters)
  '🏠': HouseLine,
  '🔗': GitMerge,
  '🛡️': ShieldCheck,
  '📋': ClipboardText,
  '🗄️': Database,
  '🤝': Handshake,
};

export function AppIcon({
  name,
  size = 20,
  weight = 'duotone',
  className,
  'aria-hidden': ariaHidden = true,
}: AppIconProps) {
  const trimmedName = (name || '').trim();
  const IconComponent = ICON_MAP[trimmedName] ?? FileText;

  return (
    <IconComponent
      size={size}
      weight={weight}
      className={cn('shrink-0', className)}
      aria-hidden={ariaHidden === 'false' ? false : Boolean(ariaHidden)}
    />
  );
}

