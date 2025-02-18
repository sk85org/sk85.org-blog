const { searchClient } = instantMeiliSearch(
  'http://192.168.0.104:7700',
  '',
  {
    placeholderSearch: false,
    meiliSearchParams: {
      cropLength: 40,
    attributesToCrop: ["content"]
    }
  },
  
)

const search = instantsearch({
  indexName: 'diary',
  searchClient,
  searchParameters: {
    hitsPerPage: 10  // 表示件数を 10 件に制限
  }
})

instantsearch.widgets.configure({
  hitsPerPage: 25
})
search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    autofocus: true
  }),
  instantsearch.widgets.infiniteHits({
    container: '#hits',
    templates: {
      item: `
          <div class="hit-name">
          <a href = "{{url}}" target="_new">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </a>
            </div>
          <div class="hit-comment hit-comment-dark">
             {{#helpers.snippet}}{ "attribute": "content" }{{/helpers.snippet}}
          </div>
          {{#helpers.snippet}}{ "attribute": "url" }{{/helpers.snippet}}
      `,
      empty: "" // Set empty template to an empty string, so nothing is shown when there are no hits.
    },
  }),
])

search.start()