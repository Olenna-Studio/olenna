import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { getCategoryRepository, getSiteSettingsRepository } from "@/lib/repositories";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { assetPath } from "@/lib/utils/assetPath";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categoryRepo = getCategoryRepository();
  const categories = await categoryRepo.getActiveCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryRepo = getCategoryRepository();
  const category = await categoryRepo.getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.metaTitle || `${category.name} | Olenna`,
    description: category.metaDescription || category.description,
    alternates: {
      canonical: `/collections/${category.slug}`,
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryRepo = getCategoryRepository();
  const settingsRepo = getSiteSettingsRepository();

  const [category, settings] = await Promise.all([
    categoryRepo.getCategoryBySlug(slug),
    settingsRepo.getSiteSettings(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-brand-ivory-50 min-h-screen py-10 sm:py-16">
      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#collections"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand-text-secondary hover:text-brand-plum-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Collections</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl border border-brand-plum-900/10 overflow-hidden shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-5">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-brand-plum-700 uppercase">
                Curated Collection
              </span>

              <h1 className="text-3xl sm:text-4xl font-serif text-brand-plum-900 leading-tight">
                {category.name}
              </h1>

              <p className="text-base sm:text-lg text-brand-text-secondary font-light leading-relaxed">
                {category.longDescription || category.description}
              </p>

              {/* Highlights */}
              {category.highlights && category.highlights.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-semibold tracking-wider text-brand-plum-900 uppercase mb-2">
                    Collection Highlights
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 text-xs bg-brand-blush-50 text-brand-plum-900 px-3 py-1 rounded-full border border-brand-plum-900/10"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-plum-700" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  href={settings.customerPwaUrl}
                  isExternal
                  variant="primary"
                  size="lg"
                  className="shadow-xs hover:shadow-md"
                >
                  <span>Explore on Customer App</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 stroke-[2.2]" />
                </Button>

                <Button href="/stores" variant="outline" size="lg">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>Find in Stores</span>
                </Button>
              </div>
            </div>

            {/* Category Visual */}
            <div className="lg:col-span-5 relative min-h-72 sm:min-h-96 w-full bg-brand-blush-100">
              <Image
                src={assetPath(category.image)}
                alt={category.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Experience in Person Note */}
        <div className="bg-[#F6E6ED] p-8 rounded-3xl border border-brand-plum-900/10 text-center max-w-3xl mx-auto space-y-3">
          <Sparkles className="w-6 h-6 text-brand-plum-700 mx-auto" />
          <h2 className="font-serif text-2xl text-brand-plum-900">
            Available at Olenna Boutiques
          </h2>
          <p className="text-sm text-brand-text-secondary font-light max-w-xl mx-auto">
            Experience the rich texture, craftsmanship, and custom fittings of our {category.name} range in person. Our boutique stylists are delighted to guide your selection.
          </p>
          <div className="pt-2">
            <Button href="/stores" variant="secondary" size="md">
              Locate Nearby Store
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
