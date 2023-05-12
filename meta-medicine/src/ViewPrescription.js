import { useState } from "react";
import "./ViewPrescription.css";

function ViewPrescription({ contract }) {
  const [prescriptionCode, setPrescriptionCode] = useState();
  const [doctorAddress, setDoctorAddress] = useState();
  const [patientAddress, setPatientAddress] = useState();
  const [validUntil, setValidUntil] = useState();
  const [instructions, setInstructions] = useState();

  const onViewPrescriptionClicked = async () => {
    let rs = await contract.getPrescription(prescriptionCode);
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(new Date(parseInt(rs[2] * 1000)) - tzoffset)).toISOString().slice(0, -1);

    setDoctorAddress(rs[0]);
    setPatientAddress(rs[1]);
    setValidUntil(localISOTime.slice(0, 16));
    setInstructions(rs[3]);
    alert(rs);
  };

  return (
    <div className="container">
      <div>
        <h1>View Prescription</h1>
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
        <button onClick={onViewPrescriptionClicked}>View Prescription</button>
      </div>
      <div></div>
      <div>
        <label>Doctor Address</label>
        <input type="text" disabled value={doctorAddress}></input>
      </div>
      <div>
        <label>Patient Address</label>
        <input type="text" disabled value={patientAddress}></input>
      </div>
      <div>
        <label>Valid Until</label>
        <input type="datetime-local" disabled value={validUntil}></input>
      </div>
      <div>
        <label>Instructions</label>
        <textarea disabled value={instructions}></textarea>
      </div>
    </div>
  );
}

export default ViewPrescription;
