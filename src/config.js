export const SMART_CONTRACT_ADDRESS = '0x8E4CF246B08c62c64F89a67CbdA2759Eb08cAaBC';

export const SMART_CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "getProposal",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getVotes",
        "outputs": [
            {
                "internalType": "enum VotingSystem.Choice[]",
                "name": "",
                "type": "uint8[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum VotingSystem.Choice",
                "name": "_choice",
                "type": "uint8"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];