import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrdersData } from "../../types";

let ws: WebSocket;
window.addEventListener("beforeunload", () => {
  if (ws) {
    ws.close(1001, "user_closed_page");
  }
});

export const webSocketApi = createApi({
  reducerPath: "webSocketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    getOrders: build.query<IOrdersData, string>({
      queryFn: () => ({
        data: { success: false, orders: [], total: 0, totalToday: 0 },
      }),
      async onCacheEntryAdded(
        url,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        ws = new WebSocket(url);

        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          };

          ws.addEventListener("message", listener);
        } catch {}

        await cacheEntryRemoved;
        if (ws) {
          ws.close(1001, "user_closed_page");
        }
      },
    }),
  }),
});

export const { useGetOrdersQuery } = webSocketApi;
