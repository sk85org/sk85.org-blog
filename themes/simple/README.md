# Simple

A customized Hugo theme for [d.sk85.org](https://d.sk85.org), based on
[Accessible Minimalism](https://github.com/leonstafford/accessible-minimalism-hugo-theme).

## Features

- Responsive single-column diary layout
- Light and dark color schemes with a user toggle
- Meilisearch-powered search page
- Tag, archive, and n-year diary taxonomy pages
- Image shortcodes for the imaginary image server and Flickr
- RSS feed, canonical URLs, and basic Open Graph metadata
- Print styles and reduced-motion support

## Requirements

- Hugo 0.140.0 or later
- A Meilisearch index for the search page (optional)
- Utterances if comments are enabled (optional)

## Configuration

Set `theme = 'simple'` in `config.toml`. Use an absolute `baseURL`; canonical
URLs, the sitemap, RSS feeds, and the search index URLs depend on it.

```toml
baseURL = 'https://example.com/'
theme = 'simple'
enableRobotsTXT = true

# Required for /index.json (the Meilisearch source document)
[outputs]
  home = ["HTML", "JSON", "RSS"]
```

Configure the following params as needed:

```toml
[params]
  description = 'd.sk85.org の日記'
  enable_search = true
  searchserver_url = '/search/'

  meilisearch_url = 'https://meilisearch.example.com'
  meilisearch_key = 'your-search-only-key'
  meilisearch_index = 'diary'

  # Image server used by the imgresourceserver shortcode
  imgresourceserver = 'https://img.example.com/imaginary/resize?'

  # Optional image search page
  image_search_api = 'https://img.example.com/api/search'
  image_search_url = 'https://img.example.com/imaginary/resize'

  # Optional memo link and n-year diary integration
  memos_url = 'https://memos.example.com'
  memos_with_displayTime = '/?filter=displayTime%3A'

  utterances_repo = 'owner/repo'
  home_post_limit = 15
  home_callout = { title = '...', text = '...', image = '...', image_alt = '...', image_width = 150, image_height = 129 }
```

`meilisearch_key` is a public search-only key; do not use an admin key here.
The home page JSON output is consumed by the Meilisearch indexer (for example,
an n8n workflow). Without it, `/index.json` is not generated.

## Content

The search page uses `layout = "search"` and the image search page uses
`layout = "imgsearch"`. The n-year diary taxonomy uses the key `n年日記`.
Search and image-search pages should normally set `noindex = true`.

Inline search links use:

```go-html-template
{{</* search keyword="keyword" */>}}
```

Images can be included with:

```go-html-template
{{</* imgresourceserver file="example.png" width="600" height="372" alt="説明" title="caption" */>}}
{{</* flickr href="..." thumbnail="..." title="caption" width="640" height="360" */>}}
```

Always provide `alt` (or `title`) and, where possible, `height` for
`imgresourceserver`; this gives the image link an accessible name and reserves
space to reduce layout shift. Keep block-level shortcodes separated by blank
lines. Consecutive shortcode lines without blank lines are parsed as a single
paragraph, producing invalid HTML such as `<p><figure>...</figure></p>`.

## License

Released under the Unlicense. See [LICENSE](LICENSE).
