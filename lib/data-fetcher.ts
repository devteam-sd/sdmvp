const API_BASE_URL = "https://api.leen.dev/v1";

export async function fetchData(
  endpoint: string,
  apiKey: string,
  connectionId: string
) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
    "X-CONNECTION-ID": connectionId,
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch data");
  }

  return response.json();
}
