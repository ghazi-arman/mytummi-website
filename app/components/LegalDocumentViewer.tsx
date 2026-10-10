'use client';

import ReactMarkdown from 'react-markdown';
import Nav from './marketing/Nav';
import Footer from './marketing/Footer';

interface LegalDocumentViewerProps {
  title: string;
  effectiveDate: string;
  contentMarkdown: string;
}

export default function LegalDocumentViewer({
  title,
  effectiveDate,
  contentMarkdown,
}: LegalDocumentViewerProps) {
  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-ink">{title}</h1>
        <p className="mt-2 text-sm text-ink-soft">Effective {formattedDate}</p>

        <div className="prose mt-10">
          <ReactMarkdown>{contentMarkdown}</ReactMarkdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
