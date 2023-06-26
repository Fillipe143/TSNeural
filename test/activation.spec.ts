import { expect, test } from "vitest";
import { Activation, Sigmoid } from "../src";
import { getActivationInstanceOf } from "../src/utils";

test("is returning activation class instance correctly", () => {
    const activation: Activation = Activation.SIGMOID;
    const activationFunc = getActivationInstanceOf(activation);

    expect(activationFunc).instanceOf(Sigmoid);
});