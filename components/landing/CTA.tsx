import Button from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 py-8 sm:py-10 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Main Disclaimer */}
        <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-5 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3 4h5v2h-1l-1 10H7L6 8H5V6h5L12 2m0 2l-2 2h4l-2-2m0 6h6l1 8H5l1-8h6z" />
            </svg>
            MahaBhidanta Chhetras
          </h3>
          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
            This platform features the <strong>most popular constituencies</strong> across Nepal. The candidates and regions listed represent key electoral areas.
          </p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            <strong>Don't see your constituency?</strong> We're continuously expanding. Contact us to request your region.
          </p>
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            Contact Us to Add Yours
          </button>
        </div>
      </div>
    </section>
  );
}