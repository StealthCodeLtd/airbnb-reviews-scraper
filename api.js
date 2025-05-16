const axios = require('axios');

const site = 'https://www.airbnb.com';
const regxApiKey = /"api_config":\{"key":"(.+?)"/;

async function getApiKey(proxyUrl = null) {
    const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };
    let axiosConfig = { headers, timeout: 60000 };
    if (proxyUrl) {
        const ProxyAgent = require('proxy-agent');
        axiosConfig.httpAgent = new ProxyAgent(proxyUrl);
        axiosConfig.httpsAgent = new ProxyAgent(proxyUrl);
    }
    const response = await axios.get(site, axiosConfig);
    const match = regxApiKey.exec(response.data);
    if (!match) throw new Error('API key not found');
    return match[1];
}

module.exports = { getApiKey };
