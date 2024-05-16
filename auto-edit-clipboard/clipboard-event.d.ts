declare module "clipboard-event" {
  declare const clipboardEvent: {
    startListening(): void;
    stopListening(): boolean;
    on(event: "change", cb: () => void): void;
  } & import("events").EventEmitter; // https://stackoverflow.com/a/51114250

  export default clipboardEvent;
}
