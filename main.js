import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

export default function CryptoClicker() {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.BrowserProvider(window.ethereum));
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return alert("Install MetaMask!");
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  const mintNFT = async () => {
    if (!account) return alert("Connect your wallet first!");
    if (count < 10) return alert("You need at least 10 clicks to mint an NFT!");
    
    // Placeholder for smart contract interaction
    alert("Minting NFT... (functionality to be added)");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">CryptoClicker</h1>
      <p className="mb-4">Click the button, earn points, and mint NFTs!</p>
      <Button onClick={handleClick} className="mb-4">Click Me! ({count})</Button>
      <Button onClick={mintNFT} className="mb-4" disabled={count < 10}>
        Mint NFT ({count}/10)
      </Button>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </div>
  );
}
