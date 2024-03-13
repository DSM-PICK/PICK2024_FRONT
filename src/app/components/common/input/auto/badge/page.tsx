import Image from "next/image";
import React from "react";
import cancel from "@/assets/img/Icon/cancel.svg";

interface BadgeProps {
  value: string;
  onRemove: () => void;
}

const Badge: React.FC<BadgeProps> = ({ value, onRemove }) => (
  <div className=" w-max bg-neutral-900 text-neutral-50 rounded-lg px-3 justify-center py-2 flex items-center text-caption1 gap-2">
    <span>{value}</span>
    <Image
      src={cancel}
      alt=""
      width={16}
      height={16}
      onClick={onRemove}
      className="cursor-pointer"
    />
  </div>
);

interface SelectedBadgesProps {
  selectedValues: string[];
  onRemoveBadge: (value: string) => void;
}

const SelectedBadges: React.FC<SelectedBadgesProps> = ({
  selectedValues,
  onRemoveBadge,
}) => (
  <div className="flex gap-2 flex-wrap">
    {selectedValues?.map((value) => (
      <Badge key={value} value={value} onRemove={() => onRemoveBadge(value)} />
    ))}
  </div>
);

export default SelectedBadges;
