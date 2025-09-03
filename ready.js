// ========================================
// 🚀 READY.JS - Configurare personalizabilă pentru pornirea bot-ului
// ========================================

const { ActivityType } = require('discord.js');

// ========================================
// 🎨 CONFIGURĂRI PERSONALIZABILE
// ========================================

const config = {
    // 🌟 Mesajul de pornire (în consolă)
    startupMessage: {
        title: "🧑🏿‍🦲 NIGGA COUNTER BOT",
        subtitle: "Bot-ul este pornit și gata de acțiune!",
        version: "v2.0.0",
        author: "Made with love by regelepariurilor aka krv"
    },

    // 🎭 Status-ul bot-ului (ce apare lângă nume)
    botStatus: {
        // Tipul de activitate (PLAYING, WATCHING, LISTENING, COMPETING)
        type: ActivityType.Watching,
        // Textul status-ului
        text: "for the real niggas",
        // URL pentru streaming (doar pentru STREAMING type)
        url: null
    },

    // 🎨 Culorile pentru mesaje
    colors: {
        success: "\x1b[32m",    // Verde
        info: "\x1b[36m",       // Cyan
        warning: "\x1b[33m",    // Galben
        error: "\x1b[31m",      // Roșu
        reset: "\x1b[0m"        // Reset
    },

    // 📊 Informații despre bot
    botInfo: {
        showUptime: true,       // Afișează timpul de pornire
        showMemoryUsage: true,  // Afișează utilizarea memoriei
        showServerCount: true,  // Afișează numărul de servere
        showUserCount: true     // Afișează numărul de utilizatori
    },

    // 🎵 Mesaje de pornire personalizate (aleatorii)
    startupMessages: [
        "🧑🏿‍🦲 Nigga Counter Bot este gata să numere!",
        "🚀 Bot-ul a pornit cu succes!",
        "⚡ Nigga Counter este online și funcțional!",
        "🎯 Gata să număr cuvintele!",
        "🔥 Bot-ul este pornit și fierbinte!",
        "💪 Nigga Counter este activ și puternic!",
        "🎉 Să înceapă numărătoarea!",
        "🌟 Bot-ul strălucește și este gata!"
    ],

    // 🔧 Configurări avansate
    advanced: {
        enableDebugMode: false,     // Mode debug
        showDetailedLogs: true,     // Log-uri detaliate
        autoRestartOnError: false,  // Restart automat la erori
        maintenanceMode: false      // Mode mentenanță
    }
};

// ========================================
// 🚀 FUNCȚIA PRINCIPALĂ READY
// ========================================

function handleReady(client) {
    const { colors, startupMessage, botStatus, botInfo, startupMessages, advanced } = config;
    
    // 🌟 Mesajul principal de pornire
    console.log('\n' + '='.repeat(60));
    console.log(`${colors.success}${startupMessage.title}${colors.reset}`);
    console.log(`${colors.info}${startupMessage.subtitle}${colors.reset}`);
    console.log(`${colors.warning}Versiunea: ${startupMessage.version}${colors.reset}`);
    console.log(`${colors.info}Autor: ${startupMessage.author}${colors.reset}`);
    console.log('='.repeat(60) + '\n');

    // 🎭 Setează status-ul bot-ului
    if (botStatus.text) {
        client.user.setActivity(botStatus.text, { type: botStatus.type });
        console.log(`${colors.success}✅ Status setat: ${botStatus.type} ${botStatus.text}${colors.reset}`);
    }

    // 📊 Informații despre bot
    if (botInfo.showServerCount) {
        console.log(`${colors.info}🌐 Servere conectate: ${client.guilds.cache.size}${colors.reset}`);
    }
    
    if (botInfo.showUserCount) {
        const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        console.log(`${colors.info}👥 Utilizatori totali: ${totalUsers}${colors.reset}`);
    }

    // 🕐 Timpul de pornire
    if (botInfo.showUptime) {
        const startTime = new Date();
        console.log(`${colors.info}⏰ Timp pornire: ${startTime.toLocaleString('ro-RO')}${colors.reset}`);
    }

    // 💾 Utilizarea memoriei
    if (botInfo.showMemoryUsage) {
        const memoryUsage = process.memoryUsage();
        const memoryMB = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;
        console.log(`${colors.info}💾 Memorie utilizată: ${memoryMB} MB${colors.reset}`);
    }

    // 🎯 Mesaj aleatoriu de pornire
    const randomMessage = startupMessages[Math.floor(Math.random() * startupMessages.length)];
    console.log(`${colors.success}🎯 ${randomMessage}${colors.reset}`);

    // 🔧 Mode debug
    if (advanced.enableDebugMode) {
        console.log(`${colors.warning}🐛 Mode debug activat${colors.reset}`);
    }

    // 🚧 Mode mentenanță
    if (advanced.maintenanceMode) {
        console.log(`${colors.error}🚧 MODE MENTENANȚĂ ACTIVAT${colors.reset}`);
        client.user.setActivity('🚧 Mentenanță', { type: ActivityType.Watching });
    }

    // 📝 Log-uri detaliate
    if (advanced.showDetailedLogs) {
        console.log(`${colors.info}📝 Log-uri detaliate activate${colors.reset}`);
        console.log(`${colors.info}🔍 Cuvinte monitorizate: ${client.targetWords ? client.targetWords.join(', ') : 'N/A'}${colors.reset}`);
    }

    // 🎉 Mesaj final
    console.log('\n' + '='.repeat(60));
    console.log(`${colors.success}🎉 Bot-ul este gata și funcțional!${colors.reset}`);
    console.log('='.repeat(60) + '\n');
}

// ========================================
// 🔧 FUNCȚII UTILITARE
// ========================================

function getUptime() {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor(uptime / 3600) % 24;
    const minutes = Math.floor(uptime / 60) % 60;
    const seconds = Math.floor(uptime % 60);
    
    return `${days}z ${hours}h ${minutes}m ${seconds}s`;
}

function getMemoryInfo() {
    const memoryUsage = process.memoryUsage();
    return {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100,
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100,
        external: Math.round(memoryUsage.external / 1024 / 1024 * 100) / 100
    };
}

// ========================================
// 📤 EXPORT
// ========================================

module.exports = {
    handleReady,
    config,
    getUptime,
    getMemoryInfo
};

// ========================================
// 💡 INSTRUCȚIUNI DE UTILIZARE
// ========================================

/*
🎯 CUM SĂ PERSONALIZEZI ACEST FIȘIER:

1. 🌟 MESAJUL DE PORNIRE:
   - Modifică 'startupMessage' pentru a schimba titlul, subtitlul, etc.

2. 🎭 STATUS-UL BOT-ULUI:
   - Schimbă 'botStatus.text' pentru a modifica ce apare lângă numele bot-ului
   - Modifică 'botStatus.type' pentru a schimba tipul de activitate

3. 🎨 CULORI:
   - Modifică 'colors' pentru a schimba culorile în consolă

4. 📊 INFORMATII:
   - Activează/dezactivează 'botInfo' pentru a afișa informații diferite

5. 🎵 MESAJE ALEATORII:
   - Adaugă/elimină mesaje din 'startupMessages'

6. 🔧 CONFIGURĂRI AVANSATE:
   - Modifică 'advanced' pentru funcționalități suplimentare

7. 🚀 INTEGRARE ÎN INDEX.JS:
   - În index.js, înlocuiește codul din 'client.once('ready')' cu:
   const { handleReady } = require('./ready.js');
   handleReady(client);
*/
