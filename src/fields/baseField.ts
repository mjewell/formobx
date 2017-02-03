import { IContext } from '../types';
import { Component, PropTypes } from 'react';

export abstract class BaseField<Props> extends Component<Props, {}> {
  public static contextTypes = {
    parentStore: PropTypes.object.isRequired
  };
  public context: IContext;

  constructor(props: Props, context: IContext) {
    super(props, context);

    if (!context.parentStore) {
      throw new Error('Formobx Fields must be used inside a component decorated with formobx');
    }
  }

  public abstract render(): JSX.Element;
}
