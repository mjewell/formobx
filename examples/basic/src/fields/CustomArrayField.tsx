import { ObjectField, meta } from '../../../../lib';
import { SimpleField } from './SimpleField';
import { observable } from 'mobx';
import * as React from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';

let id = 0;
const arrayFields = observable<number>([]);

export const CustomArrayField = meta(
  ({ field }) => {
    const fields = arrayFields.map(f => {
      return (
        <Row key={f}>
          <ObjectField>
            <Col xs={8}>
              <SimpleField name='arrayField' type='text' />
            </Col>
            <Col xs={4} style={{ marginTop: '1.8em' }}>
              <Button onClick={() => arrayFields.remove(f)}>Remove</Button>
            </Col>
          </ObjectField>
        </Row>
      );
    });

    return (
      <Grid>
        {fields}
        <Button onClick={() => arrayFields.push(id++)}>Add Another</Button>
      </Grid>
    );
  }
);
