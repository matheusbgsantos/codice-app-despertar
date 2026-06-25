import type { ComponentType } from "react";
import {
  Shield,
  Zap,
  Dna,
  Moon,
  Gem,
  Unlock,
  RefreshCw,
  Heart,
  Sparkles,
  Eye,
  Anchor,
  Leaf,
  Coins,
  Brain,
  Target,
  type LucideProps,
} from "lucide-react";

// Mapa nome (string) -> componente de ícone lucide-react.
// Mantém os dados do catálogo puros (sem JSX).
const iconMap: Record<string, ComponentType<LucideProps>> = {
  Shield,
  Zap,
  Dna,
  Moon,
  Gem,
  Unlock,
  RefreshCw,
  Heart,
  Sparkles,
  Eye,
  Anchor,
  Leaf,
  Coins,
  Brain,
  Target,
};

export function getIcon(
  iconName: string,
): ComponentType<LucideProps> {
  return iconMap[iconName] ?? Sparkles;
}
