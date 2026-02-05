import Button from "@/components/ui/button";


export default function CTA() {
return (
<section className="px-4 py-8">
<div className="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-md text-center">
<p className="text-sm text-slate-300 font-semibold mb-4">
Featuring key election districts across Nepal.
Can't find your district?
</p>


<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5">Contact Us</Button>
</div>
</section>
);
}