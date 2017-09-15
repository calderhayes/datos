import * as React from 'react';
import {ExampleForm, IExampleFormData} from './example-form';

export interface IExample1Props {

}

export interface IExample1State {
  formData: IExampleFormData;
}

export class Example1 extends React.Component<IExample1Props, IExample1State> {

  constructor(props: IExample1Props) {
    super(props);

    // tslint:disable-next-line:no-magic-numbers
    const birthDate = new Date(1988, 12, 13);
    this.state = {
      formData: {
        firstName: 'bob',
        middleName: '',
        lastName: '',
        birthDate
      }
    };
  }

  public render() {
    return (
      <div>
        <h2>Example 1</h2>
        <ExampleForm
          formData={this.state.formData}
          isLoading={false}
          fieldErrorMessageMap={{}}
          formErrorMessages={new Array<string>()}
          lastTimeFieldUpdated={(new Date()).getTime()}
          // onBlur={() => { /* noop */ }}
          // onSubmit={() => { /* noop */ }}
          validator={() => { return {}; }}
        />
      </div>
    );
  }

}
