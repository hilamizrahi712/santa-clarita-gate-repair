import { BLOG_POSTS } from "@/lib/blog-data";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/tips/${slug}`);
}
