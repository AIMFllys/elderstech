"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/hooks/use-scroll";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const links = [
    { label: "调研思路", href: "#timeline" },
    { label: "调研详情", href: "#about-section" },
    {
      label: "调研成果",
      href: "#stats",
      children: [
        { label: "调研数据", href: "#stats" },
        { label: "APP下载", href: "/app-download" },
      ],
    },
    { label: "调研展示", href: "#nav-cards" },
    { label: "团队展示", href: "#team" },
    { label: "关于", href: "#footer" },
  ];

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 z-[9999] pointer-events-auto w-full max-w-5xl -translate-x-1/2 md:rounded-md md:transition-all md:ease-out bg-transparent border-b border-transparent md:border md:border-transparent",
        scrolled && !open && "bg-background/95 backdrop-blur-lg border-border md:shadow",
        open && "bg-background/90 backdrop-blur-lg"
      )}
    >
      <nav
        className="flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out pointer-events-auto"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">智慧医养赋能计划</span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) =>
            link.children ? (
              <div key={i} className="relative group">
                <a
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-black dark:text-white"
                  )}
                  href={link.href}
                >
                  {link.label}
                </a>
                <div className="absolute left-0 top-full mt-2 min-w-[180px] rounded-2xl border border-ink/10 dark:border-ink-dark/20 bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-xl ring-1 ring-black/5 dark:ring-white/5 py-1 opacity-0 invisible pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto before:content-[''] before:absolute before:left-0 before:-top-3 before:h-3 before:w-full">
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-black/90 dark:text-white/90 hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10 transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={i}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-black dark:text-white"
                )}
                href={link.href}
              >
                {link.label}
              </a>
            )
          )}
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button size="icon" variant="outline" onClick={() => setOpen(!open)}>
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex h-full w-full flex-col justify-between gap-y-2 p-4"
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) =>
              link.children ? (
                <div key={link.label} className="grid gap-1">
                  <a
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        className: "justify-start",
                      }),
                      "text-black dark:text-white"
                    )}
                    href={link.href}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                  <div className="ml-4 grid gap-1">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            className: "justify-start text-sm",
                          }),
                          "text-black/80 dark:text-white/80"
                        )}
                        href={child.href}
                        onClick={handleLinkClick}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "justify-start",
                    }),
                    "text-black dark:text-white"
                  )}
                  href={link.href}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
