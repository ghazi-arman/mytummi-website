import type { Metadata } from 'next';
import LegalDocumentViewer from '../components/LegalDocumentViewer';

export const metadata: Metadata = {
  title: 'Terms of Service | My Tummi',
  description: 'Terms of Service for My Tummi',
};

export const revalidate = 3600;

async function getTermsOfService() {
  const res = await fetch('https://api.mytummi.app/legal-documents/terms-of-service', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export default async function TermsOfServicePage() {
  const doc = await getTermsOfService();

  if (!doc) {
    return (
      <main className="min-h-screen bg-cream px-4 pt-28 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-ink-soft">Terms of Service is currently unavailable. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <LegalDocumentViewer
      title="Terms of Service"
      effectiveDate={doc.effective_date}
      contentMarkdown={doc.content_markdown}
    />
  );
}
