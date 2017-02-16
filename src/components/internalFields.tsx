import { ArrayStore, ObjectStore } from '../stores';
import { IFieldData, createWithStore, withFieldsRegistered, withParentStore, withParentStoreInContext } from '../wrappers';
import * as React from 'react';

export class ChildrenRenderer<Props> extends React.Component<Props, {}> {
  public render() {
    return <div>{this.props.children}</div>;
  }
}

export const ArrayField = (
  withParentStore(
    withFieldsRegistered(
      createWithStore(ArrayStore)(
        withParentStoreInContext<{}, ArrayStore>(
          ChildrenRenderer
        )
      )
    )
  )
);

export const ObjectField = (
  withParentStore(
    withFieldsRegistered(
      createWithStore(ObjectStore)(
        withParentStoreInContext<{}, ObjectStore>(
          ChildrenRenderer
        )
      )
    )
  )
);
