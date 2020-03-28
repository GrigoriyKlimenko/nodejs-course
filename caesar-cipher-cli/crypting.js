module.exports = function cryptString(chunk, action, shift) {

    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''),
        inAlphabet,
        outAlphabet;
    if (action === 'encode') {
        inAlphabet = alphabet.slice();
        alphabet = alphabet.concat(inAlphabet.slice(0, shift));
        alphabet.splice(0, shift);
        outAlphabet = alphabet;
    } else {
        outAlphabet = alphabet.slice();
        alphabet = alphabet.concat(outAlphabet.slice(0, shift));
        alphabet.splice(0, shift);
        inAlphabet = alphabet;
    }

    let cryptedString =
        chunk.toString()
            .split('')
            .map(symbol => crypting(symbol))
            .join('');

    function crypting(symbol) {
        let cryptedSymbol = symbol;
        
        if ((symbol === symbol.toUpperCase()) & (inAlphabet.includes(symbol.toLowerCase()))) {
            cryptedSymbol = outAlphabet[inAlphabet.indexOf(symbol.toLowerCase())].toUpperCase();
        } else if (inAlphabet.includes(symbol.toLowerCase())){
            cryptedSymbol = outAlphabet[inAlphabet.indexOf(symbol.toLowerCase())]
        }

        return cryptedSymbol;
    }

    return cryptedString;
};
