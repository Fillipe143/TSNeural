import { describe, expect, it } from "vitest";
import { NeuralNetwork, ReLU } from "../src";

describe("Create NeuralNetwork", () => {
    it("should be able to create an NeuralNetwork", () => {
        const layerSizes = [2, 2];
        const activationFunc = new ReLU();

        expect(new NeuralNetwork(layerSizes, activationFunc)).instanceOf(NeuralNetwork);
    });

    it("should not be able to create a NeuralNetwork", () => {
        const layerSizes = [];
        const activationFunc = new ReLU();

        expect(() => new NeuralNetwork(layerSizes, activationFunc)).toThrow();
    });
});

describe("NeuralNetwork generated properties", () => {
    const layerSizes = [2, 3, 2];
    const activationFunc = new ReLU();

    const neuralNetwork = new NeuralNetwork(layerSizes, activationFunc);
    const properties = neuralNetwork.properties;

    it("should be have the correct number of layers", () => {
        expect(properties.layers.length).toEqual(layerSizes.length - 1);
    });

    it("should be have a correct activation type", () => {
        expect(properties.activation).toEqual(activationFunc.type);
    });
});