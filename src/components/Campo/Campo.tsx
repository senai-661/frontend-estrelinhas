import type { ReactNode } from "react";

interface CampoProps {
  label: string;
  children: ReactNode;
}

export default function Campo({ label, children }: CampoProps) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600 disabled:bg-gray-100";