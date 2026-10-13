import { client } from "./sanity";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export interface Post extends PostMeta {
  body: any[];
}

export async function getAllPosts(): Promise<PostMeta[]> {
  return client.fetch<PostMeta[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      "date": publishedAt,
      summary
    }`
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      "date": publishedAt,
      summary,
      body
    }`,
    { slug }
  );
  return post || null;
}

export async function getAllSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "post"].slug.current`
  );
}
