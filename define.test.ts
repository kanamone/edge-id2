import { define } from "./define";
import { format } from "./format";

describe("define", () => {
    const id2 = define({
        format: format('XXXX', {
            X: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }, false),
    })

    it("should be stringify correctly", () => {
        expect(id2.stringify(0)).toBe('0000');
        expect(id2.stringify(1)).toBe('0001');
        expect(id2.stringify(9999)).toBe('07PR');
        expect(id2.stringify(99999)).toBe('255R');
        expect(id2.stringify(1679615)).toBe('ZZZZ');
    });

    it("should be parse correctly", () => {
        expect(id2.parse('0000')).toBe(0);
        expect(id2.parse('0001')).toBe(1);
        expect(id2.parse('07PR')).toBe(9999);
        expect(id2.parse('255R')).toBe(99999);
        expect(id2.parse('ZZZZ')).toBe(1679615);
    });
});
