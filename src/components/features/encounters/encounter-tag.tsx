import { Tag, type TagProps } from "@/components/ui/tag";

/**
 * EncounterTag component for displaying encounter tags
 * 
 * @example
 * ```tsx
 * <EncounterTag tag="forest" />
 * <EncounterTag tag="combat" color="red" />
 * <EncounterTag tag="quest" color="blue" variant="secondary" />
 * ```
 */
export interface EncounterTagProps extends Omit<TagProps, 'children'> {
  tag: string;
}

const EncounterTag = ({
  tag,
  variant,
  color,
  className,
  ...props
}: EncounterTagProps) => {
  return (
    <Tag 
      variant={variant} 
      color={color}
      className={className}
      {...props}
    >
      {tag}
    </Tag>
  );
};

export default EncounterTag;
