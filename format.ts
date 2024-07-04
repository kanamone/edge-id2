export type Pattern = {
	characters: string;
	repeats?: number;
};

export type Format = Pattern[];

export function format(
    template: string,
    definitions: { [key: string]: string },
    compress: boolean,
): Format {
    const format: Format = template.split("").map((f) => {
        return {
            characters: definitions[f] || f,
        };
    });

    if (!compress) {
        return format;
    }

    return format.reduceRight((list, pattern) => {
        const head = list[0];
        if (list.length > 0 && head.characters === pattern.characters) {
            list[0] = Object.assign({}, pattern, {
                repeats: (pattern.repeats || 1) + (head.repeats || 1),
            });
            return list;
        }
        list.unshift(pattern);
        return list;
    }, [] as Format);
}

