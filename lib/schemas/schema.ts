export const getOrganizationSchema = ({
  description,
}: {
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  description: description,
  legalName: "baiitna Platform FZ-LLC",
  name: "baiitna",
  url: "https://baiitna.com",
  logo: "https://baiitna.com/logo.png",
  sameAs: [
    "https://apps.apple.com/eg/app/baiitna/id6747127827",
    "https://play.google.com/store/apps/details?id=com.baiitnaapp",
    "https://www.facebook.com/profile.php?id=61578714354591",
    "https://www.instagram.com/baiitna/",
    "https://www.linkedin.com/company/baiitna",
  ],
  brand: {
    "@id": "https://baiitna.com#brand",
  },
  contactPoint: {
    "@type": "ContactPoint",
    areaServed: "AE",
    availableLanguage: ["ar", "en"],
    contactType: "Customer Support",
    email: "hello@baiitna.com",
    telephone: "+971502229888",
  },
  image: {
    "@id": "https://baiitna.com/#/schema/image/2908f46",
  },
  mainEntityOfPage: {
    "@type": "WebSite",
    "@id": "https://baiitna.com/#webpage",
  },
});

export const getBrandSchema = () => ({
  "@context": "https://schema.org",
  "@id": "https://baiitna.com#brand",
  "@type": "Brand",
  name: "baiitna",
  logo: "https://baiitna.com/logo.svg",
  sameAs: [
    "https://apps.apple.com/eg/app/baiitna/id6747127827",
    "https://play.google.com/store/apps/details?id=com.baiitnaapp",
    "https://www.instagram.com/baiitna/",
    "https://www.linkedin.com/company/baiitna",
  ],
});

export const getFaqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const getGlobalSchemas = (locale: string) => {
  const baseUrl = "https://baiitna.com";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "baiitna",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          "https://facebook.com/baiitna",
          "https://instagram.com/baiitna",
        ],
      },
      {
        "@type": "MobileApplication",
        name: "Baiitna App",
        operatingSystem: "iOS, Android",
        applicationCategory: "BusinessApplication",
        installUrl: "https://apps.apple.com/...", // Add your real links
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1200",
        },
      },
    ],
  };
};

export const getWebPageSchema = () => ({
  "@context": "https://schema.org",
  "@id": "https://baiitna.com/#webpage",
  "@type": "WebPage",
  name: "Home - For every beautiful home | baiitna",
  description:
    "Discover baiitna platform that connects homeowners with service providers for construction, decor, and maintenance. Find the best quotes and get your service.",
  url: "https://baiitna.com",
  inLanguage: "en",
  additionalType: "https://schema.org/CollectionPage",
  dateModified: "2026-01-19T11:01:05+04:00",
  datePublished: "2024-01-01T00:00:00+04:00",
  primaryImageOfPage: "https://baiitna.com/share.jpg",
  thumbnailUrl: "https://baiitna.com/share.jpg",
  about: {
    "@id": "https://baiitna.com#organization",
  },

  breadcrumb: {
    "@id": "https://baiitna.com/#breadcrumb",
  },

  isPartOf: {
    "@id": "https://baiitna.com#website",
  },

  mainEntityOfPage: {
    "@id": "https://baiitna.com/#webpage",
  },
  potentialAction: {
    "@type": "ReadAction",
    target: "https://baiitna.com/",
  },
});

export const getBreadcrumbSchema = (
  items: { name: string; url: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://baiitna.com/#breadcrumb",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getImageObjectSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://baiitna.com/#/schema/image/2908f46",
  contentUrl: "https://baiitna.com/share.jpg",
  inLanguage: "en-UAE",
  url: "https://baiitna.com/share.jpg",
});
