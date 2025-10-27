import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetUrl(name?: string | null): string {
  if (!name || name.trim() === "") return "";
  // If already an absolute URL, return as-is
  if (/^https?:\/\//i.test(name)) return name;

  const assetBase = (import.meta as any).env?.VITE_ASSET_BASE_URL as
    | string
    | undefined;
  const apiBase = (import.meta as any).env?.VITE_API_BASE_URL as
    | string
    | undefined;

  // Derive origin: prefer VITE_ASSET_BASE_URL, else strip /api/... from API base
  let origin = assetBase;
  if (!origin && apiBase) {
    try {
      const url = new URL(apiBase);
      origin = `${url.protocol}//${url.host}`;
    } catch {
      // If parsing fails, fallback to current location origin
      origin = typeof window !== "undefined" ? window.location.origin : "";
    }
  }
  // If still no origin, use default backend URL
  if (!origin) {
    origin = "http://localhost:3000";
  }

  // Default to /img path under backend public
  const basePath = name.startsWith("/") ? name : `/img/${name}`;
  return origin ? `${origin}${basePath}` : basePath;
}
