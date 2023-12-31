import { describe, expect, it } from "vitest";
import { Activation, DataPoint, InvalidInputSizeError, InvalidNumberOfNodesError, InvalidOutputsSizeError, LayerSizeInsufficientError, NeuralNetwork, NeuralProperties, ReLU } from "../../src";

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

describe("Calculate outputs", () => {
    const layerSizes = [1, 2];
    const activation = Activation.SIGMOID;

    const neuralNetwork = new NeuralNetwork(layerSizes, activation);

    it("should be the same size as numNodesOut", () => {
        const inputs = [0];
        const outputs = neuralNetwork.calculateOutputs(inputs);

        expect(outputs.length).toEqual(layerSizes.at(-1));
    });

    it("should be throw an exception InvalidInputSizeErro", () => {
        const inputs = [0, 0];
        expect(() => neuralNetwork.calculateOutputs(inputs)).toThrow(InvalidInputSizeError);
    });

    it("should be return an index of outputs", () => {
        const inputs = [0];
        const classification = neuralNetwork.classifyOutput(inputs);

        expect(classification >= 0 && classification < layerSizes[1]).toEqual(true);
    });
});

describe("Calculate costs", () => {
    const layerSizes = [1, 2];
    const activation = Activation.TANH;

    const neuralNetwork = new NeuralNetwork(layerSizes, activation);

    it("should be able to calculate a single cost", () => {
        const dataPoint: DataPoint = {
            inputs: [0],
            expectedOutputs: [0, 1]
        };

        const cost = neuralNetwork.calculateSingleCost(dataPoint);
        expect(!isNaN(cost)).toEqual(true);
    });

    it("should be throw an exception InvalidInputSizeError", () => {
        const dataPoint: DataPoint = {
            inputs: [0, 0],
            expectedOutputs: [0, 1]
        };

        expect(() => neuralNetwork.calculateSingleCost(dataPoint)).toThrow(InvalidInputSizeError);
    });

    it("should be throw an exception InvalidOutputsSizeError", () => {
        const dataPoint: DataPoint = {
            inputs: [0],
            expectedOutputs: [0]
        };

        expect(() => neuralNetwork.calculateSingleCost(dataPoint)).toThrow(InvalidOutputsSizeError);
    });

    it("should be able to calculate a total cost", () => {
        const data: DataPoint[] = [
            {
                inputs: [0],
                expectedOutputs: [0, 1]
            },
            {
                inputs: [1],
                expectedOutputs: [1, 0]
            }
        ];

        const cost = neuralNetwork.calculateTotalCost(data);
        expect(!isNaN(cost)).toEqual(true);
    });

    it("should be return 0", () => {
        const data: DataPoint[] = [];

        const cost = neuralNetwork.calculateTotalCost(data);
        expect(cost).toEqual(0);
    });
});

describe("Learn", () => {
    it("should reduce the cost", () => {
        const layerSize = [1, 2];
        const activation = Activation.RELU;

        const data: DataPoint[] = [
            {
                inputs: [0],
                expectedOutputs: [0, 1]
            },
            {
                inputs: [1],
                expectedOutputs: [1, 0]
            }
        ];

        const neuralNetwork = new NeuralNetwork(layerSize, activation);
        
        const properties = neuralNetwork.properties;
        properties.layers[0].weights.fill(0);
        properties.layers[0].biases.fill(0);
        neuralNetwork.loadProps(properties);

        const originalCost = neuralNetwork.calculateTotalCost(data);

        const learnRate = 0.1;
        neuralNetwork.learn(data, learnRate);

        const newCost = neuralNetwork.calculateTotalCost(data);
        expect(newCost < originalCost).toEqual(true);
    });
});