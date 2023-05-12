import { useState } from "react";
import Doctor from "./Doctor";
import ViewPrescription from "./ViewPrescription";
import { ethers } from "ethers";
import metaMedicineAbi from "./contracts/meta-medicine-abi.json";
import metaMedicineAddress from "./contracts/meta-medicine-address.json";
import Verify from "./Verifier";

function App() {
  const DOCTOR_STATE = "DOCTOR";
  const VIEW_STATE = "VIEW";
  const VERIFY_STATE = "VERIFY";
  const [state, setState] = useState(DOCTOR_STATE);
  const [walletConnected, setWeb3Connected] = useState(false);

  let contractAddress = metaMedicineAddress.address;

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    console.log("Connecting");
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setWeb3Connected(true);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      alert("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setAccount(newAccount);
    updateEthers();
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);
  window.ethereum.on("chainChanged", chainChangedHandler);
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

    let tempContract = new ethers.Contract(
      contractAddress,
      metaMedicineAbi,
      tempSigner
    );
    setContract(tempContract);
  };

  return (
    <>
      {walletConnected ? (
        <>
          <button onClick={() => setState(DOCTOR_STATE)}>Doctor</button>
          <button onClick={() => setState(VIEW_STATE)}>View</button>
          <button onClick={() => setState(VERIFY_STATE)}>Verify</button>

          {state === DOCTOR_STATE && (<Doctor contract={contract} />)}
          {state === VIEW_STATE && <ViewPrescription contract={contract} />}
          {state === VERIFY_STATE && <Verify contract={contract} />}
        </>
      ) : (
        <>
          <button onClick={connectWalletHandler}>Connect wallet</button>
        </>
      )}
    </>
  );
}

export default App;
