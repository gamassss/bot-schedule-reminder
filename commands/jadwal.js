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
		const index = scheduleDate.getDay()
		const dayName = daysNameOfWeek[index];
		
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

		if (index === 0 || index === 7) {
			await interaction.reply('Hari ini tidak ada jadwal kuliah.');
			return;
		}

		//transform waktu to jam
		matkulToday.map(e => {
			e[3] = e[3].replaceAll(' ', '').split('-')
			e[3].shift()
			e[3] = e[3].join(' -- ')
			return e;
		})

		let str = "";

		matkulToday.forEach((e) => {
			str += `${e[0]}	${e[4]} ${e[3]}\n`;
			// console.log(`${e[0]}			${e[4]}\n`)
		});
		
		console.log(str);

		await interaction.reply(dayName);
	},
};