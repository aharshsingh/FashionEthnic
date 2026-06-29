import { Feature } from "../../components/ui/feature-section-with-bento-grid";
import { LayoutDashboard } from "lucide-react";

export default function FeatureDemo() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 lg:px-8 lg:pt-14 lg:pb-28">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-3 animate-fade-up">
          <span className="eyebrow w-fit">
            <LayoutDashboard className="h-3.5 w-3.5" /> Overview
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-navy md:text-5xl">
            Admin Dashboard
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-navy/60">
            Your store at a glance — manage products, customers, and everything in between from one place.
          </p>
        </div>

        {/* Content panel */}
        <div className="rounded-2xl bg-white shadow-soft">
          <Feature />
        </div>
      </div>
    </div>
  );
}
