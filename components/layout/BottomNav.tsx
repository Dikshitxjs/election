"use client";

const navItems = [
  { label: "Home", path: "/", icon: "⌂" },
  { label: "Districts", path: "/explore", icon: "◈" },
  { label: "Contact", path: "/contact", icon: "✉" },
];


import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
		<nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-lg">
			<div className="flex justify-around max-w-md mx-auto">
				{navItems.map((item) => (
					<button
						key={item.path}
						onClick={() => router.push(item.path)}
						className={`flex flex-col items-center py-3 text-xs w-full transition font-bold ${pathname === item.path ? "text-blue-400 bg-slate-800" : "text-slate-400 hover:text-slate-300"}`}
					>
						<span className="text-lg">{item.icon}</span>
						<span className={pathname === item.path ? 'text-blue-400' : 'text-slate-400 hover:text-slate-300'}>{item.label}</span>
						{item.path === '/explore' && counts && (
							<span className="text-[10px] text-slate-500 font-semibold mt-0.5">{counts.support}+ {counts.oppose}−</span>
						)}
					</button>
				))}
			</div>
		</nav>
	);
}