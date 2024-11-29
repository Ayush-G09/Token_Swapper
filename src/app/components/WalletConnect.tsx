import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { theme } from "../utils/theme";
import { setBalance, setWalletAddress } from "../store/actionTypes";

/**
 * WalletConnect Component for connecting and displaying the wallet address and balance.
 * 
 * This component allows users to connect their MetaMask wallet, fetch the connected wallet's address
 * and balance, and display them on the interface.
 */
const WalletConnect = () => {
  const dispatch = useDispatch();
  const { walletAddress, balance } = useSelector((state: RootState) => state.wallet);
  const mode = useSelector((state: RootState) => state.mode.mode);

  // Get theme for styling
  const th = theme(mode);

  /**
   * Connects the wallet using MetaMask (or any compatible Ethereum provider).
   * It requests the user's MetaMask accounts and fetches the wallet balance.
   */
  const connectWallet = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        // Initialize the provider using the MetaMask Ethereum provider
        const provider = new ethers.BrowserProvider(window.ethereum);
  
        // Request the user's MetaMask accounts
        await window.ethereum.request({ method: "eth_requestAccounts" });
  
        // Get the signer and fetch the wallet address
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
  
        dispatch(setWalletAddress(address)); // Store wallet address in Redux
        fetchBalance(address, provider); // Fetch and store the wallet balance
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error: any) {
      // Handle wallet connection errors
      if (error.code === -32002) {
        alert("A wallet connection request is already pending. Please check MetaMask.");
      } else {
        console.error("Wallet connection failed:", error);
      }
    }
  };

  /**
   * Fetches the balance of the wallet address.
   * @param address - The Ethereum wallet address to fetch the balance for.
   * @param provider - The Ethereum provider instance to interact with the blockchain.
   */
  const fetchBalance = async (address: string, provider: ethers.BrowserProvider) => {
    try {
      const balance = await provider.getBalance(address);
      dispatch(setBalance(ethers.formatEther(balance))); // Convert to Ether and store in Redux
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return (
    <div className="w-full py-2 px-4 box-border">
      <div className="flex w-full">
        {/* Connect Wallet Button */}
        {!walletAddress && (
          <button
            className="p-2 rounded-md shadow-md"
            style={{ backgroundColor: th.blue, color: mode === "light" ? "white" : "black" }}
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        {/* Wallet Connection Status */}
        <div className="flex items-center justify-end gap-2 ml-auto p-2">
          <span className="text-base text-gray-500">
            {walletAddress ? "Connected" : "Disconnected"}
          </span>
          <div
            className={`w-3 h-3 rounded-full shadow-md ${walletAddress ? "bg-lime-500" : "bg-red-500"}`}
          />
        </div>
      </div>

      {/* Wallet Info (Address & Balance) */}
      {walletAddress && (
        <div className="flex flex-col md:flex-row w-full mt-5 p-4 rounded-md shadow-md md:gap-16 gap-6" style={{backgroundColor: th.secondary}}>
          <div className="flex flex-col w-full md:w-fit">
            <p className="text-gray-500 text-sm">Wallet Address</p>
            <p className="break-all" style={{ color: th.font }}>{walletAddress}</p>
          </div>
          <div className="flex flex-col w-full md:w-fit">
            <p className="text-gray-500 text-sm">Balance</p>
            <p className="text-sm" style={{ color: th.font }}>{balance} ETH</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
