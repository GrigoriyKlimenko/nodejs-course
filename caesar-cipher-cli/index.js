#!/usr/bin/env node

const { Transform, pipeline } = require('stream');
const fs = require('fs');
const options = require('./options');
const cryptString = require('./crypting');

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(
      chunk = cryptString(chunk, options.action, options.shift)
    );
    callback();
  }
});

pipeline(
  options.input ? fs.createReadStream(options.input) : process.stdin,
  transformStream,
  options.output ? fs.createWriteStream(options.output, { flags: 'a' }) : process.stdout,
  error => {
    if (!error) return;
    if (error.code === 'ENOENT') {
      console.error(`error: file not found ${error.path}`);
    } else {
      console.error(error.message);
    }
  }
);