// Globals
// ========================================================
/**
 * 
 */
let WALLET_ADDRESS = '';

/**
 * 
 */
let MESSAGE = '';

/**
 * 
 */
let SIGNATURE = '';

// Functions
// ========================================================
/**
 * Connects wallet to site
 */
const onClickWalletConnect = async () => {
    console.group('onClickWalletConnect');
    
    // Get the element we want to output the result of connecting the wallet
    const codeWalletAddress = document.getElementById('code-wallet-address');

    try {
        // eth_requestAccounts is a MetaMask RPC API request that will
        // prompt the wallet to connect or if already has connected successfully connect
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log({ accounts });
        codeWalletAddress.innerHTML = accounts[0];
        
        // We want to store the wallet address to a globla variable to use later
        WALLET_ADDRESS = accounts[0];

        // Shows the additional sections that will be used if the wallet is connected
        const sectionConnected = document.getElementById('connected');
        sectionConnected.removeAttribute('style');
    } catch (error) {
        console.log({ error });
        codeWalletAddress.innerHTML =  error?.message ?? 'Unknown wallet connection error.'
    }

    console.groupEnd();
};

/**
 * Prompts wallet to sign a message to produce a signature
 * @param {*} event 
 */
const onSubmitWalletSign = async (event) => {
    console.group('onSubmitWalletSign');
    event.preventDefault();

    // Retrieve message from input form with name "message"
    const message = event.currentTarget.message.value;
    console.log({ message });

    // Store the message in a global variable
    MESSAGE = message;

    // Get the element we want to output the result 
    // of prompting the wallet for signature
    const codeWalletSignature = document.getElementById('code-wallet-signature');
    
    // Prompt wallet for signature
    try {
        // Perform a personal sign with the original message and the wallet address
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [`${MESSAGE}`, WALLET_ADDRESS]
        });
        console.log({ signature });

        // Show the signature
        codeWalletSignature.innerHTML = signature;
        SIGNATURE = signature;
        console.log({ SIGNATURE });
    } catch (error) {
        console.log({ error });
        codeWalletSignature.innerHTML = error?.message ?? 'Unknown wallet signature error.'
    }

    console.groupEnd();
};

/**
 * Verifies signature signed by wallet
 */
const onClickSignatureVerify = () => {
    console.group('onClickSignatureVerify');
    console.log({ MESSAGE });
    console.log({ SIGNATURE });
    console.log({ WALLET_ADDRESS });
    
    // Take advantage of ethers to verify the message and signature
    const walletAddress = ethers.utils.verifyMessage(MESSAGE, SIGNATURE);
    console.log({ walletAddress });

    // Get the element we want to output the result 
    const codeWalletSignatureVerify = document.getElementById('code-wallet-signature-verify');
    codeWalletSignatureVerify.innerHTML = `${walletAddress.toLowerCase()}\nisMatching: ${walletAddress.toLowerCase() === WALLET_ADDRESS}`

    console.groupEnd();
};

// Initial Script Loaded On Window Loaded
// ========================================================
/**
 * Init - Runs as soon as window is loaded
 */
window.onload = () => {
    // Elements
    const buttonWalletConnect = document.getElementById('button-wallet-connect');
    const formWalletSign = document.getElementById('form-wallet-sign');
    const buttonSignatureVerify = document.getElementById('button-signature-verify');
    
    // Events
    buttonWalletConnect.addEventListener('click', onClickWalletConnect);
    formWalletSign.addEventListener('submit', onSubmitWalletSign);
    buttonSignatureVerify.addEventListener('click', onClickSignatureVerify);
};