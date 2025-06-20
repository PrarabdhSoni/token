import React from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Faucet() {

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authClientActor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authClientActor.payOut();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
