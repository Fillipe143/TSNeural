import { ActivationFunction, ActivationFunctionType } from "../../types";

export class Tanh implements ActivationFunction {
    public get type(): ActivationFunctionType {
        return "tanh";
    }

    public activate(x: number): number {
        // f(x) = (e^x - e^-x) / (e^x + e^-x) || f(x) = (e^2x - 1) / (e^2x + 1)
        const e2 = Math.exp(2 * x);
        return (e2 - 1) / (e2 + 1);
    }
}