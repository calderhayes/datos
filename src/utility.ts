
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

export enum FieldMessageType {
  INFO = "INFO",
  ERROR = "ERROR",
  WARN = "WARN"
}

export interface IFieldMessage {
  message: string;
  preventSubmitError: boolean;
  fieldMessageType?: FieldMessageType
}
