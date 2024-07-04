import type { Format } from "./format";
export type ConverterOptions = {
    format: Format;
};
export declare function defineID(options: ConverterOptions): {
    n: () => number;
    stringify: (num: number) => string;
    parse: (id: string) => number;
};
