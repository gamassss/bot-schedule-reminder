const { SlashCommandBuilder } = require('discord.js');
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const { api_key } = require('../key.json')

async function main () {
  const authClient = await authorize();
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1OOw1VneF2923uqGsSq8A8l7Lur-PqcbC74DjdrthOJg',  // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'Sheet1!A1:Y1000',  // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: 'FORMATTED_VALUE',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: 'FORMATTED_STRING',  // TODO: Update placeholder value.

    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.get(request)).data;
    // TODO: Change code below to process the `response` object:
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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('today')
		.setDescription('Cek Jadwal Hari Ini'),
	async execute(interaction) {
		const resultJSON = await main();
		const getJadwal = JSON.parse(resultJSON)
		console.log(resultJSON)
		console.log(typeof resultJSON)
		// const stringRes = JSON.stringify(resultJSON)
		await interaction.reply(getJadwal.range);
	},
};