module.exports = {
    // Cuvintele țintă pentru numărare (case insensitive)
    // Poți specifica un singur cuvânt sau o listă de cuvinte
    targetWords: process.env.TARGET_WORDS ? 
        process.env.TARGET_WORDS.split(',').map(word => word.trim()) : 
        ['nigga'],
    
    // Prefix-ul bot-ului (pentru comenzi legacy, dacă dorești)
    prefix: process.env.BOT_PREFIX || '!',
    
    // Culorile pentru embed-uri
    colors: {
        counter: '#0099ff',      // Albastru pentru comanda counter
        leaderboard: '#ff9900',  // Portocaliu pentru leaderboard
        stats: '#00ff00',        // Verde pentru statistici
        error: '#ff0000',        // Roșu pentru erori
        multiWord: '#9b59b6'     // Violet pentru comenzi cu mai multe cuvinte
    },
    
    // Emoji-uri pentru leaderboard
    medals: ['🥇', '🥈', '🥉'],
    
    // Numărul de utilizatori afișați în leaderboard
    leaderboardSize: 3,
    
    // Mesaje personalizate
    messages: {
        noData: 'Nu există date de utilizare disponibile încă.',
        error: 'A apărut o eroare. Te rog încearcă din nou.',
        counting: 'Numărătoare activă pentru cuvintele:',
        botReady: 'Bot-ul este gata! Conectat ca:',
        commandsRegistered: 'Comenzile slash au fost înregistrate cu succes!',
        wordNotFound: 'Cuvântul specificat nu este monitorizat.',
        wordList: 'Cuvintele monitorizate:'
    }
};
