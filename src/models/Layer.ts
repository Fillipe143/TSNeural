import { InvalidPositiveIntegerError } from "../errors";
import { LayerProperties } from "../types";
import { gaussianRandom } from "../utils";

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

    private createArrayWithRandomValues(length: number): number[] {
        return new Array(length).fill(0).map(() => {
            return gaussianRandom(0, 1);
        });
    }
}