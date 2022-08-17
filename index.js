const {Client, Intents, MessageEmbed, MessageAttachment} = require('discord.js');
const cron = require('cron');
const {wancr} = require('config.json');
const {guildId, generalChannelId} = wancr;

const token = process.env.DISCORD_TOKEN;

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const sendMessageWithAttachment = (resourceName, message = '', channelId = generalChannelId) => {
    const guild = client.guilds.cache.get(guildId);
    const channel = guild.channels.cache.get(channelId);

    const attachment = new MessageAttachment(`assets/${resourceName}`);
    const embed = new MessageEmbed()
        .setImage((`attachment://${resourceName}`))
        .setDescription(message);

    channel.send({embeds: [embed], files: [attachment]});
};

const registerJob = (cronExpression, onTick) => new cron.CronJob(cronExpression, onTick, null, true, 'America/Argentina/Buenos_Aires');


client.once('ready', () => {
    const jobs = [
        {expression: "0 30 8 * * 1", onTick: () => sendMessageWithAttachment("monday-already.jpg", "Chupala Napster")},
        {expression: "0 30 8 * * 3", onTick: () => sendMessageWithAttachment("wednesday.jpg")},
        {expression: "0 0 18 * * 5", onTick: () => sendMessageWithAttachment("weeknd.gif")},
        {expression: "0 0 8  * * 2", onTick: () => sendMessageWithAttachment("chainsaw-frog.png", "damas y caballeros, es un gran placer informarles que hoy es martes de motosierra hombre", '700450662017663037')}
    ];

    jobs.forEach(({expression, onTick}) => registerJob(expression, onTick));
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(token);

// https://discord.com/api/oauth2/authorize?client_id=986745016682684496&permissions=2147665920&scope=bot%20applications.commands
