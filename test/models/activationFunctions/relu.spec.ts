import { expect, test } from "vitest";
import { ReLU } from "../../../src";

test("is activating number using relu correctly", () => {
    // ReLu(-0.5) = 0;
    // ReLu(0) = 0;
    // ReLu(0.5) = 0.5;

    const relu = new ReLU();

    let activateInput = relu.activate(-0.5);
    expect(activateInput).equals(0);

    activateInput = relu.activate(0);
    expect(activateInput).equals(0);

    activateInput = relu.activate(0.5);
    expect(activateInput).equals(0.5);
});