import { useEffect, useState } from "react";

const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";

const usePrice = (symbol: string) => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const formattedSymbol = `${symbol.toLowerCase()}@ticker`;
    const socket = new WebSocket(BINANCE_WS_URL);

    const subscribePayload = {
      method: "SUBSCRIBE",
      params: [formattedSymbol],
      id: 1,
    };

    // Open WebSocket connection and subscribe to stream
    socket.onopen = () => {
      console.log(`Subscribed to ${symbol.toUpperCase()}`);
      socket.send(JSON.stringify(subscribePayload));
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.e === "24hrTicker" && message.s.toLowerCase() === symbol.toLowerCase()) {
        setPrice(message.c); // Set the current price
      }
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, [symbol]);

  return price;
};

export default usePrice;
