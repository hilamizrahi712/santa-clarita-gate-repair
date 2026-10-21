export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  publishDate: string;
  readTime: string;
  category: "gate" | "garage-door";
  excerpt: string;
  content: string;
  img?: string;
  updatedAt?: string;
  pricingDisclaimer?: string;
  faq?: { q: string; a: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  // TODO(content): at most 6 posts on Santa Clarita / Antelope Valley topics. No DIY, no prices.
  {
    slug: "todo-first-post",
    title: "TODO(content)",
    metaTitle: "TODO(content)",
    metaDescription: "TODO(content)",
    primaryKeyword: "TODO(content)",
    publishDate: "2026-10-21",
    readTime: "1 min read",
    category: "gate",
    excerpt: "TODO(content)",
    content: "TODO(content)",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
