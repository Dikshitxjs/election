

import Hero from "@/components/landing/hero";

import CTA from "@/components/landing/CTA";
import BottomNav from "@/components/layout/BottomNav";


export default function HomePage() {
return (
<main className="min-h-screen bg-gray-50 flex flex-col">
<Hero />

<CTA />
<BottomNav />
</main>
);
}