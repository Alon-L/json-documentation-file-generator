#!/usr/bin/env node

const GenerateMd = require('./src/GenerateMd');
const path = require('path');
const fs = require('fs');

const [,, ...args] = process.argv;
const dirPath = process.cwd();
const filePath = path.join(dirPath, args[0]);

const config = fs.readFileSync(filePath);

const generateMd = new GenerateMd(JSON.parse(config.toString()), args[0]);
generateMd.addTitle();
generateMd.addSubtitle();
generateMd.addDummyText();
generateMd.addSpacer();
generateMd.renderKeys();

const pat = new RegExp('(\\b' + 'src' + '\\b)(?!.*\\b\\1\\b)', 'i');
const outputPath = dirPath.includes('src')
  ? dirPath.replace(pat, 'doc')
  : dirPath;

fs.mkdirSync(outputPath, { recursive: true });
generateMd.writeToFile(path.join(outputPath, args[0] + '.md'));