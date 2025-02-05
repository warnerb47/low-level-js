interface Flag {
    type: 'wildcard' | 'groupElement' | 'element';
    quantifier: 'exactlyOne' | 'zeroOrMore' | 'oneOrMore' | 'zeroOrOne';
    value?: string;
    states?: Flag[];
}

function last(stack: Array<Flag[]>) {
    return stack[stack.length - 1];
}


export function parse(text: string) {
    const stack: Flag[] = [];
    let i = 0;
    while (i < text.length) {
        const token = text[i];
        const lastElement = stack?.[stack.length - 1];
        if (token === '.') {
            if (!lastElement || lastElement.quantifier !== 'exactlyOne') {
                throw new Error('Quantifer must follow an unquantified element or group');
            }
            lastElement.quantifier = 'exactlyOne';
            i++;
        } else if (token === '?') {
            if (!lastElement || lastElement.quantifier !== 'exactlyOne') {
                throw new Error('Quantifer must follow an unquantified element or group');
            }
            lastElement.quantifier = 'zeroOrOne';
            i++;
        } else if (token === '*') {
            if (!lastElement || lastElement.quantifier !== 'exactlyOne') {
                throw new Error('Quantifer must follow an unquantified element or group');
            }
            lastElement.quantifier = 'zeroOrMore';
            i++;
        } else if (token === '+') {
            if (!lastElement || lastElement.quantifier !== 'exactlyOne') {
                throw new Error('Quantifer must follow an unquantified element or group');
            }
            lastElement.quantifier = 'oneOrMore';
            i++;
        } else {
            stack.push({
                type: 'element',
                quantifier: 'exactlyOne',
                value: token,
            });
            i++;
        }
    }
    console.log(stack);
}
