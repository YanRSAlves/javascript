//Script que quebra captchas tradicionais (imagem com letras e números) usando a API do 2captcha.com e o Node.js

const request = require('request');
const fs = require('fs');
const puppeteer = require('puppeteer');

const API_KEY = "SUA_API_KEY_DO_2captcha";

async function curl(options) {
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if(err)
                return reject(err);
            resolve(body);
        });
    });
}

async function sleep(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve();
        }, sec * 1000);
    });
}

async function resolve_captcha(captcha_file_path) {

    let image_file = await fs.promises.readFile(captcha_file_path, {encoding: 'base64'});
    let unparsed_captcha_id = await curl({
        method : 'POST',
        url: `https://2captcha.com/in.php`,
        form: {
            key: API_KEY,
            method: 'base64',
            body: image_file,
            json: true
        }
    });

    let parsed_captcha_id = JSON.parse(unparsed_captcha_id);
    let captcha_id = parsed_captcha_id.request;

    while(1) {

        await sleep(10);
        console.log('verificando se o captcha está pronto...');
        let captcha_ready = await curl({
            method: 'GET',
            url: `https://2captcha.com/res.php?key=${API_KEY}&action=get&id=${captcha_id}&json=true`
        });

        let parsed_captcha_ready = JSON.parse(captcha_ready);
        console.log(parsed_captcha_ready);
        if(parsed_captcha_ready.status == 1)
            return parsed_captcha_ready.request;
        else if(parsed_captcha_ready.request != "CAPCHA_NOT_READY")
            return false;

    }

}

async function run () {

    let captcha_text = await resolve_captcha('./captcha.jpg');
    console.log(captcha_text);

}

run();