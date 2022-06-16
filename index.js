// Require the necessary discord.js classes
const {Client, Intents, MessageEmbed, MessageAttachment} = require('discord.js');
const {token} = require('./config.json');
const cron = require('cron');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const sendMessageWithAttachment = (imageName, message = '') => {
    const guild = client.guilds.cache.get('662843741203333140');
    const channel = guild.channels.cache.get('662843741203333143');

    const attachment = new MessageAttachment(`assets/${imageName}`);
    const embed = new MessageEmbed()
        .setImage((`attachment://${imageName}`))
        .setDescription(message)

    channel.send({embeds: [embed], files: [attachment]});
}

const makeCron = (cronExpression, onTick) => {
    return new cron.CronJob(cronExpression,
        onTick,
        null,
        true,
        'America/Argentina/Buenos_Aires');
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    // wednesday
    makeCron('0 30 8 * * 3', () => sendMessageWithAttachment("wednesday.jpg"));

    //weekend
    makeCron('0 0 18 * * 5', () => sendMessageWithAttachment("weeknd.gif"));

    //monday
    makeCron('0 30 8 * * 1', () => sendMessageWithAttachment("monday-already.jpg", "Chupala Napster"));

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

// Login to Discord with your client's token
client.login(token)

// https://discord.com/api/oauth2/authorize?client_id=986745016682684496&permissions=2147665920&scope=bot%20applications.commands
