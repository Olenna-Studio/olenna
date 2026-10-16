import Link from "next/link";
import { ArrowLeft, Compass, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-brand-ivory-50">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-champagne-700 font-semibold bg-brand-blush-100/60 px-3.5 py-1.5 rounded-full">
            Page Not Found
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-plum-900 tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-serif text-brand-plum-950 font-normal">
            Moments like this happen.
          </h2>
          <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-light">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let us help you find your way back.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-plum-900 text-white text-sm font-medium hover:bg-brand-plum-950 shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-brand-plum-900/20 text-brand-plum-900 text-sm font-medium hover:bg-brand-blush-100/50 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Collections</span>
          </Link>
          <Link
            href="/stores"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-brand-plum-900/20 text-brand-plum-900 text-sm font-medium hover:bg-brand-blush-100/50 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Our Stores</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
