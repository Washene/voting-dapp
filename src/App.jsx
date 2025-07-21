import React, { useEffect, useState } from "react";
import { getContract } from "./contract";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        // Request wallet connection
        const [selectedAccount] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(selectedAccount);

        // Connect to the contract
        const contractInstance = getContract();
        setContract(contractInstance);
      } catch (err) {
        console.error("Error connecting to contract:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Voting dApp</h1>
      {account && <p className="mb-2">Wallet: {account}</p>}
      {loading ? (
        <p>Loading contract...</p>
      ) : contract ? (
        <p>✅ Contract connected successfully!</p>
      ) : (
        <p>❌ Failed to connect to contract.</p>
      )}
    </div>
  );
}

export default App;
