import * as React from 'react';

export interface ISubmitButtonProps {
  canSubmit: boolean;
  onSubmit: () => void;
  className?: string;
}

export class SubmitButton extends React.Component<ISubmitButtonProps, {}> {

  public render() {
    return (
      <button
        type='button'
        disabled={!this.props.canSubmit}
        onClick={this.props.onSubmit}
        className={this.props.className || ''}
        >{this.props.children}</button>
    );
  }

}
