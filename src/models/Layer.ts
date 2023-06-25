import { InvalidInputSizeError, InvalidPositiveIntegerError } from "../errors";
import { ActivationFunctionType, LayerProperties } from "../types";
import { gaussianRandom, getActivationInstanceOf } from "../utils";

export class Layer {
    private numNodesIn: number;
    private numNodesOut: number;

    private weights: number[];
    private biases: number[];

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
    }

    public calculateOutputs(inputs: number[], activationType: ActivationFunctionType): number[] {
        if (inputs.length !== this.numNodesIn) {
            throw new InvalidInputSizeError();
        }

        const { activate } = getActivationInstanceOf(activationType);
        const outputs: number[] = new Array(this.numNodesOut);

        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {

            let weightedInput = this.biases[nodeOut];
            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                weightedInput += inputs[nodeIn] * this.weights[this.getWeightFlatIndex(nodeIn, nodeOut)];
            }

            outputs[nodeOut] = activate(weightedInput);
        }

        return outputs;
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