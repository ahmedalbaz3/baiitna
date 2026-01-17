import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[70dvh] bg-white mt-[112px] grid place-content-center gap-4 text-center ">
      <Image
        src="/images/search-404.svg"
        alt="Search 404"
        width={150}
        height={150}
        className="mx-auto"
      />
      <h2 className="text-2xl font-bold">Sorry, Page not found</h2>
      <p className="max-w-md mx-auto text-gray-600">
        The page you’re looking for doesn’t exist. Please check the URL in the
        address bar or back to the homepage.
      </p>
      <Link href="/">
        <Button text="Return Home" className="w-fit  mx-auto" />
      </Link>
    </div>
  );
}
