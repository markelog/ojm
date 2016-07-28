import { test } from 'ava';
import execa from 'execa';

test('without arguments', async t => {
  let ret;

  try {
    ret = await execa.shell('./index.js');
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes('Check if site is down through isup.com'));
});

test('check github.com', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['github.com']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes('  "github.com" is up!'));
});

test('check github.com with https://', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['https://github.com']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes('  "github.com" is up!'));
});

test('check github.com with http://', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['http://github.com']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes('  "github.com" is up!'));
});

test('check non-existent url', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['http://github.coma']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stderr.includes(" it's not just you! \"github.coma\" is down"));
  t.is(ret.code, 1);
});

test('check github.com not url like', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['github']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stderr.includes('huh'));
  t.is(ret.code, 1);
});
