import { ParentStore } from '../stores';
import { ChildField } from './childField';
import { IFieldProps } from './field';
import { PropTypes } from 'react';
import * as React from 'react';

export abstract class WrapperField<Props> extends ChildField<Props & IFieldProps> {
  public static childContextTypes = {
    parentStore: PropTypes.object
  };
  protected abstract store: ParentStore;

  public getChildContext() {
    return { parentStore: this.store };
  }

  public render() {
    return <div>{this.props.children}</div>;
  }
}
