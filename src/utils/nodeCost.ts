export function calculateNodeCost(output: number, expectedOutput: number): number {
    const error = expectedOutput - output;
    return error ** 2;
}