# Solid-Batch ⚒️

1.  **Install Foundry**

First run the command below to get foundryup, the Foundry toolchain installer:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Then, in a new terminal session or after reloading your PATH, run it to get the latest forge and cast binaries:

```console
foundryup
```

Advanced ways to use `foundryup`, and other documentation, can be found in the [foundryup package](./foundryup/README.md)

2.  **Install Dependencies**

```bash
npm i
```

3.  **Run Tests**

```bash
forge test --match-contract MultiSendTest -vvvv
```

4.  **Run Server**

I simulated a POST endpoint in Postman (x-www-form-urlencoded) with parameters specified in src/mockdata, and using an ERC20 specified in .env

```bash
nodemon src/server.js
```
