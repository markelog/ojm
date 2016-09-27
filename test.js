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

test('check google.com', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['google.com']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes(' It\'s just you. google.com is up.'));
});

test('check google.com with https://', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['https://google.com']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes(' It\'s just you. google.com is up.'));
});

test('check google.com with http://', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['http://google.com']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stdout.includes(' It\'s just you. google.com is up.'));
});

test('check non-existent url', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['http://google.coma']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stderr.includes(" It's not just you! google.coma is down."));
  t.is(ret.code, 1);
});

test('check google.com not url like', async t => {
  let ret;

  try {
    ret = await execa('./index.js', ['google']);
  } catch (err) {
    ret = err;
  }

  t.true(ret.stderr.includes('huh'));
  t.is(ret.code, 1);
});
