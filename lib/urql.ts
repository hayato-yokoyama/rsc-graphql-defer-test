import { cacheExchange, createClient, fetchExchange } from "urql";

// urqlクライアント作成
export const urqlClient = () => {
  return createClient({
    url: "https://graphql-pokemon2.vercel.app", // エンドポイント
    exchanges: [cacheExchange, fetchExchange], // キャッシュ、フェッチのためのなにか
  });
};
