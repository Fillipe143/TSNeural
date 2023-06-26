import { ReLU, Sigmoid, Tanh } from "../models";
import { Activation, ActivationFunction } from "../types";

export function getActivationInstanceOf(type: Activation): ActivationFunction {
    switch (type) {
        case Activation.RELU: return new ReLU();
        case Activation.SIGMOID: return new Sigmoid();
        case Activation.TANH: return new Tanh();
    }
}