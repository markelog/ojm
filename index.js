#!/usr/bin/env node

const meow = require('meow');
const got = require('got');
const figures = require('figures');

const cli = meow(`
  Usage:
    ojm <website>: check if a website is down through isup.com
`);

const provider = 'http://isup.me';
let url = cli.input[0];

if (!url) {
  cli.showHelp();
  process.exit(1);
}

url = url.replace('https://', '').replace('http://', '');

got(`${provider}/${url}`).then(data => {
  console.log();

  if (data.body.includes("It's just you.")) {
    console.log(` ${figures.tick}  "${url}" is up!`);
    console.log();
    process.exit(0);
  }

  if (data.body.includes("It's not just you!")) {
    console.log(` ${figures.cross} it's not just you! "${url}" is down`);
    console.log();
    process.exit(1);
  }

  console.log('huh?');
  console.log();
  process.exit(1);
}).catch(() => {
  console.log();
  console.log(` ${figures.cross} can't connect, check your internet connection`);
  console.log();
  process.exit(1);
});
