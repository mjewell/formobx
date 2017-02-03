import { Field, IFieldProps } from '../fields';
import { FieldStore } from '../stores';
import { observer } from 'mobx-react';
import { ComponentClass, StatelessComponent } from 'react';
import * as React from 'react';

export interface IWrappedFieldProps extends IFieldProps {
  field: FieldStore;
}

export function field<Props>(
  FieldComponent: (
    ComponentClass<Props & IWrappedFieldProps> |
    StatelessComponent<Props & IWrappedFieldProps> |
    string
  )
): ComponentClass<Props & IFieldProps> {
  let render: () => JSX.Element;

  if (typeof FieldComponent !== 'string') {
    const WrappedComponent = observer(FieldComponent as ComponentClass<Props & IWrappedFieldProps>);
    render = function () { return <WrappedComponent {...this.props} field={this.store} />; };
  } else if (FieldComponent === 'input') {
    render = function () { return <input {...this.props} {...this.store.asProps} />; };
  } else {
    throw new Error(`Unsupported string component type '${FieldComponent}'`);
  }

  return class FormobxField extends Field<Props> {
    private boundRender = render.bind(this);

    public render() {
      return this.boundRender();
    }
  };
}
