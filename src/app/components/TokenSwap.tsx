"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import usePrice from "../hooks/usePrice";
import ExchangeCard from "./ExchangeCard";
import Modal from "./Modal";
import SwapConfirmationModal from "./SwapConfirmationModal";
import { theme } from "../utils/theme";

/**
 * TokenSwap Component
 * Handles token swapping, including user input, exchange calculations, and transaction status updates.
 */
function TokenSwap() {
  // Redux state selectors
  const tokens = useSelector((state: RootState) => state.token.tokens);
  const metrics = useSelector((state: RootState) => state.metrics);
  const tokenAAmount = useSelector(
    (state: RootState) => state.exchangeCard.amounts["tokenA"]
  );
  const mode = useSelector((state: RootState) => state.mode.mode);

  // Current theme
  const th = theme(mode);

  // Local component state
  const [tokenA, setTokenA] = useState<string>("");
  const [tokenB, setTokenB] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");

  // Derived values for prices and exchange rates
  const priceA = Number(usePrice(tokenA));
  const priceB = Number(usePrice(tokenB));
  const exchangeRate =
    tokenA && tokenB
      ? `1 ${tokenA} = ${(priceA / priceB).toFixed(4)} ${tokenB}`
      : "0";

  // Exchange calculations
  const exchangedCoin = priceA && priceB ? (Number(tokenAAmount) * priceA / priceB).toFixed(4) : "0";
  const exchangeValue = (Number(exchangedCoin) * priceB).toFixed(4);

  // Check if the swap is enabled
  const swapEnable = !!tokenA && !!tokenB && Number(tokenAAmount) > 0;

  /**
   * Handles the start of the token swap transaction.
   * Simulates transaction steps with status updates.
   */
  const startTransaction = () => {
    setTransactionLoading(true);
    setTransactionStatus("Starting transaction...");

    setTimeout(() => setTransactionStatus("Exchanging tokens..."), 1500);
    setTimeout(() => setTransactionStatus("Confirming exchange..."), 3000);

    // Finalize transaction with success or failure
    setTimeout(() => {
      const isSuccess = Math.random() > 0.4;
      setTransactionStatus(isSuccess ? "success" : "failed");
      setTransactionLoading(false);
    }, 4000);
  };

  /**
   * Handles closing of the confirmation modal.
   * Prevents closure during an active transaction.
   */
  const handleModalClose = () => {
    if (!transactionLoading) {
      setModalOpen(false);
      setTransactionStatus("");
    }
  };

  return (
    <div className="p-4 flex box-border gap-4 w-full lg:w-1/2">
      {/* Token Swap Card */}
      <div className="p-4 flex rounded-md flex-col shadow-lg items-center w-full" style={{backgroundColor: th.secondary}}>
        <span className="text-xl font-bold mb-4 mr-auto" style={{color: th.font}}>Swap</span>

        {/* Token A Input */}
        <ExchangeCard
          change={setTokenA}
          tokenValue={tokenA}
          tokens={tokens}
          otherToken={tokenB}
          id="tokenA"
        />

        {/* Swap Icon */}
        <div style={{backgroundColor: th.tertiary, borderColor: th.secondary}} className="w-10 h-10 rounded-full border-4 flex items-center justify-center relative z-[1] bottom-2">
          <FontAwesomeIcon icon={faRetweet} />
        </div>

        {/* Token B Input */}
        <ExchangeCard
          change={setTokenB}
          tokenValue={tokenB}
          tokens={tokens}
          otherToken={tokenA}
          id="tokenB"
          to
          exchangeValue={exchangeValue}
          exchangedCoin={exchangedCoin}
        />

        {/* Exchange Rate */}
        {tokenA && tokenB && (
          <span style={{color: th.font}} className="text-sm ml-auto">{exchangeRate}</span>
        )}

        {/* Metrics Display */}
        <div className="flex w-full justify-between mt-1 text-sm" style={{color: th.font}}>
          <span >Slippage</span>
          <span >{metrics.slippage}%</span>
        </div>
        <div className="flex w-full justify-between mt-1 text-sm" style={{color: th.font}}>
          <span >Fees</span>
          <span >{metrics.fees}%</span>
        </div>
        <div className="flex w-full justify-between mt-1 text-sm" style={{color: th.font}}>
          <span >Total Amount</span>
          <span >
            ${(
              Number(exchangeValue) *
              (1 + metrics.slippage) *
              (1 + metrics.fees)
            ).toFixed(4)}
          </span>
        </div>

        {/* Swap Button */}
        <button
          disabled={!swapEnable}
          className="py-3 w-full font-bold rounded-md mt-4"
          style={{backgroundColor: th.blue, color: mode === 'light' ? 'white' : 'black'}}
          onClick={() => setModalOpen(true)}
        >
          SWAP
        </button>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} closeModal={handleModalClose}>
        <SwapConfirmationModal
          tokens={tokens}
          tokenA={tokenA}
          tokenAAmount={tokenAAmount}
          priceA={priceA}
          tokenB={tokenB}
          exchangedCoin={exchangedCoin}
          exchangeValue={exchangeValue}
          metrics={metrics}
          transactionLoading={transactionLoading}
          transactionStatus={transactionStatus}
          handleModalClose={handleModalClose}
          startTransaction={startTransaction}
        />
      </Modal>
    </div>
  );
}

export default TokenSwap;
