import React from "react";
import { Token } from "../store/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { MetricsState } from "../store/reducer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { theme } from "../utils/theme";

/**
 * Props for the SwapConfirmationModal component.
 */
type Props = {
  tokens: Token[]; // Array of token objects with exchange details
  tokenA: string; // Token selected for swapping (from)
  tokenAAmount: string | number; // Amount of token A to swap
  priceA: number; // Price of token A
  tokenB: string; // Token selected for receiving (to)
  exchangedCoin: string; // Amount of token B received after the swap
  exchangeValue: string; // USD equivalent of the exchanged coin
  metrics: MetricsState; // Metrics state containing slippage and fees
  transactionLoading: boolean; // Loading state for the transaction
  transactionStatus: string; // Status of the transaction ('success', 'failed', or '')
  handleModalClose: () => void; // Function to close the modal
  startTransaction: () => void; // Function to initiate the transaction
};

/**
 * SwapConfirmationModal displays transaction details for user confirmation.
 * @param {Props} props - Component props
 * @returns JSX.Element
 */
function SwapConfirmationModal({
  tokens,
  tokenA,
  tokenAAmount,
  priceA,
  tokenB,
  exchangedCoin,
  exchangeValue,
  metrics,
  transactionLoading,
  transactionStatus,
  handleModalClose,
  startTransaction,
}: Props) {
  // Extract token names
  const tokenAName = tokens.find((tok) => tok.exchange === tokenA)?.name || "Unknown";
  const tokenBName = tokens.find((tok) => tok.exchange === tokenB)?.name || "Unknown";

  const mode = useSelector((state: RootState) => state.mode.mode);

  // Current theme
  const th = theme(mode);

  // Calculate total amount including slippage and fees
  const totalAmount = (
    Number(exchangeValue) *
    (1 + metrics.slippage) *
    (1 + metrics.fees)
  ).toFixed(4);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Modal Title */}
      <h2 style={{color: th.font}} className="text-lg font-bold mr-auto">Are you sure,</h2>
      <p  style={{color: th.font}} className="mr-auto">you want to make this transaction?</p>

      {/* From Token Details */}
      <div className="flex items-start justify-around py-5 rounded-md shadow-md mt-8 w-full" style={{backgroundColor: th.secondary, color: th.font}}>
        <span className="text-base">From</span>
        <span className="text-base">{tokenAName}</span>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-500">Amount</span>
          <span className="text-base">{tokenAAmount}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-500">Value</span>
          <span className="text-base">${(priceA).toFixed(2)}</span>
        </div>
      </div>

      {/* Retweet Icon */}
      <div className="flex w-fit items-center justify-center p-4 rounded-full relative bottom-4 border-4 z-[1]" style={{backgroundColor: th.secondary, color: th.font, borderColor: th.primary}}>
        <FontAwesomeIcon icon={faRetweet} />
      </div>

      {/* To Token Details */}
      <div className="flex items-start justify-around py-5 rounded-md shadow-md w-full relative bottom-8" style={{backgroundColor: th.secondary, color: th.font}}>
        <span className="text-base">To</span>
        <span className="text-base">{tokenBName}</span>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-500">Amount</span>
          <span className="text-base">{Number(exchangedCoin).toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-500">Value</span>
          <span className="text-base">${Number(exchangeValue).toFixed(2)}</span>
        </div>
      </div>

      {/* Metrics and Fees */}
      <div className="flex flex-col gap-1 items-start justify-around p-5 rounded-md shadow-md w-full" style={{backgroundColor: th.secondary, color: th.font}}>
        <div className="flex justify-between w-full">
          <span>Slippage</span>
          <span className="text-slate-500">{metrics.slippage}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Fees</span>
          <span className="text-slate-500">{metrics.fees}</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Total Amount</span>
          <span className="text-slate-500">${totalAmount}</span>
        </div>
      </div>

      {/* Transaction Status */}
      {transactionLoading || transactionStatus ? (
        <div className="flex w-full justify-center mt-5">
          <span
            className={`${
              transactionStatus === "success"
                ? "text-green-500"
                : transactionStatus === "failed"
                ? "text-red-500"
                : "text-blue-500"
            } text-lg font-bold`}
          >
            {transactionStatus}
          </span>
        </div>
      ) : null}

      {/* Action Buttons */}
      {!transactionLoading && (
        <div className="flex w-full justify-around mt-5">
          {transactionStatus !== "success" && (
            <button
              onClick={startTransaction}
              className={`w-2/5 py-2 ${
                transactionStatus === "failed" ? "bg-blue-500" : "bg-green-500"
              } text-white rounded-md outline-none`}
            >
              {transactionStatus === "failed" ? "Retry" : "Confirm"} Swap
            </button>
          )}
          <button
            onClick={handleModalClose}
            className="w-2/5 py-2 bg-red-500 text-white rounded-md outline-none"
          >
            {transactionStatus === "success" ? "Close" : "Cancel"}
          </button>
        </div>
      )}
    </div>
  );
}

export default SwapConfirmationModal;
