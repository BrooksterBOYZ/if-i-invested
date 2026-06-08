"use client";

import { useState } from "react";

export default function Home() {

  const [amount, setAmount] = useState(1000);
  const [stock, setStock] = useState("AAPL");
  const [result, setResult] = useState(null);

  async function calculate() {

    const res = await fetch("/api/stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbol: stock })
    });

    const data = await res.json();

    const buyPrice = data.buyPrice;
    const currentPrice = data.currentPrice;

    const shares = amount / buyPrice;
    const currentValue = shares * currentPrice;
    const profit = currentValue - amount;
    const returnPercent = (profit / amount) * 100;

    setResult({
      stock,
      buyPrice,
      currentPrice,
      shares,
      currentValue,
      profit,
      returnPercent
    });
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>

      <h1>📈 If I Invested</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />

      <select
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      >
        <option value="AAPL">AAPL</option>
        <option value="MSFT">MSFT</option>
        <option value="NVDA">NVDA</option>
        <option value="TSLA">TSLA</option>
      </select>

      <button onClick={calculate}>
        Calculate
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>

          <h2>{result.stock}</h2>

          <p>Buy Price: ${result.buyPrice.toFixed(2)}</p>
          <p>Current Price: ${result.currentPrice.toFixed(2)}</p>

          <p>Shares: {result.shares.toFixed(4)}</p>

          <p>Current Value: ${result.currentValue.toFixed(2)}</p>

          <p>Profit: ${result.profit.toFixed(2)}</p>

          <p>Return: {result.returnPercent.toFixed(2)}%</p>

        </div>
      )}

    </main>
  );
}
