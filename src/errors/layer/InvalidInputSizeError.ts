export class InvalidInputSizeError extends Error {
    public name: string = "InvalidInputSizeError";

    constructor(message: string = "The number of input elements must be equal to the number of layer inputs.") {
        super(message);
    }
}