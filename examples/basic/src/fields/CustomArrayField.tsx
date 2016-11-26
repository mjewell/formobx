import { IWrappedMetaProps, ObjectField, meta } from '../../../../lib';
import { SimpleField } from './SimpleField';
import { observable } from 'mobx';
import * as React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';

class Field extends React.Component<{} & IWrappedMetaProps, {}> {
  private id = 0;
  private arrayFields = observable<number>([]);

  public render() {
    const fields = this.arrayFields.map(f => {
      return (
        <Row key={f}>
          <ObjectField>
            <Col xs={8}>
              <SimpleField name='arrayField' type='text' />
            </Col>
            <Col xs={4} style={{ marginTop: '1.8em' }}>
              <Button onClick={() => this.arrayFields.remove(f)}>Remove</Button>
            </Col>
          </ObjectField>
        </Row>
      );
    });

    return (
      <Grid>
        {fields}
        <Button onClick={() => this.arrayFields.push(this.id++)}>Add Another</Button>
      </Grid>
    );
  }
}

export const CustomArrayField = meta(Field);
