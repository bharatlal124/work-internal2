import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";

export default async function Archive({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const POSTS_PER_PAGE = 6;

  const res = await fetch("https://bharat-blog.onrender.com/api/blogs/all", {
  // const res = await fetch("http://localhost:5000/api/blogs/all", {
    cache: "no-store" // SSR fetch without caching
  });
  const allPosts = await res.json();
  // console.log(allPosts);

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const posts = allPosts.slice(start, end);

  const isFirstPage = page === 1;
  const isLastPage = end >= allPosts.length;

  return (
    <>
      {posts.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">End of the result!</span>
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="square" />
        ))}
      </div>

      <Pagination
        pageIndex={page}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
