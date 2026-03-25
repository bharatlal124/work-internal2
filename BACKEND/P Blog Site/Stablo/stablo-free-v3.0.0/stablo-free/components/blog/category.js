import Link from "next/link";
import Label from "@/components/ui/label";

export default function CategoryLabel({ categories, nomargin = false }) {
  const normalized = Array.isArray(categories)
    ? categories
    : categories
    ? [{
        slug: { current: categories.toLowerCase() },
        title: categories,
        color: "gray"
      }]
    : [];

  return (
    <div className="flex gap-3">
      {normalized.map((category, index) => (
        <Link
          href={`/category/${category.slug.current}`}
          key={index}
        >
          <Label nomargin={nomargin} color={category.color}>
            {category.title}
          </Label>
        </Link>
      ))}
    </div>
  );
}

