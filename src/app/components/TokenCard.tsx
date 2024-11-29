import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { theme } from "../utils/theme";
import usePrice from "../hooks/usePrice";

type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  exchange: string;
};

type Props = {
  token: Token;
};

/**
 * TokenCard Component
 * Displays information about a token, including its name, symbol, and live price.
 *
 * @param {Props} props - Component properties containing token details.
 * @returns {JSX.Element} A styled card with token details.
 */
function TokenCard({ token }: Props): JSX.Element {
  // Retrieve the current mode (light/dark) from the Redux store
  const mode = useSelector((state: RootState) => state.mode.mode);

  // Get theme settings based on the mode
  const th = theme(mode);

  // Fetch the live price of the token
  const price = usePrice(token.exchange);

  return (
    <div
      key={token.id}
      style={{
        backgroundColor: th.tertiary,
      }}
      className="w-27 rounded-md box-border shadow-lg py-2 px-3 flex flex-col items-center"
    >
      {/* Token name */}
      <span className="font-bold" style={{ color: th.font }}>
        {token.name}
      </span>

      {/* Token symbol badge */}
      <div className="h-7 flex items-center justify-center mt-2">
        <div
          style={{
            backgroundColor: th.blue,
            color: mode === "light" ? "white" : "black",
          }}
          className="font-semibold px-2 rounded-lg text-xs"
        >
          {token.symbol}
        </div>
      </div>

      {/* Live price */}
      <span
        style={{
          color: mode === "dark" ? "#d1d5db" : "#1f2937",
        }}
        className="mt-2 text-sm"
      >
        ${Number(price).toFixed(2)}
      </span>
    </div>
  );
}

export default TokenCard;
