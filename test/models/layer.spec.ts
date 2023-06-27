import { describe, expect, it } from "vitest";
import { Layer, LayerProperties, Sigmoid } from "../../src";
import {
    InvalidBiasesSizeError,
    InvalidInputSizeError,
    InvalidPositiveIntegerError,
    InvalidWeigthsSizeError
} from "../../src/errors";

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

describe("Layer load properties", () => {
    const numNodesIn = 1;
    const numNodesOut = 2;

    const layer = new Layer(numNodesIn, numNodesOut);

    it("should be update properties", () => {
        const newProps: LayerProperties = {
            numNodesIn: 2,
            numNodesOut: 3,
            weights: [0, 0, 0, 0, 0, 0],
            biases: [0, 0, 0]
        };

        layer.loadProps(newProps);
        expect(layer.properties).toEqual(newProps);
    });

    it("should be thrown InvalidPositiveIntegerError", () => {
        const newProps: LayerProperties = {
            numNodesIn: 0,
            numNodesOut: 0,
            weights: [],
            biases: []
        }
        expect(() => layer.loadProps(newProps)).toThrow(InvalidPositiveIntegerError);
    });

    it("should be thrown InvalidWeigthsSizeError", () => {
        const newProps: LayerProperties = {
            numNodesIn: 2,
            numNodesOut: 2,
            weights: [0, 0, 0],
            biases: [0, 0]
        }
        expect(() => layer.loadProps(newProps)).toThrow(InvalidWeigthsSizeError);
    });

    it("should be thrown InvalidBiasesSizeError", () => {
        const newProps: LayerProperties = {
            numNodesIn: 2,
            numNodesOut: 2,
            weights: [0, 0, 0, 0],
            biases: [0]
        }

        expect(() => layer.loadProps(newProps)).toThrow(InvalidBiasesSizeError);
    });
});

describe("Calculate outputs", () => {
    const numNodesIn = 1;
    const numNodesOut = 2;
    const activationFunc = new Sigmoid();

    const layer = new Layer(numNodesIn, numNodesOut);

    it("should be the same size as numNodesOut", () => {
        const inputs = [0];
        const outputs = layer.calculateOutputs(inputs, activationFunc);

        expect(outputs.length).toEqual(layer.properties.numNodesOut);
    });

    it("should be throw an exception InvalidInputSizeError", () => {
        const inputs = [0, 0];
        expect(() => layer.calculateOutputs(inputs, activationFunc)).toThrow(InvalidInputSizeError);
    });
});