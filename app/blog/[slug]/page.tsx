import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { getAllPosts, getPost } from "../../../lib/blog";
import Nav from "../../components/marketing/Nav";
import Footer from "../../components/marketing/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} - My Tummi`,
    description: post.summary,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          &larr; All posts
        </Link>

        <article className="mt-8">
          <time className="text-sm text-ink-soft">
            {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink leading-tight">
            {post.title}
          </h1>

          <div className="prose mt-10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
