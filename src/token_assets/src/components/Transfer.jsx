import React from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Transfer() {

  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);

  async function handleClick() {
    setIsHidden(true);
    setIsDisabled(true);
    const recipientId = Principal.fromText(recipient);
    const amountToTransfer = Number(amount);
    const result = await token.transfer(recipientId, amountToTransfer);
    setFeedback(result);
    setIsHidden(false);
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button
            id="btn-transfer"
            onClick={handleClick}
            disabled={isDisabled}
          >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
