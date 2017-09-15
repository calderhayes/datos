import * as React from 'react';
import * as Datos from '../src';

export interface IExampleFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
}

export interface IExampleFormProps extends Datos.IBaseFormProps<IExampleFormData> {

}

export interface IExampleFormState extends Datos.IBaseFormState<IExampleFormData> {

}

export class ExampleForm extends Datos.BaseForm<IExampleFormData, IExampleFormProps, IExampleFormState> {

  public render() {

    const canSubmit = this.canSubmit && !this.props.isLoading;
    const spinner = this.props.isLoading ?
      <span className="glyphicon glyphicon-refresh spinning"></span> : null;

    return (
      <form className='form'>

        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <Datos.Input
            type='text'
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.onBlur}
            name='firstName'
            value={this.state.formData.firstName}
            fieldMessage={this.state.errorMessages['firstName']}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.errorMessages['firstName']}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <Datos.Input
            type='text'
            disabled={this.props.isLoading}
            errorContainerClassName='has-error'
            className='form-control'
            onBlur={this.onBlur}
            name='lastName'
            value={this.state.formData.lastName}
            fieldMessage={this.state.errorMessages['lastName']}
          />
          <Datos.ValidationMessage
            fieldMessage={this.state.errorMessages['lastName']}
            className='help-block'
            containerClassName='has-error'
          />
        </div>

        <Datos.SubmitButton
          className='btn btn-primary'
          canSubmit={canSubmit}
          onSubmit={() => {
            this.onSubmit();
            console.warn('SUBMITTED', this.state.formData);
           }}
        >
          {spinner} Submit Data
        </Datos.SubmitButton>

      </form>
    );

  }

  protected defaultValidator(formData: IExampleFormData): Datos.IErrorMessageMap {
    console.warn('Validating...', formData);
    const errorMap = {} as Datos.IErrorMessageMap;
    if (formData.firstName.indexOf('z') !== -1) {
      // Some arbitrary tule
      errorMap['firstName'] = {
        message: 'First name cannot contain a "z"!',
        preventSubmitError: true
      };
    }

    if (formData.firstName.length > 0 && formData.lastName.length === 0) {
      console.warn('lastname failure?', formData, formData.firstName, formData.lastName);
      errorMap['lastName'] = {
        message: 'Cannot provide a first name without a last name!',
        preventSubmitError: true
      };
    }

    console.warn('validation complete', errorMap);
    return errorMap;
  }

}
