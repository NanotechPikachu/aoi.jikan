<h1 align="center">
  aoi.jikan
</h1>
<b>A package for AOIJS. Used to fetch info from JIKAN API!</b>

<h2 align="center">
  Setup
</h2>

```js
//aoi setup
const { AoiClient } = require("aoi.js");

const client = new AoiClient({
  token: "Discord Bot Token",
  prefix: "Discord Bot Prefix",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    dbType: "KeyValue",
    tables: ["main"],
    securityKey: "a-32-characters-long-string-here",
  }
});

//aoi.jikan setup
const aoijikan = require("aoi.jikan");
aoijikan.setup({
  client: client, // or bot as per your config
  errorsType: "message", // or "console"
  version: "v1" //the latest and only
});
```

<h2 align="center">
  Docs
</h2>

To know the functions and usage, visit [anime cmds](https://nanotech-wiki.vercel.app/custom/anime/) and [manga cmds](https://nanotech-wiki.vercel.app/custom/manga/)

<h2 align="center">
  Current Functions
</h2>

- `$getID`
- `$animeInfo`
- `$animeCharInfo`
- `$mangaInfo`
- `$mangaCharInfo`
- `$randomMangaID`
- `$randomAnimeID`
- `$randomID`
- `$randomImage`

<h2 align="center">
  Credits
</h2>

- @lordex
- @Ares