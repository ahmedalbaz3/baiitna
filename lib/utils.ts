// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export const getDeviceType = (): "IOS" | "Android" | "DESKTOP" => {
  if (typeof window === "undefined") return "DESKTOP"; // Fallback for SSR

  const ua = window.navigator.userAgent.toLowerCase();

  // Check for Android
  if (ua.includes("android")) {
    return "Android";
  }

  // Check for iOS (iPhone, iPad, iPod)
  // Note: Modern iPads sometimes report as "MacIntel", so we check for touch points
  if (
    /iphone|ipad|ipod/.test(ua) ||
    (ua.includes("mac") && navigator.maxTouchPoints > 1)
  ) {
    return "IOS";
  }

  // Default to Desktop
  return "DESKTOP";
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // .padStart(2, '0') ensures "5" becomes "05"
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
