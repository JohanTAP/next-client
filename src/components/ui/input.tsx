import * as React from "react";

export const Input = React.memo(
  React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          className={`flex h-12 w-full rounded-md border-2 bg-[#3a3a3a] px-4 py-2 ${className}`}
          ref={ref}
          {...props}
        />
      );
    }
  )
);
Input.displayName = "Input";
