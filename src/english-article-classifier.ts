// MIT © 2017 azu
export interface ReturnClassifyArticle {
    type: "a" | "an" | "unknown";
    reason: string;
}

export interface classifyArticleOptions {
    forceA?: string[];
    forceAn?: string[];
}

export function classifyArticle(phrase: string, options?: classifyArticleOptions): ReturnClassifyArticle {
    // Getting the first word
    const match = /[\w.-]+/.exec(phrase);
    const word = match ? match[0] : undefined;
    if (word === undefined) {
        return {
            type: "unknown",
            reason: "Not found any phase."
        };
    }

    // User-defined words
    if (options && options.forceA) {
        for (let i = 0; i < options.forceA.length; i++) {
            const forceA = options.forceA[i];
            if (forceA === word) {
                return {
                    type: "a",
                    reason: "User defined words that should be proceeded by 'a'"
                };
            }
        }
    }

    if (options && options.forceAn) {
        for (let i = 0; i < options.forceAn.length; i++) {
            const forceAn = options.forceAn[i];
            if (forceAn === word) {
                return {
                    type: "an",
                    reason: "User defined words that should be proceeded by 'an'"
                };
            }
        }
    }
    const lowerWord = word.toLowerCase();
    // Specific start of words that should be proceeded by 'an'
    const specialAnCaseWords = [
        /^ubuntu/,
        /^ubersexual/,
        /^unilluminated/,
        /^euler/,
        /^hour(?!i)/,
        /^heir/,
        /^honest/,
        /^hono/,
        /^8$/,
        /^11$/
    ];
    for (let i = 0; i < specialAnCaseWords.length; i++) {
        const specialAnCaseWordPattern = specialAnCaseWords[i];
        if (specialAnCaseWordPattern.test(lowerWord)) {
            return {
                type: "an",
                reason: "Specific start of words that should be proceeded by 'an'"
            };
        }
    }
    // Single letter word which should be proceeded by 'an'
    if (lowerWord.length == 1) {
        if ("aefhilmnorsx".indexOf(lowerWord) >= 0) {
            return {
                type: "an",
                reason: "Single letter word which should be proceeded by 'an'"
            };
        } else {
            return {
                type: "a",
                reason: "Single letter word which should be proceeded by 'a'"
            };
        }
    }

    // Special cases where a word that begins with a vowel should be proceeded by 'a'
    const specialACasePattern = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/];
    for (let i in specialACasePattern) {
        if (lowerWord.match(specialACasePattern[i])) {
            return {
                type: "a",
                reason: "Special cases where a word that begins with a vowel should be proceeded by 'a'"
            };
        }
    }

    // Special capital words (UK, UN)
    if (/^U[NK][AIEO]?/.test(word)) {
        return {
            type: "a",
            reason: "Special capital words (UK, UN)"
        };
    } else if (word == word.toUpperCase()) {
        // All Capital words which is not special case would be unknown
        if (/^[A-Z.]+$/.test(word)) {
            return {
                type: "unknown",
                reason: "Capital words which is not special case would be unknown"
            };
        }
        // start with alphabet vowel
        if ("aefhilmnorsx".indexOf(lowerWord[0]) >= 0) {
            return {
                type: "an",
                reason: "Words that begin with a alphabet vowel being proceeded by 'an'"
            };
        } else if ("bcfhjkqrst".indexOf(lowerWord[0]) >= 0) {
            return {
                type: "a",
                reason: "Words that begin with a alphabet vowel being proceeded by 'a'"
            };
        }
    }

    // Basic method of words that begin with a vowel being proceeded by 'an'
    if ("aeiou".indexOf(lowerWord[0]) >= 0) {
        return {
            type: "an",
            reason: "Basic method of words that begin with a vowel being proceeded by 'an'"
        };
    }

    // Instances where y followed by specific letters is proceeded by 'an'
    if (lowerWord.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/)) {
        return {
            type: "an",
            reason: "Instances where y followed by specific letters is proceeded by 'an'"
        };
    }

    return {
        type: "a",
        reason: "Other words that begins with a vowel should be proceeded by 'a'"
    };
}
