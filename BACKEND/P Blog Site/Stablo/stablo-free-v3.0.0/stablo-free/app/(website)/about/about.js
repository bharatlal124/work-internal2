import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

export default function About({ authors, settings }) {
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About
      </h1>
      <div className="text-center">
        <p className="text-lg">We are a small passionate team.</p>
      </div>

     <div className="flex items-center justify-center h-screen">
  <div className="w-72 h-72 rounded-full overflow-hidden">
    <Image
      src="/about-img2.jpg"  
      alt="Sample Image"
      width={288}   
      height={288}  
      className="object-cover w-full h-full"
    />
  </div>
</div>




      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          We deliver up-to-date insights and curated content on the latest
          trends in technology, bringing together breaking news, product
          launches, and industry developments in one place.
        </p>
        <p>
          Our blog features in-depth articles on artificial intelligence,
          emerging tools, and innovations shaping the future, catering to
          tech enthusiasts, professionals, and anyone passionate about the
          digital world.
        </p>

        <p>
          <Link href="/contact">Get in touch</Link>
        </p>
      </div>
    </Container>
  );
}
