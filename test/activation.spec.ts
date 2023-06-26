import { expect, test } from "vitest";
import { ActivationFunctionType, Sigmoid } from "../src";
import { getActivationInstanceOf } from "../src/utils";

test("is returning activation class instance correctly", () => {
    const type: ActivationFunctionType = "sigmoid";
    const activation = getActivationInstanceOf(type);

    expect(activation).instanceOf(Sigmoid);
});