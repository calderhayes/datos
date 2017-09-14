
export const noop = () => { /* Do nothing */ };

export interface IErrorable {
  errorMessage?: string;
  errorClassName?: string;
  containerClassName?: string;
  errorContainerClassName?: string;
}
