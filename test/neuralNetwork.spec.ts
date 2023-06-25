import { describe, expect, it } from "vitest";
import { InvalidNumberOfNodesError, LayerSizeInsufficientError, NeuralNetwork, NeuralProperties, ReLU } from "../src";

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

describe("NeuralNetwork load properties", () => {
    const layerSizes = [2, 3, 2];
    const activationFunc = new ReLU();

    const neuralNetwork = new NeuralNetwork(layerSizes, activationFunc);

    it("should be update properties", () => {
        const newProps: NeuralProperties = {
            layers: [{
                numNodesIn: 1,
                numNodesOut: 1,
                weights: [0],
                biases: [0]
            }],
            activation: "sigmoid"
        };

        neuralNetwork.loadProps(newProps);
        expect(neuralNetwork.properties).toEqual(newProps);
    });

    it("should be thrown LayerSizeInsufficientError", () => {
        const newProps: NeuralProperties = {
            layers: [],
            activation: "sigmoid"
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
            activation: "sigmoid"
        };

        expect(()=> neuralNetwork.loadProps(newProps)).toThrow(InvalidNumberOfNodesError);
    });
});