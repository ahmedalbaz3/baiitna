import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const commonDisallows = [
    "/admin/",
    "/ar/admin/",
    "/dashboard/",
    "/ar/dashboard/",
    "/settings/",
    "/ar/settings/",
    "/favorites/",
    "/ar/favorites/",
    "/profile/",
    "/ar/profile/",
    "/account/",
    "/ar/account/",
    "/auth/",
    "/ar/auth/",
    "/login/",
    "/ar/login/",
    "/register/",
    "/ar/register/",
    "/*?*lang=*",
    "/ar/*?*lang=*",
    "/*?*page=*",
    "/ar/*?*page=*",
    "/*?*sort=*",
    "/ar/*?*sort=*",
    "/*?*filter=*",
    "/ar/*?*filter=*",
    "/language",
    "/ar/language",
    "/switch-language",
    "/ar/switch-language",
  ];

  const locales = ["ar"]; // 'en' is now the root, so it's handled by base paths

  const baseDisallows = ["/admin", "/dashboard" /* ... */];

  const localizedDisallows = locales.flatMap((locale) =>
    baseDisallows.map((route) => `/${locale}${route}`),
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ar/", "/images/", "/videos/", "/uploads/"],
        disallow: [...baseDisallows, ...localizedDisallows, ...commonDisallows],
      },
      {
        userAgent: "Googlebot",
        allow: ["/$", "/ar/$"],
      },
      {
        userAgent: ["Bingbot", "AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: ["/", "/ar/"],
      },
    ],
    sitemap: "https://baiitna.com/sitemap.xml",
  };
}
