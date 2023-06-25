export type ActivationFunctionType = "sigmoid" | "tanh" | "relu";

export interface ActivationFunction {
    get type(): ActivationFunctionType;
    activate(x: number): number;
}
