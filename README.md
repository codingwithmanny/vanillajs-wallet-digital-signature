# VanillaJS Wallet Digital Signature

A code example showing how to create digital signatures with MetaMask with just HTML and JavaScript.

This code repository is based on the article [How To Create MetaMask Wallet Signatures With Pure VanillaJS](https://codingwithmanny.medium.com/how-to-create-metamask-wallet-signatures-with-pure-vanillajs-845379bb42f6)

![/README/article.png](/README/article.png)

---

## Requirement

- NVM or Node `v18.12.1`
- pnpm `v7.21.0`
- Chrome
- MetaMask Chrome Extension

---

## Quick Setup

1 - Install Dependencies

```bash
pnpm install;
```

2 - Start Http Server

```bash
 ./node_modules/.bin/live-server --port=3001 --watch=$PWD/public --mount=/:./public;
 # OR
 # pnpm run dev;

 # Expected Output:

# Mapping / to "/path/to/vanillajs-wallet-digital-signature/public"
# Serving "/path/to/vanillajs-wallet-digital-signature" at http://127.0.0.1:3001
 ```