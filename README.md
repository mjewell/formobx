# formobx

A library for removing a lot of boilerplate from forms with Mobx. Inspired by
[redux-form](https://github.com/erikras/redux-form) and following a similar API,
but using [MobX](https://github.com/mobxjs/mobx) for state management.

## Usage:

```jsx
// A basic input field component
const MyField = observer(({ field, type, name }) => (
  <div>
    <label>{name}: </label>
    <input
      {...field.asProps}
      type={type}
    />
  </div>
));
```

```jsx
// a basic form component
import { Field } from 'formobx';

const MyForm = observer(({ form, onSubmit }) => (
  <form onSubmit={onSubmit}>
    // wrap your field component with a formobx Field
    <Field name="email" type="text" component={MyField} />
    <Field name="password" type="password" component={MyField} />
    <button type="submit" disabled={form.submitting}>
      Log In
    </button>
  </form>
));
```

```javascript
// wrap your form with formobx
import { formobx } from 'formobx';

const FormContainer = formobx(MyForm, {
  onSubmit: makeLogInRequest
});
```

```jsx
// render the form container
const App = () => (
  <FormContainer />
);
```

Each component wrapped with a `Field` will be passed a field object which contains
the current value of the field, and any errors associated with it. Any other props
passed to `Field` will be passed through to the wrapped component.

The form component wrapped with `formobx` will be passed a form object which
contains all of the field objects from the fields rendered inside of it, as well
as the submitting state of the form, and any errors associated with the form
itself. If the `onSubmit` function returns a rejected promise, the errors from
that promise will be attached to the associated fields.

For further info, see the example
