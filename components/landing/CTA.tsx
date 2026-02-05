import Button from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 py-8 sm:py-10 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Main Disclaimer */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-5 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">🏛️ MahaBhidanta Chhetras</h3>
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            This platform features the <strong>most popular constituencies</strong> across Nepal. The candidates and districts listed above represent key electoral regions.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            <strong>Don't see your candidates or district?</strong> We're continuously adding more regions. Contact us to request your constituency.
          </p>
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition">📧 Contact Us to Add Yours</Button>
        </div>
      </div>
    </section>
  );
}