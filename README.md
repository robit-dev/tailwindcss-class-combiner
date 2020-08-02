# What is this?

`tailwindcss-class-combiner` is a simple utility for combining and overriding class names
in React components. On top of that, it also allows you to override existing Tailwind
CSS classes in the component.

# Installation

This utility can be installed using npm:
`npm i tailwindcss-class-combiner --save`

# Usage

For any component that you want to be able to override default classes on, import `mergeClasses`
from the package. Next, modify the component to accept a prop for the new classes. 
Then add a `const` in your return method that will contain the default classes
for the element in the markup that you want to be overridable. Finally, set that element's
class name like so `className={ mergeClasses(defaultClasses, className) }`.

Here's a simple `Card` component that uses the utility:

```
import mergeClasses from "robit-dev/tailwindcss-class-combiner"

const Card = ({ children, className }) => {
    const defaultClasses = 'rounded-xl p-4 bg-white'
    return (
        <div className={ mergeClasses(defaultClasses, className) }>
            { children }
        </div>
    )
}

export default Card
```

Then, when using the component elsewhere, we'll simply provide some new classes via the `className` 
prop.

```
<Card className="m-4 p-8">
    This is a Card component with added and overridden classes!
</Card>
```

The resulting classes would then be:

```
class="rounded-xl p-8 bg-white m-4"
```

Notice how the new class `m-4` was added to the class list, while the `p-4` tailwindcss class 
of the original component is now replaced with the matching tailwind class type we passed in,
`p-8`.

# How does this work with tailwindcss?

This utility splits class names on the hyphens, in order to be able to accurately replace 
existing tailwindcss class names. For instance, there are many class names that control
padding in css (`p-2`, `p-4`, `p-8`, etc) but they all start with `p-`. Because of this
we can override default tailwindcss classes in a component by matching and then replacing
based on the class prefix. This method also preserves screen size, and state directives
like `lg:` or `hover:` because it only splits and replaces on exact matches preceeding a 
hyphen.

## License
This code is released under the MIT License.

## Stack
<b>Built with</b> [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

MIT © [Robit Development, LLC](https://robit.dev)