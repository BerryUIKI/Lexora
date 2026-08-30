export function createSingleFlight<T>(task: () => Promise<T>): () => Promise<T> {
  let activeTask: Promise<T> | null = null;

  return () => {
    if (activeTask) return activeTask;

    activeTask = task().finally(() => {
      activeTask = null;
    });
    return activeTask;
  };
}
