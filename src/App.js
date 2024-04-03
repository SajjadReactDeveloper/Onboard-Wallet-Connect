import './App.css';
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import Onboard from "@web3-onboard/core";

const wcInitOptions = {
  projectId: '420e773801375c755314eb88551a3a24',
  requiredChains: [1],
  optionalChains: [42161, 8453, 10, 137, 56],
  dappUrl: 'https://app.chaingpt.dev'
}

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule(wcInitOptions);

const modules = [coinbaseWalletSdk, walletConnect];


const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/e200479dc89a4072a05c7aa1c0f83147`;
const ROPSTEN_RPC_URL = `https://ropsten.infura.io/v3/e200479dc89a4072a05c7aa1c0f83147`;
const RINKEBY_RPC_URL = `https://rinkeby.infura.io/v3/e200479dc89a4072a05c7aa1c0f83147`;

const onboard = Onboard({
  wallets: modules, 
  chains: [
    {
      id: "0x1", 
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: "0x3",
      token: "tROP",
      namespace: "evm",
      label: "Ethereum Ropsten Testnet",
      rpcUrl: ROPSTEN_RPC_URL
    },
    {
      id: "0x4",
      token: "rETH",
      namespace: "evm",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: RINKEBY_RPC_URL
    }
  ],
  appMetadata: {
    name: "My App",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "My app using Onboard",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});

function App() {
  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>  
    </div>
  );
}

export default App;
