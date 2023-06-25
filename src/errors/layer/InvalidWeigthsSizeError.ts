export class InvalidWeigthsSizeError extends Error {
    public name: string = "InvalidWeigthsSizeError";

    constructor(message: string = "The size of weigths must be equal to an numNodesIn*numNodesOut") {
        super(message);
    }
}