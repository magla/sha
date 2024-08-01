declare module '*.worker.ts' {
  class Worker extends globalThis.Worker {}
  export default Worker;
}
