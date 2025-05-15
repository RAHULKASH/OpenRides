import { BrowserProvider, Contract } from "ethers";
import RideRegistryABI from "../../../smart-contracts/artifacts/contracts/RideRegistory.sol/RideRegistry.json";

const contractAddress = import.meta.env.VITE_SMART_ADDRESS;

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found. Please install it.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ⚠️ Must await this now
  return new Contract(contractAddress, RideRegistryABI.abi, signer);
};




