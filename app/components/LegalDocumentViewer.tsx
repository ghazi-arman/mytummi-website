'use client';

import ReactMarkdown from 'react-markdown';

interface LegalDocumentViewerProps {
  title: string;
  version: string;
  effectiveDate: string;
  contentMarkdown: string;
}

export default function LegalDocumentViewer({
  title,
  version,
  effectiveDate,
  contentMarkdown,
}: LegalDocumentViewerProps) {
  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mb-10 text-sm text-gray-600">
          Last updated: {formattedDate} &nbsp;·&nbsp; Version {version}
        </p>

        <div className="text-gray-700 leading-7">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mt-10 mb-3 text-3xl font-bold text-gray-900">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-gray-900">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-900">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 list-disc pl-6 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 list-decimal pl-6 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-7">{children}</li>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-blue-600 underline hover:text-blue-800">
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              hr: () => <hr className="my-8 border-gray-200" />,
            }}
          >
            {contentMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
