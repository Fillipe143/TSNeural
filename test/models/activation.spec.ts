import { describe, expect, it } from "vitest";
import { Sigmoid } from "../../src";

describe("Sigmoid", () => {
    const x = 0;
    const sigmoid = new Sigmoid();

    it("activate should return a valid number", () => {
        const xActivated = sigmoid.activate(x);
        expect(!isNaN(xActivated)).toEqual(true);
    });
    
    it("derivative should return a valid number", () => {
        const xDerivated = sigmoid.derivative(x);
        expect(!isNaN(xDerivated)).toEqual(true);
    });
});