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

export class ExampleForm extends Datos.BaseForm<IExampleFormData, IExampleFormProps, {}> {

  public render() {

    return (
      <form className='form-group'>

        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <Datos.Input
            type='text'
            name='first-name'
            className='form-control'
            value={this.props.formData.firstName}
          />
        </div>

      </form>
    );

  }

}
