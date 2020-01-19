#!/usr/bin/env node

const GenerateMd = require('./GenerateMd');
const path = require('path');
const fs = require('fs');

const [,, ...args] = process.argv;
const config = fs.readFileSync(path.join(__dirname, args[0]));

const generateMd = new GenerateMd(JSON.parse(config.toString()), args[0]);
generateMd.addTitle();
generateMd.addSubtitle();
generateMd.addDummyText();
generateMd.addSpacer();
generateMd.renderKeys();

generateMd.writeToFile();