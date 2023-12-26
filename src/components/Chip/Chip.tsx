import React from 'react';

type ChipType = 'paid' | 'unpaid';

interface ChipProps {
  type: ChipType;
  value: string;
}

const chipColor = {
  unpaid: 'bg-primary',
  paid: 'bg-secondary'
};

export default function Chip({ type, value }: ChipProps) {
  return (
    <div
      className={`relative grid select-none items-center whitespace-nowrap ${chipColor[type]} w-fit rounded-xl px-3 py-1.5 font-sans text-xs font-semibold text-white`}
    >
      <span>{value}</span>
    </div>
  );
}
