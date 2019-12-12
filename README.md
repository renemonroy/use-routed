# 🛣️ use-routed

> Ridiculously simplified way to render routed components. Useful for quick prototypes or small projects.

<!-- [![NPM](https://img.shields.io/npm/v/use-routed.svg)](https://www.npmjs.com/package/use-routed) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) -->

<!-- ## Install

```bash
npm install --save use-routed
``` -->

## Usage

```jsx
import React from "react";
import useRouted, { Link, navigate } from "use-routed";

function Home() {
  const [username, setUsername] = React.useState("");
  return (
    <section>
      <p>What's your name?</p>
      <input type="text" onChange={e => setUsername(e.target.value)} />
      <button onClick={() => username && navigate(`/${username}`)}>Ok</button>
    </section>
  );
}

function User({ username }) {
  return (
    <section>
      <p>Hi {username}!</p>
      <Link href="/">Return</Link>
    </section>
  );
}

const routes = {
  "/": Home,
  "/:username": User
};

export default function App() {
  const routedComponent = useRouted(routes);
  return <div className="app">{routedComponent}</div>;
}
```

### Example

The example is a simple Gists Previewer that shows the public gists from a given user. Run `yarn start` at **example** folder.

### `useRouted`

Pass the available routes and the hook will return a component based on the window location.

```jsx
const routedComponent = useRouted({ "/": Home, "/about" About });
```

### `Link`

Navigates between pages by using the pathanmes set. It replaces anchor's default behavior.

```jsx
<Link href="/about">
```

### `navigate`

Simulates navigation by updating popstate from a given URL. Use any of the paths passed on the initial configuration.

```jsx
navigate("/about");
```

### `paginate`

Helper that creates a pagination object from a set of given items. Use it with `React.useMemo` for perfomance boost.

```jsx
const { currentItems, numOfPages } = React.useMemo(
  () => paginate(someItems, somePage, itemsPerPage),
  [someItems, somePage, itemsPerPage]
);
```

## License

MIT © [renemonroy](https://github.com/renemonroy)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
