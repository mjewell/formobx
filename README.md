# formobx

A library for removing a lot of boilerplate from forms with Mobx. Inspired by
[redux-form](https://github.com/erikras/redux-form) and following a similar API,
but using [MobX](https://github.com/mobxjs/mobx) for state management.

Work in progress - for full usage, look at the example projects.

## Usage:

```jsx
// A basic input field component
import { field } from 'formobx';

interface MyFieldProps {
  type: string;
}

const MyField = field<MyFieldProps>(
  ({ field, type, name }) => (
    <div>
      <label>{name}: </label>
      <input
        {...field.asProps}
        type={type}
      />
    </div>
  )
);
```

```jsx
// Make a formobx wrapper for your form
import { form } from 'formobx';

interface MyFormProps {
  title: string;
}

const MyFormWrapper = form<MyFormProps>({
  onSubmit: makeLoginRequest
})
```

```jsx
// Wrap your form component with it
const MyForm = MyFormWrapper(
  ({ form, onSubmit, title }) => (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      <MyField name="email" type="text" />
      <MyField name="password" type="password" />
      <button type="submit" disabled={form.submitting}>
        Log In
      </button>
    </form>
  )
);
```

```jsx
// render the form
const App = () => (
  <MyForm />
);
```

Formobx uses the structure of your form to build a backing object. Arrays and
complex objects are supported by using the `ArrayField` and `ObjectField`
classes.
