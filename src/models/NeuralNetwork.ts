import { InvalidNumberOfNodesError, InvalidOutputsSizeError, LayerSizeInsufficientError } from "../errors";
import { Activation, ActivationFunction, DataPoint, NeuralProperties } from "../types";
import { calculateNodeCost, getActivationInstanceOf } from "../utils";
import { Layer } from "./Layer";

export class NeuralNetwork {
    private layers: Layer[];
    private activationFunc: ActivationFunction;

    public get properties(): NeuralProperties {
        return {
            layers: this.layers.map((layer) => layer.properties),
            activation: this.activationFunc.type
        };
    }

    constructor(layerSizes: number[], activation: Activation = Activation.SIGMOID) {
        if (layerSizes.length < 2) {
            throw new LayerSizeInsufficientError();
        }

        this.layers = new Array(layerSizes.length - 1).fill(null).map((_, i) => {
            return new Layer(layerSizes[i], layerSizes[i + 1]);
        });

        this.activationFunc = getActivationInstanceOf(activation);
    }

    public loadProps(props: NeuralProperties): void {
        const { layers, activation } = props;

        if (layers.length < 1) {
            throw new LayerSizeInsufficientError("The minimum amount of layer sizes is 1.");
        }

        const nLayers: Layer[] = new Array(layers.length);

        for (let i = 0; i < nLayers.length; i++) {
            if (i === nLayers.length - 1 || layers[i].numNodesOut == layers[i + 1].numNodesIn) {
                const { numNodesIn, numNodesOut } = layers[i];
                nLayers[i] = new Layer(numNodesIn, numNodesOut);
                nLayers[i].loadProps(layers[i]);
            } else {
                throw new InvalidNumberOfNodesError();
            }
        }

        this.layers = nLayers;
        this.activationFunc = getActivationInstanceOf(activation);
    }

    public calculateOutputs(inputs: number[]): number[] {
        this.layers.forEach((layer, i) => {
            inputs = layer.calculateOutputs(inputs, this.activationFunc);
        });

        return inputs;
    }

    public classifyOutput(inputs: number[]): number {
        const outputs = this.calculateOutputs(inputs);
        return outputs.indexOf(Math.max(...outputs));
    }

    public calculateSingleCost(dataPoint: DataPoint): number {
        const { inputs, expectedOutputs } = dataPoint;
        const outputs = this.calculateOutputs(inputs);

        if (expectedOutputs.length !== outputs.length) {
            throw new InvalidOutputsSizeError();
        }

        const cost = outputs.reduce((cost, output, i) => {
            return cost + calculateNodeCost(output, expectedOutputs[i]);
        }, 0);

        return cost;
    }

    public calculateTotalCost(data: DataPoint[]): number {
        if (data.length <= 0) return 0;

        const cost = data.reduce((cost, dataPoint) => {
            return cost + this.calculateSingleCost(dataPoint);
        }, 0);

        return cost / data.length;
    }

    public learn(trainingData: DataPoint[], learnRate: number): void {
        const h = 0.00001;
        const originalCost = this.calculateTotalCost(trainingData);

        this.layers.forEach((layer) => {
            layer.weights.forEach((_, i) => {
                layer.weights[i] += h;

                const deltaCost = this.calculateTotalCost(trainingData) - originalCost;
                layer.weights[i] -= h;

                layer.costGradientW[i] = deltaCost / h;
            });

            layer.biases.forEach((_, i) => {
                layer.biases[i] += h;

                const deltaCost = this.calculateTotalCost(trainingData) - originalCost;
                layer.biases[i] -= h;

                layer.costGradientB[i] = deltaCost / h;
            });

            layer.applyGradient(learnRate);
        });
    }
}