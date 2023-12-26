# aoi.jikan
A package for AOIJS. Used to fetch info from JIKAN API

## Setup

```js
//aoi setup

const aoijikan = require("aoi.jikan");
aoijikan.setup({
  client: client, // or bot as per your config
  errorsType: "message", // or "console"
  version: "v1"
})
```