const { searchClient } = instantMeiliSearch(
  'https://meilisearch.sk85.org',
  '36b28bf9ad39d804a062105c8323177cb734366a8a4ca83e75330a6b6fb26960',
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
    autofocus: false
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
      `,
      empty: "" // Set empty template to an empty string, so nothing is shown when there are no hits.
    },
  }),
  instantsearch.widgets.refinementList({
  container: '#refinement-list',
  attribute: 'year',
  transformItems(items) {
    // items配列をlabel（この場合は年）の降順でソートする
    // 文字列として比較するために localeCompare を使用します
    return items.sort((a, b) => b.label.localeCompare(a.label));
  }
})
])

search.start()

// DOMContentLoaded 時に URL パラメーター「q」を取得し、検索ボックスに代入
document.addEventListener("DOMContentLoaded", function () {
  // URL のクエリパラメーターを解析
  const urlParams = new URLSearchParams(window.location.search);
  // 「q」パラメーターを取得

  const searchQuery = urlParams.get("q");
  if (searchQuery) {
    // 入力ボックスを取得（Algolia InstantSearch.js の searchBox ウィジェット内の要素）
    const inputBox = document.querySelector(".ais-SearchBox-input");
    if (inputBox) {
      // 入力ボックスにパラメーターの値を設定
      inputBox.value = searchQuery;
      
      // 入力値変更に応じた検索更新を実行するため、'input' イベントを発火
      inputBox.dispatchEvent(new Event("input", { bubbles: true }));
    }}
    

});