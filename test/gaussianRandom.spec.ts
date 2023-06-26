import { expect, test } from "vitest";
import { gaussianRandom } from "../src/utils";

test("it should be return a number", () => {
    const mean = 0;
    const standartDerivation = 1;
    const value: number = gaussianRandom(mean, standartDerivation);
    
    expect(isNaN(value)).toEqual(false);
});