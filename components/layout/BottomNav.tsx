"use client";

const navItems = [
  { label: "Home", path: "/", icon: "🏠" },
  { label: "Explore", path: "/explore", icon: "🗳️" },
  { label: "Contact", path: "/contact", icon: "📞" },
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
		<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
			<div className="flex justify-around max-w-md mx-auto">
				{navItems.map((item) => (
					<button
						key={item.path}
						onClick={() => router.push(item.path)}
						className={`flex flex-col items-center py-2 text-xs w-full transition ${pathname === item.path ? "text-blue-600" : "text-gray-500"}`}
					>
						<span className="text-lg">{item.icon}</span>
						<span className={pathname === item.path ? 'text-blue-600' : 'text-gray-700'}>{item.label}</span>
						{item.path === '/explore' && counts && (
							<span className="text-[10px] text-gray-400">{counts.support}▲ {counts.oppose}▼</span>
						)}
					</button>
				))}
			</div>
		</nav>
	);
}