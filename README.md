# formobx

A library for removing a lot of boilerplate from forms with Mobx. Inspired by
[redux-form](https://github.com/erikras/redux-form) and following a similar
API, but using [MobX](https://github.com/mobxjs/mobx) for state management.

Written with typescript and built into plain JS. All examples can be ported to
Javascript by removing any type information that may be present.

Work in progress - for full usage, look at the example projects.

## Basic Usage:

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
  initialValues: {
    email: 'a@b.com'
  },
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
  <MyForm title='Hello Formobx' />
);
```

Formobx uses the structure of your form to build a backing object. Arrays and
complex objects are supported by using the `ArrayField` and `ObjectField`
classes.

## Docs

### Stores

Stores are the backing objects behind fields which hold their data. This
includes their values and errors, and any other information that may need to be
tracked.

Shared properties for all stores:

- `parent` - get the parent store for this field
- `value` - get the value of this field
- `errors` - get the errors on this field
- `clearErrors()` - clear the errors for this field
- `setErrors(errors)` - set the errors for this field. Should be shaped
according to children with each end value being an array of strings.

`FieldStore`

- `asProps` - returns an object with the properties `onChange` and `value` set
for use with regular input fields
- `setValue(val)` - set the value for the field

`ArrayStore`

`ObjectStore`

`FormStore`

- `submitting` - a boolean representing whether this form is currently being
submitted
- `setSubmitting(submitting)` - set the submitting property for the form

### Factories

Factories are functions which take a React component and return a new wrapped
version of the component which receives some additional props. Components
created using these factories must be rendered with a `name` (or `names`) prop
unless it is rendered inside an `ArrayField`. This name determines the key the
value of this field will be under in the backing object for the form.

`field`

Added props: `name (string), field (FieldStore)`

`multiField`

Added props: `names (string[]), fields (Object with FieldStore values)`

`meta`

The meta factory passes the field representing the parent field to the wrapped
component, allowing you to display errors for array and object fields, for
example.

Added props: `field (ArrayStore | ObjectStore | FormStore)`

`form`

The form factory is special in that it returns another factory to wrap your
component with. This is so you can pass in additional options for configuring
the form.

- `initialValues` - an object shaped like the backing form object where each
value is the starting value of the field.
- `onSubmit(event, ...otherArgs)` - a function which receives the form object and any other args
you pass through when calling the onSubmit function passed as a prop to the
wrapped component.

Added props: `form (FormStore), onSubmit ((event, ...otherArgs) => void)`

### Components

`ArrayField`

React component representing an array in the form. Any components created with
the factories above will be registered to the array if they are rendered inside
it at any level of nesting. Their ordering in the array will be the same as
that of the markup. Immediate children of the `ArrayField` do not need a name
to be specified.

`ObjectField`

React component representing an object in the form. Any components created with
the factories above will be registered to the object if they are rendered inside
it at any level of nesting. They will be placed under the key given by their
name prop.
