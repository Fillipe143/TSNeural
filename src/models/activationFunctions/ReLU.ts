import { Activation, ActivationFunction } from "../../types";

export class ReLU implements ActivationFunction {
    public get type(): Activation {
        return Activation.RELU;
    }

    public activate(x: number): number {
        // f(x) = x, if x > 0; f(x) = 0, if x <= 0
        return Math.max(0, x);
    }

    public derivative(x: number): number {
        return x > 0 ? 1 : 0;
    }
}