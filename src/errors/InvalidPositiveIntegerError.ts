export class InvalidPositiveIntegerError extends RangeError {
    public name: string = "InvalidPositiveIntegerError";

    constructor(message: string = "The argument must be a positive integer.") {
        super(message);
    }
}