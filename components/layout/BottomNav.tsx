"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
	{
		label: "Home",
		path: "/",
		icon: (
			<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M3 9.5L12 4l9 5.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		label: "Explore",
		path: "/explore",
		icon: (
			<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="12" cy="10" r="2.2" />
			</svg>
		),
	},
	{
		label: "Contact",
		path: "/contact",
		icon: (
			<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M3 8l9 6 9-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
];

export default function BottomNav() {
	const router = useRouter();
	const pathname = usePathname();
	const [counts, setCounts] = useState<{ support: number; oppose: number } | null>(null);

	useEffect(() => {
		// fetch global vote stats for display
		fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/votes/stats`, { mode: 'cors' })
			.then((r) => r.json())
			.then((data) => {
				if (data && data.totals) setCounts({ support: data.totals.support, oppose: data.totals.oppose });
			})
			.catch(() => {});
	}, []);

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
			<div className="flex justify-around max-w-md mx-auto">
				{navItems.map((item) => (
					<button
						key={item.path}
						onClick={() => router.push(item.path)}
						className={`flex flex-col items-center py-3 text-xs w-full transition font-semibold ${pathname === item.path ? "text-teal-600 bg-gray-50" : "text-gray-500 hover:text-gray-700"}`}
					>
						<span className="text-lg">{item.icon}</span>
						<span className={pathname === item.path ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}>{item.label}</span>
						{item.path === '/explore' && counts && (
							<span className="text-[10px] text-gray-400 font-semibold mt-0.5">{counts.support}+ {counts.oppose}−</span>
						)}
					</button>
				))}
			</div>
		</nav>
	);
}