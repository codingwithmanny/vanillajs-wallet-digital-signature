// Constants
// ========================================================
/**
 * 
 */
let MESSAGE = '';

/**
 * 
 */
let WALLET_ADDRESS = '';

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

    const codeWalletAddress = document.getElementById('code-wallet-address');

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log({ accounts });
        codeWalletAddress.innerHTML = accounts[0];

        WALLET_ADDRESS = accounts[0];
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

    // Retrieve message
    const message = event.currentTarget.message.value;
    console.log({ message });

    // Store the message in a global variable
    MESSAGE = message;

    // Prompt wallet for signature
    const codeWalletSignature = document.getElementById('code-wallet-signature');
    try {
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [`${MESSAGE}`, WALLET_ADDRESS]
        });
        console.log({ signature });
        codeWalletSignature.innerHTML = signature;
        SIGNATURE = signature;
        console.log({ SIGNATURE });
    } catch (error) {
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

    const walletAddress = ethers.utils.verifyMessage(MESSAGE, SIGNATURE);
    console.log({ walletAddress });

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
    console.log({ ethers });

    // Elements
    const buttonWalletConnect = document.getElementById('button-wallet-connect');
    const formWalletSign = document.getElementById('form-wallet-sign');
    const buttonSignatureVerify = document.getElementById('button-signature-verify');
    
    // Events
    buttonWalletConnect.addEventListener('click', onClickWalletConnect);
    formWalletSign.addEventListener('submit', onSubmitWalletSign);
    buttonSignatureVerify.addEventListener('click', onClickSignatureVerify);
};