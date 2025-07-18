
export type User = {
  createdAt: number;    // timestamp (milliseconds)
  isPro: boolean;
};

export type TimeRange = "day" | "month" | "year";

export type TransformedData = {
  categories: string[];
  "normal users": number[];
  "pro users": number[];
};

export function transformUserData(users: User[], range: TimeRange): TransformedData {
  function getKeyFromTimestamp(timestamp: number, range: TimeRange): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-indexed
    const day = date.getDate();

    switch (range) {
      case "day":
        return `${year}-${pad(month)}-${pad(day)}`; // VD: 2025-07-16
      case "month":
        return `${year}-${pad(month)}`;             // VD: 2025-07
      case "year":
        return `${year}`;                           // VD: 2025
    }
  }

  function pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  const normalMap = new Map<string, number>();
  const proMap = new Map<string, number>();

  for (const user of users) {
    const key = getKeyFromTimestamp(user.createdAt, range);
    const targetMap = user.isPro ? proMap : normalMap;
    targetMap.set(key, (targetMap.get(key) ?? 0) + 1);
  }

  // Lấy tất cả mốc thời gian đã xuất hiện
  const allKeys = Array.from(new Set([...normalMap.keys(), ...proMap.keys()])).sort();

  return {
    categories: allKeys,
    "normal users": allKeys.map((key) => normalMap.get(key) ?? 0),
    "pro users": allKeys.map((key) => proMap.get(key) ?? 0),
  };
}