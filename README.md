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
  version: "v1", //the latest and only
  token: "WAIFU API token" //its completely optional incase you wanna access the API's commands.
});
```

<h2 align="center">
  Docs
</h2>

To know the functions and usage, visit [DOCS](https://nanotech-wiki.vercel.app/package/aoijikan/)

<h2 align="center">
  Current Functions
</h2>

- `$getID`
- `$animeInfo`
- `$animeCharInfo`
- `$animeEpisodes`
- `$charInfo`
- `$episodeInfo`
- `$heartbeat`
- `$mangaInfo`
- `$mangaCharInfo`
- `$nextAir`
- `$personInfo`
- `$quote`
- `$randomMangaID`
- `$randomAnimeID`
- `$randomID`
- `$randomImage`
- `$randomCharImg`
- `$searchChar`
- `$searchAnime`
- `$searchManga`
- `$schedule`
- `$strip`
- `$studioInfo`
- `$trendingAnime`
- `$trendingManga`
- `$upcoming`

<h2 align="center">
  Credits
</h2>

- @lordex
- @Ares