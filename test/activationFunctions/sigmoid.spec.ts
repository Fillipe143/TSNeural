import { expect, test } from "vitest";
import { Sigmoid } from "../../src";

test("is activating number using sigmoid correctly", () => {
    // Sigmoid(0) = 0.5;

    const sigmoid = new Sigmoid();
    
    const activateInput = sigmoid.activate(0);
    expect(activateInput).equals(0.5);
});