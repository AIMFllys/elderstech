'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: '调研详情',
			href: '#about-section',
		},
		{
			label: '调研成果',
			href: '#stats',
		},
		{
			label: '调研展示',
			href: '#nav-cards',
		},
		{
			label: '团队展示',
			href: '#team',
		},
		{
			label: '关于',
			href: '#footer',
		},
	];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	const handleLinkClick = () => {
		setOpen(false);
	};

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-5xl md:rounded-md md:transition-all md:ease-out bg-white/20 dark:bg-black/20 backdrop-blur-lg border-b border-transparent md:border md:border-transparent',
				scrolled && !open && 'bg-background/95 border-border md:top-4 md:max-w-4xl md:shadow',
				open && 'bg-background/90',
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': scrolled,
					},
				)}
			>
				<div className="flex items-center gap-2">
					<span className="text-lg font-semibold text-hust">智慧医养赋能计划</span>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<a key={i} className={buttonVariants({ variant: 'ghost', size: 'sm' })} href={link.href}>
							{link.label}
						</a>
					))}
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
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<a
								key={link.label}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start',
								})}
								href={link.href}
								onClick={handleLinkClick}
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
