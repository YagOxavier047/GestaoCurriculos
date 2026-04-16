import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
  secondary:
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-secondary text-secondary-foreground",
  outline:
    "inline-flex items-center rounded-full border border-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground",
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants[variant], className)} {...props} />
  )
);
Badge.displayName = "Badge";

export { Badge }
