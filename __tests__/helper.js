// USES PATH - WORKS OUT ABSOLUTE PATHS
const path = require('path')
const jsdom = require('jsdom');
// USING JSDOM PACKAGE
const { JSDOM } = jsdom;

const renderDOM = async (filename) => {
  // WITH THIS CODE WE WILL HAVE AN ABSOLUTE PATH
  const filePath = path.join(process.cwd(), filename);
  // PASSING THIS A HTML FILE AND FROM THIS WE BUILD A DOM (IN THE TERMINAL)
  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable'
  });

  return new Promise((resolve, _) => {
    // WAIT FOR DOCUMENTS TO BE ADDED TO THE DOM
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      resolve(dom);
    });
  });
};

module.exports = { renderDOM };