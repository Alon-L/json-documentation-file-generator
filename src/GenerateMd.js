const fs = require('fs');

const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const shorterDummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

class GenerateMd {
  constructor(json, fileName) {
    this.json = json;
    this.fileName = fileName;
    this.output = '';
  }

  addLine(line) {
    this.output += `${line}\n`;
  }

  addTitle(title = 'TITLE') {
    this.addLine(`# ${title}`);
  }

  addSubtitle() {
    this.addLine(`## ${this.fileName}`);
  }

  addDummyText(text = dummyText) {
    this.addLine(text);
  }

  addHeader(header) {
    this.addLine(`### ${header}`);
  }

  addSpacer() {
    this.addLine('');
  }

  renderKeys() {
    for (const key in this.json) {
      this.addHeader(`${this.fileName} > ${key}`);
      this.addDummyText();

      const keyScope = { [key]: this.json[key] };
      this.addLine('\`\`\`json');
      this.addLine(JSON.stringify(keyScope, null, 2));
      this.addLine('\`\`\`');

      this.addSpacer();

      this.renderSubkeys(this.json[key]);

      this.addSpacer();
    }
  }

  renderSubkeys(subkeys, indent = 0) {
    for (const key in subkeys) {
      const value = subkeys[key];
      const indentSpace = Array.from({ length: indent + 1 }).map(() => '').join(' ');
      this.addLine(`${indentSpace}* **${key}:** ${shorterDummyText}`);

      if (typeof value === 'object' && value !== null && value.constructor === Object) {
        this.renderSubkeys(value, indent + 4);
      }
    }
  }

  writeToFile(path = `${this.fileName}.md`) {
    fs.writeFileSync(path, this.output);
  }
}

module.exports = GenerateMd;