import { ActivationFunctionType } from "./ActivationFunction";
import { LayerProperties } from "./LayerProperties";

export type NeuralProperties = {
    layers: LayerProperties[];
    activation: ActivationFunctionType;
};