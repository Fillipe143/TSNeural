import { expect, test } from "vitest";
import { Layer } from "../src";

test("create a layer", () => {
    const numNodesIn = 2;
    const numNodesOut = 3;

    const layer = new Layer(numNodesIn, numNodesOut);
    const layerProps = layer.properties;

    expect(layerProps.numNodesIn).equal(numNodesIn);
    expect(layerProps.numNodesOut).equal(numNodesOut);
    expect(layerProps.weights.length).equal(numNodesIn * numNodesOut);
    expect(layerProps.biases.length).equal(numNodesOut);
});