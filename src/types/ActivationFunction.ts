export enum Activation {
    SIGMOID, TANH, RELU
}

export interface ActivationFunction {
    get type(): Activation;
    activate(x: number): number;
    derivative(x: number): number;
}
