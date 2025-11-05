import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-shadow-black">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-5 mb-3 text-shadow-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2 text-shadow-black">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-shadow-black">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-shadow-black">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-shadow-black">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 text-shadow-black">{children}</li>
    ),
    hr: () => <hr className="my-6 border-gray-600" />,
    strong: ({ children }) => (
      <strong className="font-bold text-shadow-black">{children}</strong>
    ),
    ...components,
  };
}
