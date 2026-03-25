import { Suspense } from "react";
import Container from "@/components/container";
import SinglePost from "./singlepost";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";

export const runtime = "edge";

export default async function SinglePostPage() {
    //  const { id } = Params;
  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Single Post
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">
            See full post.
          </p>
        </div>
        <Suspense
          key={searchParams.page || "1"}
          fallback={<Loading />}>
          <SinglePost searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

// export const revalidate = 60;
