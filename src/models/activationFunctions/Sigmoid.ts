import { ActivationFunction } from "../../types";

export class Sigmoid implements ActivationFunction {
    public activate(x: number): number {
        // f(x) = 1 / (1 + e^-x)
        return 1 / (1 + Math.exp(-x));
    }
}