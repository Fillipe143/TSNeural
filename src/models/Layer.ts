import { InvalidBiasesSizeError, InvalidInputSizeError, InvalidPositiveIntegerError, InvalidWeigthsSizeError } from "../errors";
import { ActivationFunction, LayerProperties } from "../types";
import { gaussianRandom } from "../utils";

export class Layer {
    private numNodesIn: number;
    private numNodesOut: number;

    private weights: number[];
    private biases: number[];

    private costGradientW: number[];
    private costGradientB: number[];

    public get properties(): LayerProperties {
        return {
            numNodesIn: this.numNodesIn,
            numNodesOut: this.numNodesOut,
            weights: this.weights,
            biases: this.biases
        };
    }

    constructor(numNodesIn: number, numNodesOut: number) {
        if (numNodesIn <= 0 || numNodesOut <= 0 || !Number.isInteger(numNodesIn) || !Number.isInteger(numNodesOut)) {
            throw new InvalidPositiveIntegerError();
        }

        this.numNodesIn = numNodesIn;
        this.numNodesOut = numNodesOut;

        this.weights = this.createArrayWithRandomValues(numNodesIn * numNodesOut);
        this.biases = this.createArrayWithRandomValues(numNodesOut);

        this.costGradientW = new Array(numNodesIn * numNodesOut);
        this.costGradientB = new Array(numNodesOut);
    }

    public loadProps(props: LayerProperties): void {
        const { numNodesIn, numNodesOut, weights, biases } = props;

        if (numNodesIn <= 0 || numNodesOut <= 0 || !Number.isInteger(numNodesIn) || !Number.isInteger(numNodesOut)) {
            throw new InvalidPositiveIntegerError();
        }

        if (weights.length !== numNodesIn * numNodesOut) {
            throw new InvalidWeigthsSizeError();
        }

        if (biases.length !== numNodesOut) {
            throw new InvalidBiasesSizeError();
        }

        this.numNodesIn = numNodesIn;
        this.numNodesOut = numNodesOut;
        this.weights = weights
        this.biases = biases;
        this.costGradientW = new Array(numNodesIn * numNodesOut);
        this.costGradientB = new Array(numNodesOut);
    }

    public calculateOutputs(inputs: number[], activationFunc: ActivationFunction): number[] {
        if (inputs.length !== this.numNodesIn) {
            throw new InvalidInputSizeError();
        }

        const outputs: number[] = new Array(this.numNodesOut);

        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {

            let weightedInput = this.biases[nodeOut];
            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                weightedInput += inputs[nodeIn] * this.weights[this.getWeightFlatIndex(nodeIn, nodeOut)];
            }

            outputs[nodeOut] = activationFunc.activate(weightedInput);
        }

        return outputs;
    }

    public applyGradient(learnRate: number): void {
        if (learnRate <= 0) {
            throw new InvalidPositiveIntegerError();
        }
        
        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            this.biases[nodeOut] -= this.costGradientB[nodeOut] * learnRate;

            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                const flatIndex = this.getWeightFlatIndex(nodeIn, nodeOut);
                this.weights[flatIndex] -= this.costGradientW[flatIndex] * learnRate;
            }
        }
    }

    private getWeightFlatIndex(nodeIn: number, nodeOut: number): number {
        const flatIndex = nodeOut * this.numNodesIn + nodeIn;
        return flatIndex;
    }

    private createArrayWithRandomValues(length: number): number[] {
        return new Array(length).fill(0).map(() => {
            return gaussianRandom(0, 1);
        });
    }
}