
export const noop = () => { /* Do nothing */ };

export interface IErrorable {
  errorMessage?: string;
  errorClassName?: string;
  containerClassName?: string;
  errorContainerClassName?: string;
}

export interface IHTMLEvent {
  target: {
    type: string;
    name: string;
    checked?: boolean;
    value?: string;
  };
  persist(): void;
}
