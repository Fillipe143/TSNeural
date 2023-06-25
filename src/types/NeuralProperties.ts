import { ActivationFunction } from "./ActivationFunction";
import { LayerProperties } from "./LayerProperties";

export type NeuralProperties = {
    layers: LayerProperties[];
    activationFunc: ActivationFunction;
};