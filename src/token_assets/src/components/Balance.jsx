import React from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {

  const [inputValue, setInputValue] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    console.log("Balance: ", balance);
    setBalance(balance.toString());
    const symbol = await token.getSymbol();
    setSymbol(symbol);
    setIsHidden(false);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      {isHidden ? null : <p>This account has a balance of {balance} {symbol}.</p>
      }

    </div>
  );
}

export default Balance;
