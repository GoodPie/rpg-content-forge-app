import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground",
      },
      color: {
        default: "",
        red: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
        green: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        blue: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
        purple: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
        gray: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
      },
    },
    defaultVariants: {
      variant: "outline",
      color: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode;
}

/**
 * Tag component for displaying labels, categories, or statuses
 * 
 * @example
 * ```tsx
 * <Tag>Default Tag</Tag>
 * <Tag color="red">Red Tag</Tag>
 * <Tag color="green" variant="secondary">Green Secondary Tag</Tag>
 * ```
 */
export function Tag({
  children,
  variant,
  color,
  className,
  ...props
}: TagProps) {
  return (
    <Badge 
      variant={variant} 
      className={cn(color && tagVariants({ color }), className)}
      {...props}
    >
      {children}
    </Badge>
  );
}

export { tagVariants };