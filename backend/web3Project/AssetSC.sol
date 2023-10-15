// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract AssetSC {
    uint private tokenID;
    address private currentOwnerAddress = msg.sender;
    address private initialAddress = msg.sender;

    constructor(uint _initialTokenID) {
        tokenID = _initialTokenID;
    }

    struct Participant {
        address _address;
        uint _value;
    }

    Participant[] internal participants;

    function registerToBuy() external payable returns (uint) {
        require(msg.sender != currentOwnerAddress, "Cannot buy your own item");
        participants.push(Participant(msg.sender, msg.value));
        return msg.value;
    }

    function approve(address newOwnerAddress, uint value) external {
        require(msg.sender == currentOwnerAddress, "Must be approved by owner");

        uint index = 0;
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i]._address == newOwnerAddress && participants[i]._value == value) {
                index = i;
                break;
            }
        }
        payable(msg.sender).transfer(participants[index]._value);

        //return money
        returnMoney(index);

        //update current owner
        currentOwnerAddress = participants[index]._address;

        //empty the array
        delete participants;
    }


    function getParticipants() view public returns (Participant[] memory) {
        Participant[] memory result = new Participant[](participants.length);
        result = participants;
        return result;
    }

    function returnMoney(uint index) private {
        for (uint init = 0; init < participants.length; init++)
        {
            if(init != index)
            {
                payable(participants[init]._address).transfer(participants[init]._value);
            }
        }
    }

    function getCurrentOwner() view external returns (address) {
        return currentOwnerAddress;
    }
}
