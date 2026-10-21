import { MessageSquareText } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

interface Props {
  className?: string;
  label?: string;
  size?: number;
}

export default function TextUsCTA({ className = "btn-ghost", label = "Text Us a Photo", size = 16 }: Props) {
  return (
    <a href={BUSINESS.smsHref} className={className}>
      <MessageSquareText size={size} />
      {label}
    </a>
  );
}
