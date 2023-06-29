import { Activation, ActivationFunction } from "../../types";

export class Sigmoid implements ActivationFunction {
    public get type(): Activation {
        return Activation.SIGMOID;
    }

    public activate(x: number): number {
        // f(x) = 1 / (1 + e^-x)
        return 1 / (1 + Math.exp(-x));
    }

    public derivative(x: number): number {
        return 0;
    }
    
}