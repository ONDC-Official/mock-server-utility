// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const crypto = require('crypto'); // Node.js crypto module for encryption and decryption
const path = require('path'); // Node.js path module for handling file paths

const port = 3000; // Port on which the server will listen
const PRIVATE_KEY_1 = "MC4CAQAwBQYDK2VuBCIEIOCZKcKHAvCzJq4Qq8EC7kk8QpNCaXHElKEfk4MvWSNA";
const PUBLIC_KEY_1 = "MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM=";

// Pre-defined public and private keys
const privateKey = crypto.createPrivateKey({
    key: Buffer.from(PRIVATE_KEY_1, 'base64'), // Decode private key from base64
    format: 'der', // Specify the key format as DER
    type: 'pkcs8' // Specify the key type as PKCS#8
});

const publicKey = crypto.createPublicKey({
    key: Buffer.from(PUBLIC_KEY_1, 'base64'), // Decode public key from base64
    format: 'der', // Specify the key format as DER
    type: 'spki' // Specify the key type as SubjectPublicKeyInfo (SPKI)
});


// Calculate the shared secret key using Diffie-Hellman
const sharedKey = crypto.diffieHellman({
    privateKey: privateKey,
    publicKey: publicKey
});

// Create an Express application
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Route for handling subscription requests
app.post('/v1/on_subscribe', function (req, res) {
    // console.log(req.params.option);
    // console.log(req.body);
    const { challenge } = req.body; // Extract the 'challenge' property from the request body
    console.log(challenge,"is the challenge ---->");
    const answer = decryptAES256ECB(sharedKey, challenge); // Decrypt the challenge using AES-256-ECB
    console.log(answer,"\n \n \n \n is the answer ---->");
    const resp = { answer: answer };
    // console.log("Response", JSON.stringify(resp));
    res.status(200).json(resp); // Send a JSON response with the answer
});



// Route for handling search requests
app.post('/v1/search', function (req, res) {
    // console.log(req.params.option);
    // console.log(req.body);
    const ack = {
        "message": {
            "ack": {
                "status": "ACK"
            }
        }
    };
    res.status(200).json(ack); // Send a JSON acknowledgment response
});

// Route for handling search requests with optional delay
app.post('/v1/on_search', async function (req, res) {
    // console.log(req.params.option);
    // console.log(req.body);
    const ack = {
        "message": {
            "ack": {
                "status": "ACK"
            }
        }
    };
    if (req.params.option.endsWith("5")) {
        await sleep(1000); // Add a delay of 1 second for requests ending with "5"
    }
    res.status(200).json(ack); // Send a JSON acknowledgment response
});

// Route for serving a verification file
app.get('/ondc-site-verification.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'ondc-site-verification.html')); // Serve a static HTML file
});

// Default route
app.get('/v1', (req, res) => res.send('Hello World!'));

// Health check route
app.get('/v1/health', (req, res) => res.send('Health OK!!'));

app.listen(port, () => console.log(`Subscriber service listening on port ${port}!`));

// Encrypt using AES-256-ECB
function encryptAES256ECB(key, plaintext) {
    const iv = Buffer.alloc(0); // ECB doesn't use IV
    const cipher = crypto.createCipheriv("aes-256-ecb", key, iv);

    let encrypted = cipher.update(plaintext, "utf8", "base64");
    encrypted += cipher.final("base64");

    return encrypted;
}

// Decrypt using AES-256-ECB
function decryptAES256ECB(key, encrypted) {
    const iv = Buffer.alloc(0); // ECB doesn't use IV
    const decipher = crypto.createDecipheriv("aes-256-ecb", key, iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// Function to sleep for a specified number of milliseconds
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
