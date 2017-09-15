
export const noop = () => { /* Do nothing */ };

export interface IHTMLEvent {
  target: {
    type: string;
    name: string;
    checked?: boolean;
    value?: string;
  };
  persist(): void;
}

export interface IFieldMessage {
  message: string;
  preventSubmitError: boolean;
}
