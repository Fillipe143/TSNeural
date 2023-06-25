import { ActivationFunction, ActivationFunctionType } from "../../types";

export class ReLU implements ActivationFunction {
    public get type(): ActivationFunctionType {
        return "relu";
    }

    public activate(x: number): number {
        // f(x) = x, if x > 0; f(x) = 0, if x <= 0
        return Math.max(0, x);
    }
}