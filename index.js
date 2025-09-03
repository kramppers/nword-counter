const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
require('dotenv').config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Store word counts for each user
const wordCounts = new Map(); // Map<userId, Map<word, count>>
const targetWords = config.targetWords;

// Build variant-aware regex for counting words
function escapeRegexLiteral(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildVariantRegex(baseWord) {
    const lower = baseWord.toLowerCase();
    if (lower === 'nigga') {
        // Matches: nigga, n1gga, niggas, niggaz, n1ggas, n1ggaz
        return /\bn[i1]gg[a4](?:s|z)?\b/gi;
    }
    if (lower === 'nigger') {
        // Matches: nigger, n1gger, niggere, n1ggere, niggers, n1ggers
        return /\bn[i1]gg[e3][r2](?:e|s|z)?\b/gi;
    }
    // Fallback exact word with boundaries
    return new RegExp(`\\b${escapeRegexLiteral(lower)}\\b`, 'gi');
}

// Load existing data if available
const dataFile = path.join(__dirname, 'wordCounts.json');
try {
    if (fs.existsSync(dataFile)) {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        // Convert old format to new format if needed

        // Check if data[0][1] is an object (new format) or a number (old format)
        if (data.length > 0 && Array.isArray(data[0]) && data[0].length === 2) {
            const secondElement = data[0][1];
            if (typeof secondElement === 'object' && secondElement !== null) {
                // New format: [[userId, {word: count, word2: count2}]]
    
                data.forEach(([userId, userWordsData]) => {
                    const userWords = new Map();
                    // Ensure all values are numbers
                    for (const [word, count] of Object.entries(userWordsData)) {
                        const numericCount = typeof count === 'number' ? count : parseInt(count) || 0;
                        userWords.set(word, numericCount);

                    }
                    wordCounts.set(userId, userWords);
                });

            } else {
                // Old format: [[userId, count]]

                data.forEach(([userId, count]) => {
                    const userWords = new Map();
                    // Ensure count is a number
                    const numericCount = typeof count === 'number' ? count : parseInt(count) || 0;
                    userWords.set(targetWords[0], numericCount);
                    wordCounts.set(userId, userWords);
                    
                });

            }
        } else {
    
        }
    }
} catch (error) {
    
}

// Save data to file
function saveData() {
    try {
        const data = Array.from(wordCounts.entries()).map(([userId, userWords]) => {
            return [userId, Object.fromEntries(userWords)];
        });
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'counter') {
        const user = interaction.options.getUser('user') || interaction.user;
        
        const userWords = wordCounts.get(user.id) || new Map();
        // Combine counts for both nigga and nigger
        const niggaCount = userWords.get('nigga') || 0;
        const niggerCount = userWords.get('nigger') || 0;
        const totalCount = niggaCount + niggerCount;
        
        const embed = new EmbedBuilder()
            .setColor(config.colors.counter)
            .setTitle(`🧑🏿‍🦲 Nigga Counter`)
            .setDescription(`**${user.username}** has used the words **nigga/nigger** **${totalCount}** times.`)
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: '🧑🏿‍🦲 Nigga Counter Bot' });

        await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'leaderboard') {
        // Create combined leaderboard for nigga/nigger

        const combinedLeaderboard = [];
        for (const [userId, userWords] of wordCounts.entries()) {
            const niggaCount = userWords.get('nigga') || 0;
            const niggerCount = userWords.get('nigger') || 0;
            const totalCount = niggaCount + niggerCount;
            
            if (totalCount > 0) {
                combinedLeaderboard.push([userId, totalCount]);
            }
        }
        
        
        const sortedUsers = combinedLeaderboard
            .sort(([,a], [,b]) => b - a)
            .slice(0, config.leaderboardSize);

        if (sortedUsers.length === 0) {

            await interaction.reply(config.messages.noData);
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(config.colors.leaderboard)
            .setTitle(`🏆 Top ${config.leaderboardSize} - cei mai buni nigeri`)
            .setTimestamp()
            .setFooter({ text: '🧑🏿‍🦲 Nigga Counter Bot' });

        let description = '';
        for (let i = 0; i < sortedUsers.length; i++) {
            const [userId, count] = sortedUsers[i];
            const user = await client.users.fetch(userId).catch(() => ({ username: 'Unknown User' }));
            const medal = i < 3 ? config.medals[i] : `${i + 1}.`;
            description += `${medal} **${user.username}** a zis **nigga** de ${count} ori\n`;
        }

        embed.setDescription(description);
        await interaction.reply({ embeds: [embed] });
    }



    if (interaction.commandName === 'duma') {

        try {
            // Load jokes from maribu.json
            const jokesFile = path.join(__dirname, 'maribu.json');

            
            if (fs.existsSync(jokesFile)) {
                const jokesData = JSON.parse(fs.readFileSync(jokesFile, 'utf8'));
                const jokes = jokesData.dume || [];
                
                if (jokes.length > 0) {
                    // Get random joke
                    const randomIndex = Math.floor(Math.random() * jokes.length);
                    const randomJoke = jokes[randomIndex];
                    
                    const embed = new EmbedBuilder()
                        .setColor('#ff6b6b') // Red color for jokes
                        .setTitle('😄 Duma aleatorie')
                        .setDescription(randomJoke)
                        .setTimestamp()
                        .setFooter({ text: '🧑🏿‍🦲 Nigga Counter Bot' });
                    
                    await interaction.reply({ embeds: [embed] });
                } else {
                    await interaction.reply('Nu am găsit glume în fișierul maribu.json!');
                }
            } else {
                await interaction.reply('Fișierul maribu.json nu a fost găsit!');
            }
        } catch (error) {
            console.error('Error loading joke:', error);
            await interaction.reply('A apărut o eroare la încărcarea glumei!');
        }
    }
});

// Count words in messages
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    let foundWords = false;
    
    for (const targetWord of targetWords) {
        const wordRegex = buildVariantRegex(targetWord);
        const matches = content.match(wordRegex);

        if (matches) {
            const userId = message.author.id;
            
            // Initialize user's word map if it doesn't exist
            if (!wordCounts.has(userId)) {
                wordCounts.set(userId, new Map());
            }
            
            const userWords = wordCounts.get(userId);
            const baseKey = targetWord.toLowerCase();
            const currentCount = userWords.get(baseKey) || 0;
            const newCount = currentCount + matches.length;
            userWords.set(baseKey, newCount);
            
            foundWords = true;
        }
    }
    
    // Save data after each update if any words were found
    if (foundWords) {
        saveData();
    }
});

// Import ready handler
const { handleReady } = require('./ready.js');

// Register slash commands when bot is ready
client.once('clientReady', async () => {
    // Use custom ready handler
    handleReady(client);
    
    try {
        // Register slash commands globally
        const commands = [
            {
                name: 'counter',
                description: `Shows how many times a user has used the word nigga`,
                options: [
                    {
                        name: 'user',
                        description: 'User to check (defaults to yourself)',
                        type: 6, // USER type
                        required: false
                    }
                ]
            },
            {
                name: 'leaderboard',
                description: `Shows top users for combined words (nigga/nigger) usage`,
            },

            {
                name: 'duma',
                description: `Gives you a random joke from maribu.json`,
            }
        ];

        const result = await client.application.commands.set(commands);
    } catch (error) {
        console.error('❌ Error registering slash commands:', error);
    }
});

// Error handling
client.on('error', error => {
    console.error('Bot error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
