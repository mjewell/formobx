import { form } from '../../../lib';
import * as Promise from 'bluebird';

export interface IFormProps {
  title: string;
  initialPasswordValue?: string;
}

export const FormobxForm = form<IFormProps>({
  initialValues: props => ({
    email: 'my@email.com',
    password: props.initialPasswordValue,
    original: 'test',
    upcased: 'TEST'
  }),
  onSubmit: () => Promise.delay(500).then(() => {
    throw {
      _base: ['the form has some issues'],
      email: ['is wrong somehow'],
      password: [
        'is not strong enough',
        'and something else'
      ],
      object: {
        _base: ['errors on the object'],
        nestedFieldA: ['and inside the object too']
      },
      array: [ // TODO: support base errors here
        [
          { arrayField: ['array errors too'] }
        ]
      ]
    };
  })
});
