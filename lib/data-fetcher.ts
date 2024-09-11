const API_BASE_URL = "https://api.leen.dev/v1";

export async function fetchData(
  endpoint: string,
  apiKey: string,
  connectionId: string,
  filters: Record<string, any> = {} // Optional filters (default empty object)
) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
    "X-CONNECTION-ID": connectionId,
  });

  const response = await fetch(`${API_BASE_URL}${endpoint}?limit=500`, {
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch data");
  }

  const data = await response.json();

  const filteredItems = data.items.filter((item: any) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null) return true; // Ignore empty filters
      if (Array.isArray(item[key])) {
        return item[key].includes(value);
      }
      return item[key] === value;
    });
  });

  return {
    count: filteredItems.length,
    total: data.total,
    filters: filters,
    items: filteredItems,
  };
}
