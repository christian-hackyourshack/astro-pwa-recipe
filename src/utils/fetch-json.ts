export async function fetchJson(url: string) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    return await response.json();
  } catch (error) {
    return { error };
  }
}
