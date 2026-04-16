import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("border-t border-muted-foreground/10", className)}
      {...props}
    />
  );
}

export { Separator }
