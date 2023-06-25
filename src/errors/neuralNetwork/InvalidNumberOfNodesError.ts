export class InvalidNumberOfNodesError extends Error {
    public name: string = "InvalidNumberOfNodesError";

    constructor(message: string = "The number of nodes in the output must be equal to the number of nodes in the next input.") {
        super(message);
    }
}