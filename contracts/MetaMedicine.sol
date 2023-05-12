// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract MetaMedicine {
    event medicinePrescribed(bytes32 indexed prescripionHash);

    struct Prescription {
        address doctor;
        address patient;
        uint expirationUnixTimeStamp;
        string instructions;
    }

    mapping(bytes32 => Prescription) public prescriptions;

    function prescribeMedicine(
        address patient,
        string memory instructions,
        uint expirationUnixTimeStamp
    ) public returns (bytes32) {
        Prescription memory prescription = Prescription({
            doctor: msg.sender,
            patient: patient,
            instructions: instructions,
            expirationUnixTimeStamp: expirationUnixTimeStamp
        });
        bytes32 prescripionHash = getPrescriptionHash(prescription);
        prescriptions[prescripionHash] = prescription;
        emit medicinePrescribed(prescripionHash);
        return prescripionHash;
    }


    function verifyPrescription(bytes32 prescriptionHash) public view returns(bool){
        Prescription memory prescription = prescriptions[prescriptionHash];
        return prescription.patient == msg.sender &&  block.timestamp < prescription.expirationUnixTimeStamp;
    }

    function getPrescription(bytes32 prescriptionHash) public view returns(Prescription memory){
        return prescriptions[prescriptionHash];
    }

    function getPrescriptionHash(
        Prescription memory prescription
    ) private pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    prescription.doctor,
                    prescription.patient,
                    prescription.instructions,
                    prescription.expirationUnixTimeStamp
                )
            );
    }
}