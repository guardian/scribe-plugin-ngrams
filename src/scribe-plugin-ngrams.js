const natural = require('natural');


module.exports = function(config) {
    const NGrams = natural.NGrams;

    return function(scribe) {
        let unWords = [
            (text) => text.replace(/ the /g, " "),
            (text) => text.replace(/ and /g, " "),
            (text) => text.replace(/ but /g, " "),
            (text) => text.replace(/ then /g, " "),
            (text) => text.replace(/ a /g, " "),
            (text) => text.replace(/ of /g, " "),
            (text) => text.replace(/ an /g, " "),
            (text) => text.replace(/ in /g, " "),
            (text) => text.replace(/ on /g, " "),
            (text) => text.replace(/ by /g, " "),
            (text) => text.replace(/ he /g, " "),
            (text) => text.replace(/ had /g, " "),
            (text) => text.replace(/ gone /g, " "),
            (text) => text.replace(/ that /g, " "),
            (text) => text.replace(/ from /g, " "),
            (text) => text.replace(/ to /g, " ")
        ];

        const nGramsCommand = new scribe.api.Command('ngrams');

        nGramsCommand.execute = () => {
            const text = unWords.reduce((val, fn) => {
                return fn(val);
            }, scribe.el.innerText);

            const bigrams = NGrams.bigrams(text);
            const ngrams = NGrams.ngrams(text, 1);

            return {
                bigrams: bigrams,
                ngrams: ngrams
            };
        };

        nGramsCommand.queryEnable = () => {
            return true;
        };

        scribe.commands['ngrams'] = nGramsCommand;
    };
};
