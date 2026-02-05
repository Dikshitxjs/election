import Button from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 py-8 sm:py-10 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Main Disclaimer */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-5 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-3">
            <svg className="w-5 h-5 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9.5L12 4l9 5.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            MahaBhidanta Chhetras
          </h3>
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            This platform features the <strong>most popular constituencies</strong> across Nepal. The candidates and constituencies listed above represent key electoral regions.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            <strong>Don't see your constituency?</strong> We're continuously adding more regions. Contact us to request your constituency.
          </p>
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition">
            <svg className="w-4 h-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 8l9 6 9-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contact Us to Add Yours
          </Button>
        </div>
      </div>
    </section>
  );
}