const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function auditPage(url) {
  const response = await fetch(`${API_URL}/api/audit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}