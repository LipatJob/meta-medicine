import { useState } from "react";
import "./Doctor.css";

function Doctor({ contract }) {
  const [patientAddress, setPatientAddress] = useState();
  const [validUntil, setValidUntil] = useState();
  const [instructions, setInstructions] = useState();
  const [prescriptionCode, setPrescriptionCode] = useState();


  const onPrescribeClicked = async  () =>  {
    let tx = await contract.prescribeMedicine(patientAddress, instructions, Math.floor(new Date(validUntil).getTime() / 1000));
    let rc = await tx.wait();
    setPrescriptionCode(rc.events.find(event => event.event === 'medicinePrescribed').args[0]);
  };

  return (
    <div className="container">
      <div>
        <h1>Create Prescription</h1>
      </div>
      <div>
        <label>Patient Address</label>
        <input
          type="text"
          required
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Valid Until</label>
        <input
          type="datetime-local"
          required
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Instructions</label>
        <textarea
          required
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button onClick={onPrescribeClicked}>Prescribe</button>
      </div>
      <div>
        <h4>Prescription Code</h4>
        {prescriptionCode}
      </div>
    </div>
  );
}

export default Doctor;
