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

function hasActiveRefinements() {
  const state = search.helper?.state
  if (!state) return false

  return [state.refinementList, state.disjunctiveFacetsRefinements].some(
    (group) =>
      group &&
      Object.values(group).some(
        (values) => Array.isArray(values) && values.length > 0
      )
  )
}

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    autofocus: false,
    placeholder: 'キーワードを入力'
  }),
  instantsearch.widgets.stats({
    container: '#stats',
    templates: {
      text(data) {
        if (data.nbHits === 0) return ''
        if (!data.query && !hasActiveRefinements()) return ''
        return `${data.nbHits.toLocaleString('ja-JP')}件の記事`
      }
    }
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
      empty: (results) => results.query
        ? '<p class="search-empty">該当する記事がありません。<span>別のキーワードをお試しください。</span></p>'
        : '',
      showMoreText: 'さらに表示'
    },
  }),
  instantsearch.widgets.refinementList({
  container: '#refinement-list',
  attribute: 'year',
  transformItems(items) {
    // items配列をlabel（この場合は年）の降順でソートする
    // 文字列として比較するために localeCompare を使用します
    return items.sort((a, b) => +b.label - +a.label);
  }
}),
instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [
      { value: 'diary', label: '関連性順' }, // default index
      {
        value: 'diary:timestamp:desc', // Sort on descending price
        label: '最近->過去',
      },
      {
        value: 'diary:timestamp:asc', // Sort on ascending price
        label: '過去->最近',
      }
    ],
  }),
])

search.start()

const mainSearchInput = document.querySelector("#searchbox input")
if (mainSearchInput) {
  mainSearchInput.setAttribute("aria-label", "サイト内検索")
}

const sortContainer = document.querySelector("#sort-by")

function labelSortSelect() {
  const select = sortContainer?.querySelector("select")
  if (select) {
    select.id = "sort-by-select"
    select.removeAttribute("aria-label")
  }
}

if (sortContainer) {
  new MutationObserver(labelSortSelect).observe(sortContainer, {
    childList: true,
    subtree: true
  })
}

labelSortSelect()

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