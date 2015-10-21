const natural = require('natural');


module.exports = function(config) {
    const NGrams = natural.NGrams;

    return function(scribe) {
        const unWantedWords = ["the", "and", "but", "then", "a", "of",
                              "than", "an ", " in ", " on ", "by", "he", "she",
                              "had", "gone", "that", "from", "that", "from",
                              "to", "who", "whose"];

        const replacer = (replace, text) => {
            const str = " " + replace + " ";
            return text.replace(new RegExp(str, 'ig'), " ");
        };

        const nGramsCommand = new scribe.api.Command('ngrams');

        nGramsCommand.execute = () => {
            const text = unWantedWords.reduce((current, replace) => {
                return replacer(replace, current);
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
