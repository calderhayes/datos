import * as React from 'react';
import {ExampleForm, IExampleFormData} from './example-form';
import * as Datos from '../src';

export interface IExample1Props {

}

export interface IExample1State {
  formData: IExampleFormData;
  isLoading: boolean;
  serverErrors: Array<string>;
  fieldErrorMessageMap: Datos.FieldMessageMap;
}

export class Example1 extends React.Component<IExample1Props, IExample1State> {

  private serverError: HTMLInputElement = null;
  private existingLastName: HTMLInputElement = null;

  constructor(props: IExample1Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    // tslint:disable-next-line:no-magic-numbers
    const birthDate = new Date();
    this.state = {
      formData: {
        firstName: 'bobz',
        middleName: '',
        lastName: '',
        birthDate,
        allGood: false
      },
      isLoading: false,
      serverErrors: new Array<string>(),
      fieldErrorMessageMap: new Datos.FieldMessageMap()
    };
  }

  public render() {
    return (
      <div>        
        <h2>Example 1</h2>
        <div className='row'>
          <div className='form-group col-xs-12'>
            <label htmlFor='serverError'>Populate this text box to simulate a general server error</label>
            <input
              ref={(input: HTMLInputElement) => this.serverError = input}
              type='text'
              className='form-control'
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group col-xs-12'>
            <label htmlFor='existingLastName'>Populate this text box to simulate an existing last name</label>
            <input
              ref={(input: HTMLInputElement) => this.existingLastName = input}
              type='text'
              className='form-control'
            />
          </div>
        </div>
        <ExampleForm
          defaultFormData={this.state.formData}
          isLoading={this.state.isLoading}
          fieldMessageMap={this.state.fieldErrorMessageMap}
          formMessages={this.state.serverErrors}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

  private onSubmit(formData: IExampleFormData) {
    console.info('Sending FORM data', formData);

    const serverErrors = new Array<string>();
    if (this.serverError && this.serverError.value) {
      serverErrors.push(this.serverError.value);
    }

    // Simulating some server side error messages
    const fieldMessageMap = new Datos.FieldMessageMap();
    if (this.existingLastName && this.existingLastName.value) {
      if (formData.lastName.toLowerCase() === this.existingLastName.value.toLowerCase()) {
        fieldMessageMap.add('lastName', {
          message: `Last name ${this.existingLastName.value} already exists!`,
          preventSubmitError: false
        });
      }
    }

    this.setState({
      isLoading: true,
      serverErrors,
      fieldErrorMessageMap: fieldMessageMap
    },
    async () => {
      // Simulate loading
      await new Promise((resolve, _) => {
        // tslint:disable-next-line:no-magic-numbers
        setTimeout(() => resolve(), 1000);
      });
      this.setState({
        isLoading: false
      });
    });
  }

}
