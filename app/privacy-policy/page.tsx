import type { Metadata } from 'next';
import LegalDocumentViewer from '../components/LegalDocumentViewer';

export const metadata: Metadata = {
  title: 'Privacy Policy | My Tummi',
  description: 'Privacy Policy for My Tummi',
};

export const revalidate = 3600;

async function getPrivacyPolicy() {
  const res = await fetch('https://api.mytummi.app/legal-documents/privacy-policy', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export default async function PrivacyPolicyPage() {
  const doc = await getPrivacyPolicy();

  if (!doc) {
    return (
      <main className="min-h-screen bg-cream px-4 pt-28 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-ink-soft">Privacy Policy is currently unavailable. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <LegalDocumentViewer
      title="Privacy Policy"
      effectiveDate={doc.effective_date}
      contentMarkdown={doc.content_markdown}
    />
  );
}
