const {google} = require('googleapis');
const sheets = google.sheets('v4');
const { api_key, spreadsheetId } = require('./key.json')

async function main () {
  const authClient = await authorize();
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: spreadsheetId,
    range: 'Sheet1!A1:Y1000',
    valueRenderOption: 'FORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING',
    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data;
		const result = JSON.stringify(response)
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function authorize() {
  let authClient = api_key;

  if (authClient == null) {
    throw Error('authentication failed');
  }

  return authClient;
}

module.exports = main