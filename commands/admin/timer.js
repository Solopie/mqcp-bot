const Discord = require("discord.js");
const moment = require("moment")
const config = require("../../utils/config");
module.exports = {
    name: "timer",
    description: "Create timer embed that countsdown and pings creator when done",
    admin: true,
    usage: `${config.PREFIX}timer <minutes> [title...]`,
    async execute(msg, args) {
        if(args.length === 0) {
            msg.reply("Please give an amount of minutes as argument")
            return;
        }

        // Ensure minutes is a number
        let isValid = true;
        let minutes = parseInt(args[0]);

        if(isNaN(minutes) || minutes <= 0) {
            msg.reply("Please give a valid number as argument");
            return;
        }

        if(minutes >= 60) {
            msg.reply("No good reason for me to enable timers over 60 minutes");
            return;
        }

        // Check if there is a title given
        let title;
        if(args[1]) {
            title = args.slice(1,args.length).join(" ");
        } else {
            title = "Timer";
        }

        msg.channel.send(`Timer created for ${minutes} minute(s)`);

        // Create embed that will act as timer
        const timerEmbed = new Discord.MessageEmbed()
            .setColor("#0d3b8c")
            .setTitle(title)
            .setDescription(`${minutes} minutes remaining...`)
        
        const oldEmbed = await msg.channel.send(timerEmbed);
        let oldTime = moment.now();
        // Check every second if a minute has passed
        const timerId = setInterval(() => {
            // Check if 1 minute has passed
            if(moment.now() - oldTime >= 60000) {
                oldTime = moment.now()
                minutes -= 1;

                const editedTimerEmbed = new Discord.MessageEmbed(timerEmbed)
                    .setDescription(`${minutes} minutes remaining...`);
                oldEmbed.edit(editedTimerEmbed);
            }

            // Check timer is finished
            if(minutes === 0) {
                clearInterval(timerId);
                timerActive = false;
                // oldEmbed.delete();
                msg.reply("Timer is done!");
            }

        }, 1000);
    },
};