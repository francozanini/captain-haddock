const {Client, Intents, MessageEmbed, MessageAttachment} = require('discord.js');
const cron = require('cron');

const token = process.env.DISCORD_TOKEN;

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const sendMessageWithAttachment = (imageName, message = '') => {
    const guild = client.guilds.cache.get('662843741203333140');
    const channel = guild.channels.cache.get('662843741203333143');

    const attachment = new MessageAttachment(`assets/${imageName}`);
    const embed = new MessageEmbed()
        .setImage((`attachment://${imageName}`))
        .setDescription(message)

    channel.send({embeds: [embed], files: [attachment]});
};

const registerCron = (cronExpression, onTick) => {
    return new cron.CronJob(cronExpression,
        onTick,
        null,
        true,
        'America/Argentina/Buenos_Aires');
};

client.once('ready', () => {
    const crons = [
        {expression: "0 30 8 * * 1", onTick: () => sendMessageWithAttachment("monday-already.jpg", "Chupala Napster")},
        {expression: "0 30 8 * * 3", onTick: () => sendMessageWithAttachment("wednesday.jpg")},
        {expression: "0 0 18 * * 5", onTick: () => sendMessageWithAttachment("weeknd.gif")}
    ];

    crons.forEach(({expression, onTick}) => registerCron(expression, onTick));

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(token);

// https://discord.com/api/oauth2/authorize?client_id=986745016682684496&permissions=2147665920&scope=bot%20applications.commands
