# Qwala JS Library

[![NPM Download](https://img.shields.io/npm/v/qwala.svg)](https://www.npmjs.com/package/qwala)

The **Qwala JS Library** is a quick and easy way to interact with the
[Qwala](https://github.com/qwamber/qwala) API.

## Installation

You can install the JS Library from NPM:

```bash
npm install --save qwala
```

## Usage

Using the library is as easy as using `require('qwala')` and calling its methods.

```js
let qwala = require('qwala');

let short = await qwala.shorten('https://example.com');
console.log('https://qwa.la/' + short); // https://qwa.la/y7e6j6

let long = await qwala.lengthen('y7e6j6');
console.log(long); // https://example.com

let views = await qwala.statistics('y7e6j6');
console.log(views) // [{ ipAddress: '123.456.789', viewed: January 5, 2019 } . . . ]
```

To learn more about the Qwala JS Library, please see the [full documentation](https://qwa.la/js-library).
