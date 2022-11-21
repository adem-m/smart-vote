import './App.css'
import {useEffect, useState} from "react";
import Web3 from "web3";
import {SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS} from "./config.js";

function App() {
    const YES_VOTE = '0';
    const NO_VOTE = '1';

    const [account, setAccount] = useState(null);
    const [proposal, setProposal] = useState("");
    const [votes, setVotes] = useState([]);

    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    const contract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS);

    async function connect() {
        if (!window.ethereum) {
            console.log("No Wallet");
            return;
        }
        await window.ethereum.request({method: "eth_requestAccounts"});
        const account = web3.eth.accounts;
        const walletAddress = account.givenProvider.selectedAddress;
        setAccount(walletAddress);
        web3.eth.defaultAccount = walletAddress;
    }

    async function loadBlockchainData() {
        setAccount(web3.eth.accounts.givenProvider.selectedAddress);
        web3.eth.defaultAccount = account;
        const p = await contract.methods.getProposal().call();
        setProposal(p);
        const v = await contract.methods.getVotes().call();
        setVotes(v);
    }

    async function vote(vote) {
        try {
            await contract.methods.vote(vote).send({from: account});
            alert("Vote submitted");
        } catch (e) {
            alert("Could not vote");
        }
    }

    function getYesVotesCount() {
        return votes.filter(vote => vote === YES_VOTE).length;
    }

    function getNoVotesCount() {
        return votes.filter(vote => vote === NO_VOTE).length;
    }

    useEffect(() => {
        loadBlockchainData().then();
    }, []);

    return (
        <div className="App">
            {
                account === null && (
                    <div>
                        <h1>Please connect your wallet</h1>
                        <button onClick={connect}>Connect</button>
                    </div>
                )
            }
            {
                account !== null && (
                    <div>
                        Your account : {account}
                        <h1>{proposal}</h1>
                        <button onClick={() => vote(YES_VOTE)}>Yes</button>
                        <button onClick={() => vote(NO_VOTE)}>No</button>
                        <h1>Results</h1>
                        <h2>Yes :</h2>
                        <h3>{getYesVotesCount()}</h3>
                        <h2>No :</h2>
                        <h3>{getNoVotesCount()}</h3>
                    </div>
                )
            }
        </div>
    )
}

export default App
