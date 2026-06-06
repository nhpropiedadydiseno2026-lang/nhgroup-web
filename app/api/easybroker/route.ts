// Proxy server-side hacia EasyBroker (evita CORS y oculta la API key)
const EB_KEY = process.env.EB_API_KEY || "gem675r3cevjvc3ocim1uu1gd1jbu0";
const EB_URL = "https://api.easybroker.com/v1";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";

  try {
    const r = await fetch(`${EB_URL}/properties?limit=${limit}&page=${page}&search[statuses][]=published`, {
      headers: {
        "X-Authorization": EB_KEY,
        "Accept": "application/json",
      },
      next: { revalidate: 600 },
    });
    const data = await r.json();
    return Response.json(data, { status: r.status });
  } catch (e: any) {
    return Response.json({ error: "Error conectando con EasyBroker: " + e.message }, { status: 500 });
  }
}
