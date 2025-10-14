const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;

  return "http://localhost:3000/api";
};

export const apiUrl = (path: string) => `${getBaseUrl()}${path}`;
