import { ReLU, Sigmoid, Tanh } from "../models";
import { ActivationFunction, ActivationFunctionType } from "../types";

export function getActivationInstanceOf(type: ActivationFunctionType): ActivationFunction {
    switch (type) {
        case "relu": return new ReLU();
        case "sigmoid": return new Sigmoid();
        case "tanh": return new Tanh();
    }
}