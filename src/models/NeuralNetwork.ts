import { InvalidNumberOfNodesError, LayerSizeInsufficientError } from "../errors";
import { Activation, ActivationFunction, NeuralProperties } from "../types";
import { getActivationInstanceOf } from "../utils";
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
}