import type { Format } from "./format";

export type ConverterOptions = {
	format: Format;
};

export function defineID(options: ConverterOptions) {
	const sequence: string[][] = [];
	for (let i = 0; i < options.format.length; i++) {
		const f = options.format[i];
		const chars = f.characters.split("");
		const repeats = f.repeats || 1;
		for (let j = 0; j < repeats; j++) {
			sequence.push(chars);
		}
	}

	const n = (): number => {
		return options.format
			.map<number>((p) => {
				return p.characters.length ** (p.repeats || 1);
			})
			.reduce((a, b) => a * b, 1);
	}

	const orders = sequence.map((_, i) => sequence.slice(i).reduce((a, b) => a * b.length, 1))

	const stringify = (num: number): string => {
		if (num < 0) {
			throw new Error("negative number is not acceptable.");
		}
		if (n() < num + 1) {
			throw new Error(
				`number of ids exceeded. number of available ids = ${n()}`,
			);
		}
		const digits = orders.map((o, i) => Math.floor(Number((num % o) / (orders[i + 1] || 1))));
		return digits.map((d, i) => sequence[i][d]).join("");
	}

	const parse = (id: string): number => {
		if (id.length !== sequence.length) {
			throw new Error("invalid id length.");
		}

        let error: Error | undefined;
		const digits = id.split("").map((c, i) => {
			const pattern = sequence[i];
			const n = pattern.indexOf(c);
			if (n < 0) {
				error = new Error(
					`invalid id. '${c}' (index = ${i}) is not acceptable in [${pattern.join(
						", ",
					)}].`,
				);
			}
			return n * (orders[i + 1] || 1);
		});

        if (error) {
			throw error;
		}

        return digits.reduce((total, n) => total + n, 0);
	}

	return { n, stringify, parse };
}
