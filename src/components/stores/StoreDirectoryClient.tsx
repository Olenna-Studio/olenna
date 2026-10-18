"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Store } from "@/lib/models/store";
import { StoreCard } from "./StoreCard";
import { Search, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StoreDirectoryClientProps {
  initialStores: Store[];
  cities: string[];
}

export function StoreDirectoryClient({
  initialStores,
  cities,
}: StoreDirectoryClientProps) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(urlQuery);

  const filteredStores = useMemo(() => {
    return initialStores.filter((store) => {
      // City filter
      if (selectedCity !== "all") {
        if (store.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }

      // Keyword query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = store.name.toLowerCase().includes(q);
        const matchesLocality = store.locality.toLowerCase().includes(q);
        const matchesCity = store.city.toLowerCase().includes(q);
        const matchesAddress = store.addressLines.some((line) =>
          line.toLowerCase().includes(q)
        );

        if (!matchesName && !matchesLocality && !matchesCity && !matchesAddress) {
          return false;
        }
      }

      return true;
    });
  }, [initialStores, selectedCity, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCity("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-plum-900/10 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-plum-700/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by store name, locality or street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-brand-ivory-50 rounded-full border border-brand-plum-900/15 focus:outline-none focus:border-brand-plum-900 text-brand-text-primary placeholder:text-brand-text-muted"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-plum-900"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCity("all")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors shrink-0 ${
                selectedCity === "all"
                  ? "bg-brand-plum-900 text-white shadow-2xs"
                  : "bg-brand-blush-50 text-brand-plum-900 hover:bg-brand-blush-100"
              }`}
            >
              All Cities ({initialStores.length})
            </button>

            {cities.map((city) => {
              const count = initialStores.filter(
                (s) => s.city.toLowerCase() === city.toLowerCase()
              ).length;

              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors shrink-0 flex items-center gap-1.5 ${
                    selectedCity.toLowerCase() === city.toLowerCase()
                      ? "bg-brand-plum-900 text-white shadow-2xs"
                      : "bg-brand-blush-50 text-brand-plum-900 hover:bg-brand-blush-100"
                  }`}
                >
                  <span>{city}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedCity !== "all" || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-brand-text-muted pt-2 border-t border-brand-plum-900/10">
            <div>
              Showing {filteredStores.length} {filteredStores.length === 1 ? "store" : "stores"}
              {selectedCity !== "all" && ` in ${selectedCity}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-brand-plum-900 hover:underline font-medium"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Stores Grid or Empty State */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : initialStores.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-3xl border border-brand-plum-900/10 max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-brand-blush-100 mx-auto flex items-center justify-center text-brand-plum-700">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-brand-plum-900">
            Store In Progress — Opening Soon!
          </h3>
          <p className="text-sm text-brand-text-secondary font-light leading-relaxed">
            Our physical store and workspace in <strong>Rajajinagar, Bangalore</strong> is currently under preparation. Once open, timings will be <strong>10:00 AM to 10:00 PM (Monday to Sunday)</strong>.
          </p>
          <p className="text-xs text-brand-text-muted">
            For questions or styling enquiries, please email{" "}
            <a href="mailto:olennastudiox@gmail.com" className="text-brand-plum-900 underline font-medium">
              olennastudiox@gmail.com
            </a>{" "}
            or call{" "}
            <span className="font-medium text-brand-plum-900">9741424695 | 08754443777</span>.
          </p>
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-brand-plum-900/10 max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-brand-blush-100 mx-auto flex items-center justify-center text-brand-plum-700">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl text-brand-plum-900">
            No stores match your search
          </h3>
          <p className="text-sm text-brand-text-secondary font-light">
            We couldn&apos;t find any Olenna stores matching your current city or search criteria.
          </p>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
