export class LayerSizeInsufficientError extends Error {
    public name: string = "LayerSizeInsufficientError";

    constructor(message: string = "The minimum amount of layer sizes is 2.") {
        super(message);
    }
}