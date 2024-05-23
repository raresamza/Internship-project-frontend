import * as React from "react"
import { cn } from "../../lib/utils"

// Importing the Collapsible components from @radix-ui/react-collapsible
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Aliasing Collapsible.Root as Collapsible
const Collapsible = CollapsiblePrimitive.Root

// Aliasing CollapsibleTrigger as CustomCollapsibleTrigger with added styles
const CustomCollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded",
      className
    )}
    {...props}
  />
))
CustomCollapsibleTrigger.displayName = "CustomCollapsibleTrigger"

// Aliasing CollapsibleContent as CollapsibleContent with added styles
const CustomCollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CustomCollapsibleTrigger as CollapsibleTrigger, CustomCollapsibleContent as CollapsibleContent }
