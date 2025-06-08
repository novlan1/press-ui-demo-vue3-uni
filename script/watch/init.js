const path = require('path');
const { readFileSync, writeFileSync, safeJsonParse, hyphenate, getPagesJsonCondition } = require('t-comm');
const { initWithPressUI } = require('../../src/press-ui/script/watch/init');

const PATH_JSON_PATH = path.resolve(__dirname, '../../src/pages.json');
const PAGE_JSON_PRESS_UI = path.resolve(__dirname, '../../src/press-ui/src/pages.json');
const COMPONENT_CONFIG_PATH = path.resolve(__dirname, '../../src/press-ui/config/component-config.json');


const CP_LIST = [
  'pages',
  'utils',
];

function getPressUIPagesJson() {
  const content = readFileSync(PAGE_JSON_PRESS_UI);
  const reg = /subPackages": (\[[\s\S]+\]),\s+"preloadRule/;

  const match = content.match(reg);
  const subPackages = match?.[1] || '[]';

  const list = safeJsonParse(subPackages, []);
  return list;
}

function genPagesJson() {
  const targetPagesJson = require(PATH_JSON_PATH);
  targetPagesJson.subPackages = getPressUIPagesJson();
  const componentConfig = readFileSync(COMPONENT_CONFIG_PATH, true);
  const condition = getPagesJsonCondition(componentConfig);
  targetPagesJson.condition = condition;

  // console.log('getPressUIPagesJson', getPressUIPagesJson())

  writeFileSync(PATH_JSON_PATH, targetPagesJson, true);
}

function main() {
  initWithPressUI(CP_LIST);
  genPagesJson();
}


main();
