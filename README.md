# bot-schedule-reminder
bot discord buat ngingetin jadwal kelas B2 semester 4

# Cara pakai
Kalian bisa buat bot ini untuk server kalian sendiri. Berikut caranya:

## Install NodeJS
install nodejs terlebih dahulu di `https://nodejs.org/`

## Setup bot discord
-Buat server terlebih dahulu atau bisa menggunakan server yang sudah ada
-Lalu buka discord developer portal -> Pilih `Application` di sidebar -> New Application
-Create -> Pilih `Bot' di sidebar -> Add bot -> Reset token untuk mendapatkan token bot terbaru dan simpan token tersebut
-Pada section `Privileged Gateway Intents`, enable option `MESSAGE CONTENT INTENT`

-Setelah itu pilih `OAuth2` -> Copy ClientID
-Pilih submenu `URL Generator`
-Pada section `Scopes`, centang pada **bot** dan **aplications.commands**
-Scroll ke bawah dan pada section **Bot Permissions** centang **Read Messages/View Channels, Send Messages, Use Slash Commands**
-Copy url dan buka di new tab lalu Continue dan COnfirm

## Setup spreadsheet
-Copy jadwal kalian dari website https://mahasiswa.unair.ac.id/
-Buat spreadsheet baru dan paste

## Setup Google sheets API
Masuk ke google cloud console dan register atau login untuk mendapatkan API key kalian sendiri

## Clone dan run bot
-Clone repo ini
```
git clone https://github.com/gamassss/bot-schedule-reminder.git
cd bot-schedule-reminder
node deploy-commands.js
npm run start
```

## Selamat bot anda sudah bisa dipakai 😃
Kalau repo ini membantu jangan lupa kasi star ⭐



