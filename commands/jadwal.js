const { SlashCommandBuilder } = require("discord.js");
const main = require("../handler");
const moment = require('moment-timezone');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("today")
    .setDescription("Cek Jadwal Hari Ini")
		.addStringOption(option =>
			option.setName('hari')
				.setDescription('Pilih hari / besok')
				.setRequired(false)
				.addChoices(
					{ name: 'Besok', value: 'Besok' },
					{ name: 'Senin', value: '1' },
					{ name: 'Selasa', value: '2' },
					{ name: 'Rabu', value: '3' },
					{ name: 'Kamis', value: '4' },
					{ name: 'Jumat', value: '5' },
				)),
  async execute(interaction) {
    const resultJSON = await main();
    const getJadwal = JSON.parse(resultJSON);
		
    //get day's name
    const scheduleDate = new Date();
		// let daysNameOfWeek = interaction.options.getString('hari')
		daysNameOfWeek = [
			"Minggu",
			"Senin",
			"Selasa",
			"Rabu",
			"Kamis",
			"Jumat",
			"Sabtu",
		];
		
    const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = moment.tz(scheduleDate, timezone).format();
		let index = 0;

		if (!interaction.options.getString('hari')) {
			index = moment(localTime).format('d');
		} else {
			index = parseInt(interaction.options.getString('hari'));
			if (interaction.options.getString('hari') === 'Besok') {
				index = moment(localTime).format('d');
				index++;
			}
		}

    const dayName = daysNameOfWeek[index];
    //get and extract values
    const values = getJadwal.values;

    //get today's matkul
    const matkul = values.map((e) => {
      if (e[0].includes("\n")) {
        e[0] = e[0].slice(7);
        return e;
      }

      return e;
    });

    //filter then reverse the array in order to get jam sorted
    const matkulToday = matkul.filter((e) => e[3].includes(dayName)).reverse();

    //handle if there's no matkul for today
    if (index === 0 || index === 6) {
      await interaction.reply(`Hari ${daysNameOfWeek[index]} tidak ada jadwal kuliah.`);
      return;
    }

    //transform waktu to jam
    matkulToday.map((e) => {
      e[3] = e[3].replaceAll(" ", "").split("-");
      e[3].shift();
      e[3] = e[3].join(" -- ");
      return e;
    });

    let strMatkul = "";
    let strRuangan = "";
    let strJam = "";

    //string up
    matkulToday.forEach((e) => {
      strMatkul += `${e[0]}\n`;
      strRuangan += `${e[4]}\n`;
      strJam += `${e[3]}\n`;
    });

    //formatting message
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Jadwal kuliah hari ini",
      fields: [
        {
          name: "Mata kuliah",
          value: strMatkul,
          inline: true,
        },
        {
          name: "Ruangan",
          value: strRuangan,
          inline: true,
        },
        {
          name: "Jam",
          value: strJam,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    };

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
