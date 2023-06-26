import { Activation } from "./ActivationFunction";
import { LayerProperties } from "./LayerProperties";

export type NeuralProperties = {
    layers: LayerProperties[];
    activation: Activation;
};