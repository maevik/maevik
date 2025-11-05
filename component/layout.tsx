import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  more?: ReactNode[];
}

export default function PageLayout({
  children,
  title,
  subtitle,
  more,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 pt-20 pb-15">
      <div className="relative space-y-2">
        <div className="max-w-5xl rounded-3xl p-10 bg-black/5 backdrop-blur-3xl backdrop-saturate-150 shadow-2xl border-2 border-white/20 transition-all duration-500 ease-in-out overflow-y-auto">
          {(title || subtitle) && (
            <div className="flex flex-col items-start">
              <h1 className="text-5xl lg:text-7xl md:text-6xl sm:text-6xl font-extrabold tracking-tight">
                {title}
              </h1>
              <span className="text-left text-xl md:text-2xl lg:pl-1 text-gray-200/80">
                {subtitle}
              </span>
            </div>
          )}

          {children && (
            <article className="mt-12 prose prose-invert max-w-none">
              {children}
            </article>
          )}
        </div>

        {more &&
          more.map((component, index) => (
            <div
              key={index}
              className="rounded-3xl p-5 bg-black/5 backdrop-blur-3xl backdrop-saturate-150 shadow-2xl border border-white/20 transition-all duration-500 ease-in-out overflow-y-auto"
            >
              {component}
            </div>
          ))}
      </div>
    </div>
  );
}
