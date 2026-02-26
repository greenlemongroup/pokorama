const CDN_BASE_URL = "https://cdn.pokorama.com";
const CATALOG_PATH = "catalog.json";

type CatalogLinks = Record<string, string>;
type CatalogResponse = { links?: CatalogLinks };

const getFirstMatchingLink = (links: CatalogLinks, requiredTerms: string[]) => {
  return Object.entries(links).find(([key]) => {
    const lowerKey = key.toLowerCase();
    return requiredTerms.every((term) => lowerKey.includes(term));
  })?.[1];
};

export const getCatalogUrl = () => `${CDN_BASE_URL}/${CATALOG_PATH}`;

export const resolveBackgroundImageUrl = (tier: "low" | "mid" | "high") =>
  `${CDN_BASE_URL}/${tier}/raster/splash_screens/splash_01.webp`;

export const fetchStoreLinks = async () => {
  const response = await fetch(getCatalogUrl());
  if (!response.ok) {
    throw new Error(`Catalog request failed with status ${response.status}`);
  }

  const json = (await response.json()) as CatalogResponse;
  const links = json.links ?? {};

  const ios =
    links.completeAppIos ??
    links.completeAppIOS ??
    getFirstMatchingLink(links, ["completeapp", "ios"]);

  const android =
    links.completeAppAndroid ??
    getFirstMatchingLink(links, ["completeapp", "android"]);

  return { ios, android };
};
