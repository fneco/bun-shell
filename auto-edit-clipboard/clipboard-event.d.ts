declare module "clipboard-event" {
  declare const clipboardEvent: {
    startListening(): void;
    stopListening(): void;
    on(event: "change", cb: () => void): void;
  } & EventEmitter;

  export default clipboardEvent;
}
