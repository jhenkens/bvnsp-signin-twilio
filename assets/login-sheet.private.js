const {parse_patroller_row, lookup_row_col_in_sheet, strip_datetime_to_date, parse_time_to_utc, excel_date_to_js_date} = require(Runtime.getAssets()["/shared.js"].path)

function sanitize_date(date){
  const result = strip_datetime_to_date(parse_time_to_utc(excel_date_to_js_date(date)));
  // console.log(`DEBUG: sanitize_date (${date} -> ${result})`)
  return result;
}

class LoginSheet
{
  constructor(sheets_service, context){
    this.context = context;
    this.sheets_service = sheets_service;
    this.rows = null;
  }
  async refresh(){
    this.rows = (await this.sheets_service.spreadsheets.values.get({
      spreadsheetId: this.context.SHEET_ID,
      range: this.context.LOGIN_SHEET_LOOKUP,
      valueRenderOption: 'UNFORMATTED_VALUE'
    })).data.values;
    this.number_checkins = (await this.sheets_service.spreadsheets.values.get({
      spreadsheetId: this.context.SHEET_ID,
      range: this.context.NUMBER_CHECKINS_LOOKUP,
      valueRenderOption: 'UNFORMATTED_VALUE'
    })).data.values[0][0];
  }
  get archived(){
    const archived = lookup_row_col_in_sheet(this.context.ARCHIVED_CELL, this.rows);
    return (archived === undefined && this.number_checkins === 0) || archived.toLowerCase() === 'yes';
  }
  get sheet_date(){
    return sanitize_date(lookup_row_col_in_sheet(this.context.SHEET_DATE_CELL, this.rows));
  }
  get current_date(){
    return sanitize_date(lookup_row_col_in_sheet(this.context.CURRENT_DATE_CELL, this.rows));
  }
  get is_current(){
    return this.sheet_date.getTime() === this.current_date.getTime();
  }
  try_find_patroller(name){
    const index = this.rows.findIndex(row => row[0] === name);
    if(index === -1){
      return 'not_found';
    }
    return parse_patroller_row(index, this.rows[index], this.context);
  }
  find_patroller(name){
    const result = this.try_find_patroller(name);
    if(result === 'not_found'){
      throw new Error(`Could not find ${name} in login sheet`);
    }
    return result;
  }
}

module.exports = LoginSheet;
