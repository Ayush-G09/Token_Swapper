"use client";

import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ReduxProvider from "./store/provider";
import { theme } from "./utils/theme";
import WalletConnect from "./components/WalletConnect";
import TokenManager from "./components/TokenManager";
import Header from "./components/Header";
import OrderBook from "./components/OrderBook";
import RealTimeMetrics from "./components/RealTimeMetrics";
import TokenSwap from "./components/TokenSwap";
import DisconnectedBanner from "./components/DisconnectedBanner";

/**
 * HomeContent Component
 *
 * This component manages the main layout and conditional rendering of UI components based on
 * the wallet connection status. If the wallet is connected, various components related
 * to token management and trading will be displayed. Otherwise, a banner informing
 * the user of the disconnection will be shown.
 */
const HomeContent = () => {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const { walletAddress } = useSelector((state: RootState) => state.wallet);

  // Apply theme based on the mode (light/dark)
  const th = theme(mode);

  return (
    <div
      className="w-screen h-screen box-border transition-all duration-500 overflow-x-hidden scrollbar-hide"
      style={{ backgroundColor: th.primary, scrollbarWidth: "none" }}
    >
      {/* Header Component */}
      <Header />

      {/* Wallet Connection Component */}
      <WalletConnect />

      {/* Conditional rendering based on wallet connection */}
      {walletAddress ? (
        // Render trading and management components if wallet is connected
        <>
          <TokenManager />
          <OrderBook />
          <div className="flex flex-col lg:flex-row-reverse items-start">
            <RealTimeMetrics />
            <TokenSwap />
          </div>
        </>
      ) : (
        // Render disconnected banner if wallet is not connected
        <DisconnectedBanner />
      )}
    </div>
  );
};

/**
 * HomePage Component
 *
 * This is the main entry point for the HomePage, where the Redux provider is wrapped around
 * the HomeContent to ensure that the Redux store is available to all nested components.
 */
export default function HomePage() {
  return (
    <ReduxProvider>
      <HomeContent />
    </ReduxProvider>
  );
}
