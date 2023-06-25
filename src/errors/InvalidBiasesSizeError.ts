export class InvalidBiasesSizeError extends Error {
    public name: string = "InvalidBiasesSizeError";

    constructor(message: string = "The size of biases must be equal to an numNodesOut") {
        super(message);
    }
}