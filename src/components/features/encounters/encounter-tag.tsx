import {Badge} from "@/components/ui/badge";

interface EncounterTagProps {
  tag: string;
}

const EncounterTag = ({tag}: EncounterTagProps) => {
  return (
    <Badge variant="outline">
      {tag}
    </Badge>
  )
}

export default EncounterTag;