#!/usr/bin/env node
'use strict';

const meow = require('meow');
const got = require('got');
const figures = require('figures');

const cli = meow(`
  Usage:
    ojm <website>
`);

const provider = 'http://isup.me';
let url = cli.input[0];

if (!url) {
  cli.showHelp();
  process.exit(1);
}

url = url.replace('https://', '').replace('http://', '');

got(`${provider}/${url}`).then(data => {
  if (data.body.includes("It's just you.")) {
    console.log();
    console.log(`${figures.tick} ${url} is up!`);
    console.log();
    process.exit(0);
  }

  if (data.body.includes("It's not just you!")) {
    console.error();
    console.error(`${figures.cross} it's not just you! ${url} is down`);
    console.error();
    process.exit(1);
  }

  console.error();
  console.error(`${figures.cross} huh? "${url}" doesn't look like a site on the interwho`);
  console.error();
  process.exit(1);
}).catch(() => {
  console.error();
  console.error(`${figures.cross} can't connect, check your internet connection`);
  console.error();
  process.exit(1);
});
