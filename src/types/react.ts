import { ComponentClass, StatelessComponent } from 'react';

export type ReactComponent<Props> = (
  ComponentClass<Props> |
  StatelessComponent<Props>
);
