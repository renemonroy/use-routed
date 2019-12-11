# use-routed

> React hook that renders routed components (pages).

[![NPM](https://img.shields.io/npm/v/use-routed.svg)](https://www.npmjs.com/package/use-routed) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-routed
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-routed'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [renemonroy](https://github.com/renemonroy)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
