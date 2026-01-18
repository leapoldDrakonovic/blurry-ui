import React, { useRef, useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Button } from "@/components/button";
import type { BaseProps, Variant } from "@/type";
import { cn } from "@/utils";
import { STYLE } from "@/style";

interface DropdownProps extends BaseProps {
  placeholder?: string;
  children?: React.ReactNode;
}

type DropdownComponent = React.FC<DropdownProps> & {
  Content: React.FC<{ children: React.ReactNode }>;
  Item: React.FC<React.HTMLAttributes<HTMLDivElement>>;
};


const VARIANT: Record<Variant, string> = {
    outlined: "",
    default: cn(STYLE.default),
    darker: cn(STYLE.darker)
}


const DropdownContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="w-full h-full linear duration-100">{children}</div>;

const DropdownItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <div
    className={cn(`px-4 py-2 cursor-pointer transition-colors`, className)}
    {...rest}
  >
    {children}
  </div>
);

export const Dropdown: DropdownComponent = ({
  children,
  variant = "default",
  className,
  placeholder = "Elements",
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Найти Dropdown.Content среди children
  let content: ReactElement<any, any> | null = null;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === DropdownContent) {
      content = child;
    }
  });

  return (
    <div className="relative" ref={ref}>
      <Button onClick={() => setOpen((v) => !v)} variant={variant} className={className}>
        {placeholder}
      </Button>
      {open && content && (
        <div
          className={cn(VARIANT[variant], "absolute linear duration-100 left-0 mt-2 w-full min-w-[8rem] z-10 py-2")}
          {...rest}
        >
          {(content as ReactElement<any, any>).props.children}
        </div>
      )}
    </div>
  );
};

Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;