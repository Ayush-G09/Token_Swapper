import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setLoadingOrderBook } from "../store/action";
import { theme } from "../utils/theme";
import { useEffect, useState } from "react";

type Order = {
  price: number;
  amount: number;
  side: "buy" | "sell";
};

/**
 * OrderBook Component
 * Displays the top 5 bids and asks for the selected token using live data from Binance WebSocket.
 *
 * Features:
 * - WebSocket connection to fetch live order book data.
 * - Dynamic theme-based styling (light/dark mode).
 * - Select dropdown to switch between tokens.
 * - Real-time updates for bid and ask tables.
 *
 * @returns {JSX.Element} The OrderBook component.
 */
const OrderBook = (): JSX.Element => {
  const dispatch = useDispatch();

  // Redux state selectors
  const tokens = useSelector((state: RootState) => state.token.tokens);
  const orderBookLoading = useSelector(
    (state: RootState) => state.loading.orderBookLoading
  );
  const mode = useSelector((state: RootState) => state.mode.mode);

  // Theme settings based on mode
  const th = theme(mode);

  // Local state for order book and selected token
  const [orderBook, setOrderBook] = useState<{ bid: Order[]; ask: Order[] }>({
    bid: [],
    ask: [],
  });
  const [selectedToken, setSelectedToken] = useState<string>(tokens[0]?.exchange || "");

  useEffect(() => {
    // Update loading state and set up WebSocket connection
    dispatch(setLoadingOrderBook(true));

    const wsUrl = `wss://stream.binance.com:9443/ws/${selectedToken.toLowerCase()}@depth`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Process bids and asks data
        const updatedBids = (data.b || []).slice(0, 5).map(([price, amount]: [string, string]) => ({
          price: parseFloat(price),
          amount: parseFloat(amount),
          side: "buy",
        }));

        const updatedAsks = (data.a || []).slice(0, 5).map(([price, amount]: [string, string]) => ({
          price: parseFloat(price),
          amount: parseFloat(amount),
          side: "sell",
        }));

        setOrderBook({ bid: updatedBids, ask: updatedAsks });
        dispatch(setLoadingOrderBook(false));
      } catch (error) {
        console.log("Error processing WebSocket message:", error);
        dispatch(setLoadingOrderBook(false));
      }
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
      dispatch(setLoadingOrderBook(false));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [selectedToken, dispatch]);

  return (
    <div className="box-border flex items-center justify-center p-4 w-full mt-2">
      <div className="flex flex-col box-border py-2 px-4 w-full rounded-md shadow-lg pb-4" style={{backgroundColor: th.secondary}}>
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold" style={{ color: th.font }}>
            Order Book
          </h3>
          <select
            value={selectedToken}
            id="book"
            className="p-2 rounded-md min-w-24 ml-auto outline-none"
            style={{backgroundColor: th.blue, color: mode === 'light' ? 'white' : 'black'}}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            {tokens.map((token) => (
              <option value={token.exchange} key={token.id}>
                {token.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Indicator */}
        {orderBookLoading && <p>Loading order book...</p>}

        {/* Order Book Tables */}
        <div className="order-book-table flex gap-5 pt-6 flex-col md:flex-row">
          {/* Bid Table */}
          <OrderTable
            title="Top 5 Bids"
            orders={orderBook.bid}
            rowColor="text-green-600"
            bgColor={th.tertiary}
            th={th}
          />

          {/* Ask Table */}
          <OrderTable
            title="Top 5 Asks"
            orders={orderBook.ask}
            rowColor="text-red-600"
            bgColor={th.tertiary}
            th={th}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * OrderTable Component
 * Renders a table for bid or ask orders.
 *
 * @param {Object} props - Table properties.
 * @param {string} props.title - Title of the table (e.g., "Top 5 Bids").
 * @param {Order[]} props.orders - Array of orders to display in the table.
 * @param {string} props.rowColor - Color class for table rows.
 * @param {string} props.bgColor - Background color for table rows.
 * @param {Object} props.th - Theme object for dynamic styles.
 *
 * @returns {JSX.Element} The OrderTable component.
 */
const OrderTable = ({
  title,
  orders,
  rowColor,
  bgColor,
  th,
}: {
  title: string;
  orders: Order[];
  rowColor: string;
  bgColor: string;
  th: {
    primary: string; font: string 
};
}): JSX.Element => (
  <div className="order-book-section w-full md:w-1/2">
    <h4 className="mb-2" style={{ color: th.font }}>
      {title}
    </h4>
    <table className="border-collapse w-full shadow-lg">
      <thead>
        <tr style={{ backgroundColor: bgColor }}>
          <th className="border p-2" style={{ color: th.font, borderColor: th.primary }}>
            Price
          </th>
          <th className="border p-2" style={{ color: th.font, borderColor: th.primary }}>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className={rowColor} style={{ backgroundColor: bgColor }}>
            <td className="border p-2" style={{borderColor: th.primary}}>{order.price}</td>
            <td className="border p-2" style={{borderColor: th.primary}}>{order.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderBook;
