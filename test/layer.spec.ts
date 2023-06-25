import { describe, expect, it } from "vitest";
import { Layer } from "../src";
import { InvalidPositiveIntegerError } from "../src/errors";

describe("Create Layer", () => {
    it("should be able to create a Layer", () => {
        const numNodesIn = 2;
        const numNodesOut = 3;

        expect(new Layer(numNodesIn, numNodesOut)).instanceOf(Layer);
    });

    it("should be thrown InvalidPositiveIntegerError", () => {
        const numNodesIn = -1;
        const numNodesOut = 3;

        expect(() => new Layer(numNodesIn, numNodesOut)).toThrow(InvalidPositiveIntegerError);
    });

    it("should be thrown InvalidPositiveIntegerError", () => {
        const numNodesIn = 2.5;
        const numNodesOut = 3;

        expect(() => new Layer(numNodesIn, numNodesOut)).toThrow(InvalidPositiveIntegerError);
    });
});

describe("Layer generated properties", () => {
    const numNodesIn = 2;
    const numNodesOut = 3;

    const layer = new Layer(numNodesIn, numNodesOut);
    const properties = layer.properties;

    it("should be have the correct numNodesIn value", () => {
        expect(properties.numNodesIn).toEqual(numNodesIn);
    });

    it("should be have the correct numNodesOut value", () => {
        expect(properties.numNodesOut).toEqual(numNodesOut);
    });

    it("should be have the correct number of weights", () => {
        expect(properties.weights.length).toEqual(numNodesIn * numNodesOut);
    });

    it("should be have the correct number of biases", () => {
        expect(properties.biases.length).toEqual(numNodesOut);
    })
});