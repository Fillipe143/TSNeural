export class InvalidOutputsSizeError extends Error {
    public name: string = "InvalidOutputsSizeError";

    constructor(message: string = "The number of expected outputs must be equal to the number of neural network outputs.") {
        super(message);
    }
}