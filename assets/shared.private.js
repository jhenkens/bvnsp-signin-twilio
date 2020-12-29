const {google} = require('googleapis');
const fs = require("fs");
const util = require("util");

module.exports = {
  excel_row_to_index,
  parse_patroller_row,
  excel_date_to_js_date,
  parse_time_to_utc,
  strip_datetime_to_date,
  get_service_auth,
  sanitize_number,
  split_to_row_col,
  lookup_row_col_in_sheet,
  find_patroller_from_number,
};

async function find_patroller_from_number(raw_number, sheets_service, context) {
  const number = sanitize_number(raw_number);
  const patroller = (await sheets_service.spreadsheets.values.get({
    spreadsheetId: context.SHEET_ID,
    range: context.PHONE_NUMBER_LOOKUP_SHEET,
    valueRenderOption: 'UNFORMATTED_VALUE'
  })).data.values.map(row => {
    const rawNumber = row[excel_row_to_index(context.PHONE_NUMBER_NUMBER_COLUMN)];
    const currentNumber = sanitize_number(rawNumber);
    const currentName = row[excel_row_to_index(context.PHONE_NUMBER_NAME_COLUMN)];
    return {name: currentName, number: currentNumber};
  }).filter(patroller => {
    if (patroller.number === number) {
      console.log(`Hello ${patroller.name}`);
      return true;
    }
  })[0];
  return patroller;
}

function split_to_row_col(excel_index) {
  const col = excel_row_to_index(excel_index[0]);
  const row = excel_index.slice(1) - 1;
  return [row, col];
}

function lookup_row_col_in_sheet(excel_index, sheet) {
  const [row, col] = split_to_row_col(excel_index);
  return sheet[row][col];
}

function excel_row_to_index(row) {
  return row.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
}

function sanitize_number(number) {
  let new_number = number.toString();
  new_number = new_number.replace("whatsapp:", "");
  new_number = new_number.replace(/(^\+1|\(|\)|\.|-)/g, "");
  if (new_number.startsWith("+1")) {
    new_number = new_number.substr(2);
  }
  return parseInt(new_number);
}

function parse_patroller_row(index, row, context) {
  return {
    index: index,
    name: row[0],
    section: row[excel_row_to_index(context.SECTION_DROPDOWN_COLUMN)],
    checkin: row[excel_row_to_index(context.CHECKIN_DROPDOWN_COLUMN)],
  }
}

function excel_date_to_js_date(date) {
  const result = new Date(0);
  result.setUTCMilliseconds(Math.round((date - 25569) * 86400 * 1000));
  // console.log(`DEBUG: excel_date_to_js_date (${result})`)
  return result;
}

function parse_time_to_utc(date) {
  const result = new Date(date.toUTCString().replace(" GMT", " PST"));
  // console.log(`DEBUG: parse_time_to_utc (${result})`)
  return result;
}

function strip_datetime_to_date(date) {
  const result = new Date(date.toLocaleDateString('en-US', {timeZone: 'America/Los_Angeles'}));
  // console.log(`DEBUG: strip_datetime_to_date (${result})`)
  return result;
}

function get_service_auth(scopes) {
  return new google.auth.GoogleAuth({keyFile: Runtime.getAssets()["/service-credentials.json"].path, scopes: scopes});
}
