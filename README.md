# use-routed

> Ridiculously simplified way to render routed components, useful for quick prototypes or small projects.

<!-- [![NPM](https://img.shields.io/npm/v/use-routed.svg)](https://www.npmjs.com/package/use-routed) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) -->

<!-- ## Install

```bash
npm install --save use-routed
``` -->

## Usage

```tsx
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
  const example = useRouted(routes);
  return <div className="app">{example}</div>;
}
```

## License

MIT © [renemonroy](https://github.com/renemonroy)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
