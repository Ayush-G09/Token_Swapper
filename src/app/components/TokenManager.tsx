import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { RootState } from "../store/store";
import { theme } from "../utils/theme";
import TokenCard from "./TokenCard";
import { addToken, setLoading } from "../store/action";

type Coin = {
  symbol: string;
  name: string;
};

/**
 * TokenManager Component
 * Allows users to add and manage tokens by fetching their metadata from the CoinGecko API.
 */
const TokenManager = () => {
  // Redux selectors and dispatcher
  const mode = useSelector((state: RootState) => state.mode.mode);
  const tokens = useSelector((state: RootState) => state.token.tokens);
  const loading = useSelector((state: RootState) => state.token.loading);
  const dispatch = useDispatch();

  // Current theme
  const th = theme(mode);

  // Local state for input
  const [newToken, setNewToken] = useState<string>("");

  /**
   * Fetch token metadata from CoinGecko API.
   * @param tokenId - The name of the token to fetch metadata for.
   * @returns Token metadata if valid, otherwise null.
   */
  const fetchTokenMetadata = async (tokenId: string) => {
    dispatch(setLoading(true));
    try {
      const url = "https://api.coingecko.com/api/v3/coins/list";
      const response = await axios.get(url);

      // Check if token name exists in the fetched data
      const isValid = response.data.some(
        (coin: Coin) => coin.name.toLowerCase() === tokenId.toLowerCase()
      );
      if (isValid) {
        const coin = response.data.find(
          (tok: Coin) => tok.name.toLowerCase() === tokenId.toLowerCase()
        ) as Coin;
        return {
          id: coin.symbol,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: 0, // Placeholder price
          exchange: `${coin.symbol}usdt`, // Generate exchange pair
        };
      }

      // Alert if token is invalid
      alert("It is not a valid name.");
    } catch (error) {
      console.log("Error fetching token metadata:", error);
    } finally {
      dispatch(setLoading(false));
    }
    return null;
  };

  /**
   * Handle adding a new token.
   * Validates input and adds token metadata to the store if valid.
   */
  const handleAddToken = async () => {
    if (!newToken.trim()) {
      alert("Please enter a token name.");
      return;
    }

    // Check if token already exists
    if (tokens.find((tok) => tok.name.toLowerCase() === newToken.toLowerCase())) {
      alert("This token already exists.");
      setNewToken("");
      return;
    }

    // Fetch token metadata
    const tokenMetadata = await fetchTokenMetadata(newToken.toLowerCase());
    if (tokenMetadata) {
      dispatch(addToken(tokenMetadata));
    } else {
      console.log("Invalid token or metadata not found.");
    }

    setNewToken(""); // Reset input
  };

  return (
    <div className="flex items-center justify-center p-4 w-full mt-2">
      <div className="flex flex-col box-border py-2 px-4 w-full rounded-md shadow-lg pb-4" style={{backgroundColor: th.secondary}}>
        <h3 className="text-xl mb-4 font-bold" style={{ color: th.font }}>
          Tokens
        </h3>

        {/* Input for new token */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newToken}
            onChange={(e) => setNewToken(e.target.value)}
            placeholder="e.g. Ethereum"
            className="p-2 rounded-s-md w-3/5 outline-none"
            style={{backgroundColor: th.tertiary, color: th.font}}
          />
          <button
            onClick={handleAddToken}
            className="p-2 rounded-e-md font-bold"
            style={{
              backgroundColor: th.blue,
              color: mode === 'light' ? 'white' : 'black',
            }}
          >
            Add Token
          </button>
        </div>

        {/* Loading indicator */}
        {loading && <p>Loading token metadata...</p>}

        {/* Display tokens as cards */}
        <div className="grid grid-cols-[repeat(auto-fit,_100px)] gap-4">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenManager;
