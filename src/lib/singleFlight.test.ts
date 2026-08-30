import { describe, expect, it, vi } from "vitest";
import { createSingleFlight } from "./singleFlight";

describe("createSingleFlight", () => {
  it("shares one active task across concurrent calls", async () => {
    let resolveTask!: (value: string) => void;
    const task = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolveTask = resolve;
        })
    );
    const run = createSingleFlight(task);

    const first = run();
    const second = run();

    expect(task).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);

    resolveTask("saved");
    await expect(first).resolves.toBe("saved");

    const third = run();
    expect(task).toHaveBeenCalledTimes(2);
    resolveTask("saved again");
    await expect(third).resolves.toBe("saved again");
  });
});
