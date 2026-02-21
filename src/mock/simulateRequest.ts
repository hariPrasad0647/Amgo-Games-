type SimulateOptions = {
  delay?: number;
  failureRate?: number;
};

export function simulateRequest<T>(
  data: T,
  options: SimulateOptions = {}
): Promise<T> {
  const { delay = 800, failureRate = 0 } = options;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error("Simulated network failure"));
      } else {
        resolve(data);
      }
    }, delay);
  });
}