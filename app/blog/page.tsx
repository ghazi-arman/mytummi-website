import Link from "next/link";
import { getAllPosts } from "../../lib/blog";
import Nav from "../components/marketing/Nav";
import Footer from "../components/marketing/Footer";

export const revalidate = 60; // refresh from Sanity every 60 seconds

export const metadata = {
  title: "Blog - My Tummi",
  description: "Articles about food sensitivities, gut health, and how to use My Tummi to feel better.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-ink">Blog</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Articles about food sensitivities, gut health, and My Tummi updates.
        </p>

        <div className="mt-12 divide-y divide-peach">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-2 sm:flex-row sm:gap-10">
                <time className="shrink-0 text-sm text-ink-soft pt-1.5 sm:w-28">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-ink group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-ink-soft leading-relaxed">{post.summary}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-12 text-ink-soft">No posts yet. Check back soon!</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
