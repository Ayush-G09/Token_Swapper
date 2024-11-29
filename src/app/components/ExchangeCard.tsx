import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setAmount } from "../store/action";
import { Token } from "../store/state";
import usePrice from "../hooks/usePrice";
import { theme } from "../utils/theme";

type Props = {
  /**
   * A function to update the token selected by the user (either token A or token B)
   */
  change: (e: string) => void;
  
  /**
   * The currently selected token value (either token A or token B)
   */
  tokenValue: string;
  
  /**
   * List of available tokens to display in the dropdown
   */
  tokens: Token[];
  
  /**
   * The other token selected by the user (to avoid selecting the same token for both sides)
   */
  otherToken: string;
  
  /**
   * The unique id for this exchange card (used for Redux state management)
   */
  id: string;
  
  /**
   * A flag indicating if the card is the destination exchange (for styling and behavior purposes)
   * @default false
   */
  to?: boolean;
  
  /**
   * The value to display in the exchange input (for the destination card)
   * @default ''
   */
  exchangeValue?: string;
  
  /**
   * The amount of tokens to exchange for the destination card
   * @default ''
   */
  exchangedCoin?: string;
};

function ExchangeCard({
  change,
  tokenValue,
  tokens,
  otherToken,
  id,
  to = false,
  exchangeValue = '',
  exchangedCoin = ''
}: Props) {
  const dispatch = useDispatch();

  // Access the amount specific to this card from Redux state
  const amount = useSelector((state: RootState) => state.exchangeCard.amounts[id] || "");
  const mode = useSelector((state: RootState) => state.mode.mode);

  // Current theme
  const th = theme(mode);

  // Always call the hook; return null or a default value if no token is selected
  const tokenPrice = Number(usePrice(tokenValue)).toFixed(4) || "0.00";

  /**
   * Handler for updating the token amount in the Redux state
   * @param value The amount of the selected token
   */
  const handleAmountChange = (value: string) => {
    dispatch(setAmount(id, value));
  };

  return (
    <div style={{backgroundColor: th.tertiary}} className={`w-full p-3 rounded-md shadow-md ${to ? 'relative bottom-4' : ''}`}>
      <div className="flex">
        {/* Dropdown for selecting a token */}
        <select
          onChange={(e) => change(e.target.value)}
          value={tokenValue}
          id={id}
          className="min-w-28 px-1 py-2 rounded-md outline-none cursor-pointer"
          style={{backgroundColor: th.blue, color: mode === 'light' ? 'white' : 'black'}}
        >
          <option value="" disabled>Select a token</option>
          {tokens.map((token) =>
            token.exchange !== otherToken && (
              <option key={token.id} value={token.exchange}>
                {token.name}
              </option>
            )
          )}
        </select>

        {/* Input field for entering the token amount */}
        <input
          value={to ? exchangedCoin : amount}
          type='number'
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder={to ? "0" : "e.g. 0.1"}
          className="ml-auto px-2 w-[110px] text-right outline-none border-none rounded-md"
          style={{backgroundColor: th.primary, color: th.font}}
          disabled={to}  // Disable the input for the 'to' (destination) card
        />
      </div>

      {/* Display current token value if a token is selected */}
      {tokenValue && (
        <div className="flex mt-3" style={{color: th.font}}>
          <span className="text-sm">
            Current {tokens.find((tok) => tok.exchange === tokenValue)?.name} Value
          </span>
          <span className="ml-auto text-sm">${tokenPrice}</span>
        </div>
      )}

      {/* Display the exchanged value for the 'to' (destination) card */}
      {tokenValue && to && (
        <div className="flex mt-3" style={{color: th.font}}>
          <span className="text-sm">
            Exchanged {tokens.find((tok) => tok.exchange === tokenValue)?.name} Value
          </span>
          <span className="ml-auto text-sm">${exchangeValue}</span>
        </div>
      )}

      {/* Display the amount value for the source card if a token is selected */}
      {amount && !to && tokenValue && (
        <div className="flex mt-3" style={{color: th.font}}>
          <span className="text-sm">
            {amount} {tokens.find((tok) => tok.exchange === tokenValue)?.name} Value
          </span>
          <span className="ml-auto text-sm">
            ${(Number(tokenPrice) * Number(amount)).toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
}

export default ExchangeCard;
