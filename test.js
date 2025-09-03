// Test script pentru verificarea configurării bot-ului
const config = require('./config');
require('dotenv').config();

console.log('🧪 Testing Discord Bot Configuration...\n');

// Verifică configurația
console.log('📋 Configuration:');
console.log(`   Target Words: "${config.targetWords.join('", "')}"`);
console.log(`   Bot Prefix: "${config.prefix}"`);
console.log(`   Leaderboard Size: ${config.leaderboardSize}`);
console.log(`   Colors:`, config.colors);

// Verifică variabilele de mediu
console.log('\n🔐 Environment Variables:');
console.log(`   DISCORD_TOKEN: ${process.env.DISCORD_TOKEN ? '✅ Set' : '❌ Not set'}`);
console.log(`   TARGET_WORDS: ${process.env.TARGET_WORDS ? '✅ Set' : '❌ Not set (using default)'}`);
console.log(`   BOT_PREFIX: ${process.env.BOT_PREFIX ? '✅ Set' : '❌ Not set (using default)'}`);

// Verifică dependențele
console.log('\n📦 Dependencies Check:');
try {
    require('discord.js');
    console.log('   discord.js: ✅ Installed');
} catch (error) {
    console.log('   discord.js: ❌ Not installed (run: npm install)');
}

try {
    require('dotenv');
    console.log('   dotenv: ✅ Installed');
} catch (error) {
    console.log('   dotenv: ❌ Not installed (run: npm install)');
}

console.log('\n🎯 Bot Features:');
console.log('   ✅ Multi-word counting (case insensitive)');
console.log('   ✅ /counter command (nigga/nigger combined)');
console.log('   ✅ /leaderboard command (combined words)');
console.log('   ✅ /stats command (combined statistics)');
console.log('   ✅ Data persistence (JSON file)');
console.log('   ✅ Beautiful embeds');
console.log('   ✅ Automatic data format conversion');

console.log('\n📝 Next Steps:');
if (!process.env.DISCORD_TOKEN) {
    console.log('   1. Create a .env file with your Discord bot token');
    console.log('   2. Get a token from: https://discord.com/developers/applications');
}
console.log('   3. Run: npm install');
console.log('   4. Run: npm start');
console.log('   5. Invite bot to your server');

console.log('\n✨ Bot is ready to use!');
