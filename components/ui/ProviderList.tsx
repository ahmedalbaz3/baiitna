"use client";
import React from "react";
import ServiceCard from "../shared/ServiceCard";
import { useQuery } from "@apollo/client/react";
import { PROVIDERS_QUERY } from "@/graphql/queries";
import { AllProvidersData } from "@/types/providers";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

const ProviderList = ({ serviceId }: { serviceId: string }) => {
  const { data, loading, error } = useQuery<AllProvidersData>(PROVIDERS_QUERY, {
    variables: { serviceId: serviceId, limit: 4 },
  });

  console.log(data, "error:", error);
  return (
    <>
      {loading && <Loader className="animate-spin w-full mx-auto" />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full min-h-[456px]">
        {data?.allProviders.data.items.map((provider: any) => (
          <ServiceCard
            key={provider.id}
            title={provider.businessNameEn}
            description={provider.aboutEn}
            imageUrl={
              provider.media && provider.media.length > 0
                ? provider.media[0].file
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
    </>
  );
};

export default ProviderList;
