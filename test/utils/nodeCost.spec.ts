import { expect, test } from "vitest";
import { calculateNodeCost } from "../../src/utils";

test("should be return a positive integer", () => {
    const output = 0;
    const expectOutput = 1;

    const cost = calculateNodeCost(output, expectOutput);
    expect(!isNaN(cost) && cost >= 0).toEqual(true);
});