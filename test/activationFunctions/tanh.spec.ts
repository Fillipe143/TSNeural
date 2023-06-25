import { expect, test } from "vitest";
import { Tanh } from "../../src";

test("is activating number using tanh correctly", () => {
    // Tanh(0) = 0;

    const tanh = new Tanh();
    const activateInput = tanh.activate(0);

    expect(activateInput).equals(0);
});