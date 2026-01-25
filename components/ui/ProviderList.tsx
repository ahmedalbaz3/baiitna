"use client";
import ServiceCard from "../shared/ServiceCard";
import { useQuery } from "@apollo/client/react";
import { PROVIDERS_QUERY } from "@/graphql/queries";
import { AllProvidersData } from "@/types/providers";
import { Loader } from "lucide-react";
import Image from "next/image";
import ProviderCardSkeleton from "./skeletons/ProviderCardSkeleton";

const ProviderList = ({ serviceId }: { serviceId: string }) => {
  const { data, loading, error } = useQuery<AllProvidersData>(PROVIDERS_QUERY, {
    variables: { serviceId: serviceId, limit: 4 },
  });

  return (
    <div className={`min-h-[456px] w-full mx-auto `}>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full ">
          {[1, 2, 3, 4].map((index) => (
            <ProviderCardSkeleton key={index} />
          ))}
        </div>
      )}
      {data?.allProviders.data.items.length === 0 && (
        <div className=" bg-white grid place-content-center gap-4 text-center mt-12.5 w-fit mx-auto">
          <Image
            src="/images/no-companies.svg"
            alt="No companies available"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h2 className="text-2xl font-bold">
            No services providers available.
          </h2>
          <p className="max-w-md mx-auto text-gray-600">
            Sorry, no service providers are available at this time.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full ">
        {data?.allProviders.data.items.map((provider: any) => (
          <ServiceCard
            key={provider.id}
            titleEn={provider.businessNameEn}
            titleAr={provider.businessNameAr}
            descriptionEn={provider.sloganEn}
            descriptionAr={provider.sloganAr}
            imageUrl={
              provider.cover
                ? provider.cover.file
                : "/images/service-card-1.jpeg"
            }
            providerLogo={
              provider.logo ? provider.logo.file : "/images/provider-logo.png"
            }
            phone={provider.phone}
            whatsapp={provider.whatsapp}
            email={provider.email}
            profileLink={`/providers/${provider.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProviderList;
