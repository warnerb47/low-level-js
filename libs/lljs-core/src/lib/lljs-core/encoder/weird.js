const zero = '+[]';
const one = '+!![]';
const encodeNumber = (n) => {
    if (n === 0) {
        return zero;
    }
    return Array.from({length: n}, ()=> one).join(' + ')
};
const caracters = {};
const encodeString = (s) => s.split('').map(char => {
    if (!(char in caracters)) {
        const code = char.charCodeAt(0);
        return `([]+[])[${encodeString('constructor')}][${encodeString('fromCharCode')}](${encodeNumber(code)})`;
    }
    return caracters[char]
}).join('+')
caracters.zero = `${encodeNumber(0)}`;
caracters.one = `${encodeNumber(1)}`;
caracters.seven = `${encodeNumber(7)}`;
caracters.a = `((+{})+[])[${encodeNumber(1)}]`;
caracters.b = `({}+[])[${encodeNumber(2)}]`;
caracters.o =`({}+[])[${encodeNumber(1)}]`;
caracters.j = `({}+[])[${encodeNumber(3)}]`;
caracters.e = `({}+[])[${encodeNumber(4)}]`;
caracters.c = `({}+[])[${encodeNumber(5)}]`;
caracters.t = `({}+[])[${encodeNumber(6)}]`;
caracters[' '] = `({}+[])[${encodeNumber(7)}]`;
caracters.f = `(![]+[])[${encodeNumber(0)}]`;
caracters.s = `(![]+[])[${encodeNumber(3)}]`;
caracters.r = `(!![]+[])[${encodeNumber(1)}]`;
caracters.u = `(!![]+[])[${encodeNumber(2)}]`;
caracters.i = `((${encodeNumber(1)}/${encodeNumber(0)})+[])[${encodeNumber(3)}]`;
caracters.n = `((${encodeNumber(1)}/${encodeNumber(0)})+[])[${encodeNumber(1)}]`;
caracters.y = `((${encodeNumber(1)}/${encodeNumber(0)})+[])[${encodeNumber(7)}]`;
caracters.S = `([]+([]+[])[${encodeString('constructor')}])[${encodeNumber(9)}]`;
caracters.g = `([]+([]+[])[${encodeString('constructor')}])[${encodeNumber(14)}]`;
caracters.p = `([]+(/-/)[${encodeString('constructor')}])[${encodeNumber(14)}]`;
caracters['\\'] = `(/\\\\/+[])[${encodeNumber(1)}]`;
caracters.d = `(${encodeNumber(13)})[${encodeString('toString')}](${encodeNumber(14)})`;
caracters.h = `(${encodeNumber(17)})[${encodeString('toString')}](${encodeNumber(18)})`;
caracters.m = `(${encodeNumber(22)})[${encodeString('toString')}](${encodeNumber(23)})`;
caracters.C = `((()=>{})[${encodeString('constructor')}](${encodeString('return escape')})()(${caracters['\\']}))[${encodeNumber(2)}]`;
const compile = code => `(()=>{})[${encodeString('constructor')}](${encodeString(code)})()`

// console.log(eval(compile('console.log("Hello word !!");')));
console.log(compile('console.log("Hello word !!");'));