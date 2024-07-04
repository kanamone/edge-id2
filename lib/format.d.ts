export type Pattern = {
    characters: string;
    repeats?: number;
};
export type Format = Pattern[];
export declare function createFormat(template: string, definitions: {
    [key: string]: string;
}, compress: boolean): Format;
