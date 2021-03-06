#!/usr/bin/env node
'use strict';

const meow = require('meow');
const got = require('got');
const chalk = require('chalk');
const figures = require('figures');

const symbols = {
  cross: chalk.red(figures.cross),
  tick: chalk.green(figures.tick),
};

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
    console.log(`${symbols.tick} It's just you. ${url} is up.`);
    console.log();
    process.exit(0);
  }

  if (data.body.includes("It's not just you!")) {
    console.error();
    console.error(`${symbols.cross} It's not just you! ${url} is down.`);
    console.error();
    process.exit(1);
  }

  console.error();
  console.error(`${symbols.cross} huh? "${url}" doesn't look like a site on the interwho.`);
  console.error();
  process.exit(1);
}).catch(() => {
  console.error();
  console.error(`${symbols.cross} Can't connect, check your internet connection.`);
  console.error();
  process.exit(1);
});
