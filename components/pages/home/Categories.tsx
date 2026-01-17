import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

const Categories = async () => {
  const t = await getTranslations("HomePage.Categories");
  return (
    <section className="bg-white pb-sm-section-py">
      <div className="container flex flex-col items-start">
        <h2 className="text-3xl font-semibold mb-6 ">{t("title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 w-full">
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2  me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
          <Link
            href="/"
            className="flex flex-col items-center gap-3  mb-2    me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
          >
            <Image
              src="/images/category_image-1.png"
              alt="Category 1"
              width={56}
              height={56}
            />
            <span className="hover:text-primary text-center">
              Design and Furnishing
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
