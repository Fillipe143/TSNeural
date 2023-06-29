import { describe, expect, it } from "vitest";
import { Sigmoid, Tanh } from "../../src";

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

describe("Tanh", () => {
    const x = 0;
    const tanh = new Tanh();

    it("activate should return a valid number", () => {
        const xActivated = tanh.activate(x);
        expect(!isNaN(xActivated)).toEqual(true);
    });
    
    it("derivative should return a valid number", () => {
        const xDerivated = tanh.derivative(x);
        expect(!isNaN(xDerivated)).toEqual(true);
    });
});