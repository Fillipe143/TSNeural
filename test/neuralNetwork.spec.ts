import { describe, expect, it } from "vitest";
import { Activation, InvalidNumberOfNodesError, LayerSizeInsufficientError, NeuralNetwork, NeuralProperties, ReLU } from "../src";

describe("Create NeuralNetwork", () => {
    it("should be able to create an NeuralNetwork", () => {
        const layerSizes = [2, 2];
        const activation = Activation.RELU;

        expect(new NeuralNetwork(layerSizes, activation)).instanceOf(NeuralNetwork);
    });

    it("should not be able to create a NeuralNetwork", () => {
        const layerSizes = [];
        const activation = Activation.RELU;

        expect(() => new NeuralNetwork(layerSizes, activation)).toThrow();
    });
});

describe("NeuralNetwork generated properties", () => {
    const layerSizes = [2, 3, 2];
    const activation = Activation.RELU;

    const neuralNetwork = new NeuralNetwork(layerSizes, activation);
    const properties = neuralNetwork.properties;

    it("should be have the correct number of layers", () => {
        expect(properties.layers.length).toEqual(layerSizes.length - 1);
    });

    it("should be have a correct activation type", () => {
        expect(properties.activation).toEqual(activation);
    });
});

describe("NeuralNetwork load properties", () => {
    const layerSizes = [2, 3, 2];
    const activation = Activation.RELU;

    const neuralNetwork = new NeuralNetwork(layerSizes, activation);

    it("should be update properties", () => {
        const newProps: NeuralProperties = {
            layers: [{
                numNodesIn: 1,
                numNodesOut: 1,
                weights: [0],
                biases: [0]
            }],
            activation: Activation.SIGMOID
        };

        neuralNetwork.loadProps(newProps);
        expect(neuralNetwork.properties).toEqual(newProps);
    });

    it("should be thrown LayerSizeInsufficientError", () => {
        const newProps: NeuralProperties = {
            layers: [],
            activation: Activation.SIGMOID
        };

        expect(() => neuralNetwork.loadProps(newProps)).toThrow(LayerSizeInsufficientError);
    });

    it("should be thrown InvalidNumberOfNodesError", () => {
        const newProps: NeuralProperties = {
            layers: [
                {
                    numNodesIn: 1,
                    numNodesOut: 2,
                    weights: [0, 0],
                    biases: [0, 0]
                },
                {
                    numNodesIn: 1,
                    numNodesOut: 2,
                    weights: [0, 0],
                    biases: [0, 0]
                }
            ],
            activation: Activation.SIGMOID
        };

        expect(() => neuralNetwork.loadProps(newProps)).toThrow(InvalidNumberOfNodesError);
    });
});