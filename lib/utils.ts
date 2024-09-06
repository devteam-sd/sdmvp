import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE_URL = "https://api.leen.dev/v1"; // Replace with your actual API base URL

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // API key from environment variables
  const connectionId = process.env.NEXT_PUBLIC_CONNECTION_ID; // Connection ID from environment variables

  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey ?? "", // API key header
    "X-CONNECTION-ID": connectionId ?? "", // Connection ID header
    ...options.headers, // Spread any additional headers passed in options
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch data");
  }

  return response.json();
}
