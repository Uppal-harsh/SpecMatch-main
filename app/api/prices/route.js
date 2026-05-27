import { NextResponse } from "next/server";

const STORE_DOMAINS = [
  { name: "Amazon", domain: "amazon.in" },
  { name: "Flipkart", domain: "flipkart.com" },
  { name: "Croma", domain: "croma.com" },
  { name: "Reliance Digital", domain: "reliancedigital.in" },
];

function getHostname(value = "") {
  try {
    return new URL(value).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function getStoreForResult(result) {
  const haystack = [
    result.source,
    result.seller,
    result.title,
    getHostname(result.link || result.product_link),
  ].filter(Boolean).join(" ").toLowerCase();

  return STORE_DOMAINS.find((store) => {
    const storeName = store.name.toLowerCase();
    return haystack.includes(store.domain) || haystack.includes(storeName);
  });
}

function parsePrice(result) {
  if (Number.isFinite(result.extracted_price)) return Math.round(result.extracted_price);

  const rawPrice = result.price || result.extracted_price || "";
  const numericPrice = Number(String(rawPrice).replace(/[^0-9.]/g, ""));

  return Number.isFinite(numericPrice) ? Math.round(numericPrice) : null;
}

function normalizeShoppingResult(result) {
  const store = getStoreForResult(result);
  const price = parsePrice(result);

  if (!store || !price) return null;

  return {
    name: store.name,
    price,
    rating: Number(result.rating) || 4.2,
    link: result.link || result.product_link || "#",
    title: result.title || "",
  };
}

function dedupeByStore(prices) {
  const bestByStore = new Map();

  for (const priceRow of prices) {
    const existing = bestByStore.get(priceRow.name);
    if (!existing || priceRow.price < existing.price) {
      bestByStore.set(priceRow.name, priceRow);
    }
  }

  return [...bestByStore.values()].sort((a, b) => a.price - b.price);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("query");
  const apiKey = req.headers.get("x-serpapi-key") || process.env.SERPAPI_KEY;

  if (!q) {
    return NextResponse.json({ success: false, error: "Missing query" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ success: false, error: "Missing SerpAPI key" }, { status: 400 });
  }

  const params = new URLSearchParams({
    engine: "google_shopping",
    q,
    gl: "in",
    hl: "en",
    api_key: apiKey,
  });

  try {
    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
      next: { revalidate: 900 },
    });
    const data = await response.json();

    if (!response.ok || data.error) {
      return NextResponse.json(
        { success: false, error: data.error || "SerpAPI request failed" },
        { status: response.status || 502 }
      );
    }

    const prices = dedupeByStore((data.shopping_results || []).map(normalizeShoppingResult).filter(Boolean));

    return NextResponse.json({
      success: true,
      live: prices.length > 0,
      domains: STORE_DOMAINS.map((store) => store.domain),
      prices,
      message: prices.length > 0
        ? `Fetched live prices from ${prices.length} configured store domain${prices.length === 1 ? "" : "s"}.`
        : "SerpAPI returned results, but none matched the configured store domains.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
