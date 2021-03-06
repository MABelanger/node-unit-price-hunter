'use strict';

/*
  We need the data-normalizer because alim plus have no standard of package format
  so we have to parse it and normalize to return a standard format.
*/
function _getFormatPadded(formatStr) {
  // 12X8X21KG -> 12X8X21KG
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)[Xx]([1-9][0-9]*\.?[0-9]*)[Xx]([1-9][0-9]*\.?[0-9]*)(.*)/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[3]) {
    return match[1] + 'X' + match[2] + 'X' + match[3] + match[4];
  }

  // 8X21KG -> 1X8X21KG
  myRegexp = /(^[1-9][0-9]*\.?[0-9]*)[Xx]([1-9][0-9]*\.?[0-9]*)(.*)/m;
  match = myRegexp.exec(formatStr);

  if (match && match[2]) {
    return '1X' + match[1] + 'X' + match[2] + match[3];
  }

  // 21KG -> 1X1X21KG
  myRegexp = /(^[1-9][0-9]*\.?[0-9]*)(.*)/m;
  match = myRegexp.exec(formatStr);

  if (match && match[1]) {
    return '1X1X' + match[1] + match[2];
  }

  return null;
}

function _getNumber(formatStr) {
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

function _getPrefix(formatStr) {
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)([K|M])/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[2]) {
    return match[2];
  }

  return null;
}

function _getUnit(formatStr) {
  let myRegexp = /(^[1-9][0-9]*\.?[0-9]*)([K|M])?(LB|G|L|UN|')?/m;
  let match = myRegexp.exec(formatStr);

  if (match && match[3]) {
    return match[3];
  }

  return null;
}

function getFormatedPrice(priceStr) {
  // replace comma by dot
  if (priceStr) {
    priceStr = priceStr.replace(',', '.');
    return parseFloat(priceStr);
  }

  return null;
}

function getFormatedFormat(formatStr) {
  if (formatStr) {
    /* eslint-disable no-useless-escape */
    formatStr = formatStr.replace(/\ /g, '');
    /* eslint-enable no-useless-escape */
  }

  let formatPadded = _getFormatPadded(formatStr);

  if (formatPadded) {
    let formatPaddedSplited = formatPadded.split('X');
    let prefixAndUnit = formatPaddedSplited[2];

    let number = _getNumber(prefixAndUnit);
    // replace by empty string if no prefix
    let prefix = _getPrefix(prefixAndUnit) || '';
    let unit = _getUnit(prefixAndUnit);

    return formatPaddedSplited[0] + 'X' +
          formatPaddedSplited[1] + 'X' +
          number +
          prefix +
          unit;
  }

  return null;
}

module.exports = {
  _getFormatPadded,
  _getNumber,
  _getPrefix,
  _getUnit,
  getFormatedPrice,
  getFormatedFormat
};
