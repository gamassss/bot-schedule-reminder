const { SlashCommandBuilder } = require('discord.js');
const main = require('../handler')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('today')
		.setDescription('Cek Jadwal Hari Ini'),
	async execute(interaction) {
		const resultJSON = await main();
		const getJadwal = JSON.parse(resultJSON)

		//get day's name
		const scheduleDate = new Date()
		const daysNameOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
		const dayName = daysNameOfWeek[scheduleDate.getDay()];
		
		//get and extract values
		const values = getJadwal.values

		//get today's matkul
		const matkul = values.map(e => {
			if (e[0].includes('\n')) {
				e[0] = e[0].slice(7)
				return e;
			}
		
			return e;
		})
		const matkulToday = matkul.filter(e => e[3].includes(dayName))

		await interaction.reply(dayName);
	},
};