import { LayerSizeInsufficientError } from "../errors";
import { ActivationFunction, NeuralProperties } from "../types";
import { Layer } from "./Layer";
import { Sigmoid } from "./activationFunctions/Sigmoid";

export class NeuralNetwork {
    private layers: Layer[];
    private activationFunc: ActivationFunction;

    public get properties(): NeuralProperties {
        return {
            layers: this.layers.map((layer) => layer.properties),
            activation: this.activationFunc.type
        };
    }

    constructor(layerSizes: number[], activationFunc: ActivationFunction = new Sigmoid()) {
        if (layerSizes.length < 2) {
            throw new LayerSizeInsufficientError();
        }

        this.layers = new Array(layerSizes.length - 1).fill(null).map((_, i) => {
            return new Layer(layerSizes[i], layerSizes[i + 1]);
        });

        this.activationFunc = activationFunc;
    }
}