import {
  Landmark,
  Gavel,
  Scale,
  Users,
  Map as MapIcon,
  ShieldCheck,
  Briefcase,
  ShoppingCart,
  FileText,
  Building2,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  catConstitution: Landmark,
  catCriminal: Gavel,
  catCivil: Scale,
  catFamily: Users,
  catLand: MapIcon,
  catCyber: ShieldCheck,
  catLabour: Briefcase,
  catConsumer: ShoppingCart,
  catContract: FileText,
  catBusiness: Building2,
};

export function CategoryIcon({ category, size = 18 }: { category: string; size?: number }) {
  const Icon = map[category] ?? FileText;
  return <Icon size={size} />;
}
