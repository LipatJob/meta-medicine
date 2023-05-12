import { useState } from "react";
import "./ViewPrescription.css";

function Verify({ contract }) {
  const [prescriptionCode, setPrescriptionCode] = useState();
  const [isVerified, setIsVerified] = useState(null);

  const onVerifyClicked = async () => {
    setIsVerified(await contract.verifyPrescription(prescriptionCode));
  };

  return (
    <div className="container">
      <div>
        <h1>Verify Prescription</h1>
      </div>
      <div>
        <label>Prescription Code</label>
        <input
          type="text"
          required
          value={prescriptionCode}
          onChange={(e) => setPrescriptionCode(e.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={onVerifyClicked}>View Prescription</button>
      </div>
      <div>
        {isVerified !== null &&
          (isVerified
            ? "Verified. This is the prescription of the wallet holder"
            : "Unverified: This is NOT the prescription of the wallet holder")}
      </div>
    </div>
  );
}

export default Verify;
