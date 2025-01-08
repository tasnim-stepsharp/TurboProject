"use client";

import React, { InputHTMLAttributes } from "react";
import CheckSvg from "./icons/CheckSvg.tsx";
import cn from "../lib/cn.ts";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  labelClass?: string;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  labelClass = "",
  label = "",
  ...props
}) => {
  return (
    <label className="flex items-center group/check cursor-pointer ">
      <span
        className={cn(
          "cursor-pointer duration-300 group-has-[input:checked]/check:bg-primary group-has-[input:checked]/check:border-primary group-hover/check:border-primary flex justify-center items-center size-4 border border-gray-abc-400 dark:border-gray-abc-50 rounded",
          className
        )}
      >
        <CheckSvg className="size-3 duration-300 text-white group-has-[input:checked]/check:block hidden" />
        <input className="hidden" type="checkbox" {...props} />
      </span>
      {label && (
        <span className={cn("ml-2 2xl:ml-2.5 font-semibold text-gray-abc-300 dark:text-Offwhite-abc-300", labelClass)}>
          {label}
        </span>
      )}
    </label>
  );
};

