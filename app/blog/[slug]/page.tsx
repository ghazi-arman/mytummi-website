import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { getAllSlugs, getPost } from "../../../lib/blog";

export const revalidate = 60;
import { urlFor } from "../../../lib/sanity";
import Nav from "../../components/marketing/Nav";
import Footer from "../../components/marketing/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} - My Tummi`,
    description: post.summary,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          className="my-6 rounded-lg"
          loading="lazy"
        />
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
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
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink leading-tight">
            {post.title}
          </h1>

          <div className="prose mt-10">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
