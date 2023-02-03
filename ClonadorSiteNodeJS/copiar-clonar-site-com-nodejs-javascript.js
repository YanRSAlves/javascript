//Esse script utiliza os pacotes website-scraper e website-scraper-puppeteer do NPM para baixar uma cópia de um site para o seu computador, assim como seus CSS e JS.

const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const path = require('path');

scrape({
    // Forneça a URL do site que você quer copiar
    urls: ['https://site-que-voce-quer-copiar.com.br'],

    // Especifique a pasta onde os arquivos do site serão salvos em pasta-do-site
    directory: path.resolve(__dirname, 'pasta-do-site'),
    
    // carregue o plugin do Puppeteer
    plugins: [ 
        new PuppeteerPlugin({
            launchOptions: { 
                headless: true
            },
            scrollToBottom: {
                timeout: 10000, 
                viewportN: 10 
            }
        })
    ]
});