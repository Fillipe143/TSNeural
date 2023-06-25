export function gaussianRandom(mean: number, standardDeviation: number): number {
    const x1 = 1 - Math.random();
    const x2 = Math.random();

    const y1 = Math.sqrt(-2.0 * Math.log(x1)) * Math.cos(2 * Math.PI * x2);
    return y1 * standardDeviation + mean;
}