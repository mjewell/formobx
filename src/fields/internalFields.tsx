import { ArrayStore, ObjectStore } from '../stores';
import { BaseField } from './baseField';
import { ChildField } from './childField';
import { createInternalField } from './createInternalField';
import { ParentField } from './parentField';
import * as React from 'react';

export class ChildrenRenderer<Props> extends React.Component<Props, {}> {
  public render() {
    return <div>{this.props.children}</div>;
  }
}

export const ArrayField = BaseField(ChildField(createInternalField(ArrayStore)(ParentField(ChildrenRenderer))));
export const ObjectField = BaseField(ChildField(createInternalField(ObjectStore)(ParentField(ChildrenRenderer))));
