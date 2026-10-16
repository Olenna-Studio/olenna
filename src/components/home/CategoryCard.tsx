import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib/models/category";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const destination = category.destinationUrl || `/collections/${category.slug}`;

  return (
    <Link
      href={destination}
      className="group relative flex flex-col bg-[#F6E6ED] hover:bg-[#F2DDE6] rounded-2xl p-3 sm:p-3.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-plum-900"
    >
      {/* Category Image Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-brand-blush-100 mb-3">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title & Arrow Action */}
      <div className="flex items-center justify-between gap-2 pt-1 pb-1 px-1">
        <h3 className="text-xs sm:text-sm font-medium text-brand-plum-900 line-clamp-2 leading-snug group-hover:text-brand-plum-950">
          {category.name}
        </h3>
        <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full bg-white group-hover:bg-brand-plum-900 text-brand-plum-900 group-hover:text-white flex items-center justify-center border border-brand-plum-900/15 shadow-2xs transition-colors">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
