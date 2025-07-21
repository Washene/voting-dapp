// src/hooks/useContract.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../contract";

export const useContract = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          const signerAddress = await signer.getAddress();

          setAccount(signerAddress);
          setContract(contractInstance);
        } catch (err) {
          console.error("Error connecting:", err);
        }
      } else {
        alert("Please install MetaMask to use this dApp.");
      }
    };

    loadContract();
  }, []);

  return { contract, account };
};
