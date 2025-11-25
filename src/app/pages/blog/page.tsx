import { nunitoSans, raleway } from "@/app/fonts/mainFonts";
import styles from "../blog/blog.module.css";
import BlogCard from "@/components/ui/BlogCard/BlogCard";
import type { IBlog } from "@/interfaces/main";

export default async function BlogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const fetchBlogs = await fetch(`${baseUrl}/api/blogs`, {
    cache: "no-store",
  });

  if (!fetchBlogs.ok) {
    throw new Error("Error fetching blog posts");
  }

  const posts = await fetchBlogs.json();

  return (
    <div className={`container ${styles.blog__section}`}>
      <h2 className={`${raleway.className} ${styles.blog__sectionTitle}`}>
        Blog
      </h2>

      <p
        className={`${nunitoSans.className} ${styles.blog__sectionDescription}`}
      >
        Insights, stories, and ideas from the world of technology and design
      </p>

      <div className={styles.container__cards}>
        {posts.map((post: IBlog, i: string) => (
          <BlogCard
            key={i}
            image={post.image}
            title={post.title}
            type={post.type}
            description={post.description}
          />
        ))}
      </div>
    </div>
  );
}
