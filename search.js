function initSearch() {
  const searchPage = document.querySelector(".search-page")
  const hitsContainer = document.querySelector("#hits")

  function showSearchError(message) {
    if (hitsContainer) {
      hitsContainer.innerHTML = `<p class="search-empty">${message}</p>`
    }
  }

  const host = searchPage?.dataset.meiliHost
  const apiKey = searchPage?.dataset.meiliKey
  const indexName = searchPage?.dataset.meiliIndex || "diary"

  if (!host || !apiKey) {
    showSearchError("検索の設定が見つかりません。")
    return
  }

  if (typeof instantMeiliSearch !== "function" || typeof instantsearch !== "function") {
    showSearchError("検索を読み込めませんでした。時間をおいて再度お試しください。")
    return
  }

  const { searchClient } = instantMeiliSearch(host, apiKey, {
    placeholderSearch: false,
    meiliSearchParams: {
      cropLength: 40,
      attributesToCrop: ["content"]
    }
  })

  const search = instantsearch({
    indexName,
    searchClient
  })

  search.on("error", (error) => {
    console.error(error)
    showSearchError("検索中にエラーが発生しました。時間をおいて再度お試しください。")
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
    instantsearch.widgets.configure({
      hitsPerPage: 25
    }),
    instantsearch.widgets.searchBox({
      container: "#searchbox",
      autofocus: false,
      placeholder: "キーワードを入力"
    }),
    instantsearch.widgets.stats({
      container: "#stats",
      templates: {
        text(data) {
          if (data.nbHits === 0) return ""
          if (!data.query && !hasActiveRefinements()) return ""
          return `${data.nbHits.toLocaleString("ja-JP")}件の記事`
        }
      }
    }),
    instantsearch.widgets.infiniteHits({
      container: "#hits",
      templates: {
        item: `
          <div class="hit-name">
            <a href="{{url}}">
              {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
            </a>
          </div>
          <div class="hit-comment hit-comment-dark">
            {{#helpers.snippet}}{ "attribute": "content" }{{/helpers.snippet}}
          </div>
        `,
        empty: (results) =>
          results.query
            ? '<p class="search-empty">該当する記事がありません。<span>別のキーワードをお試しください。</span></p>'
            : "",
        showMoreText: "さらに表示"
      }
    }),
    instantsearch.widgets.refinementList({
      container: "#refinement-list",
      attribute: "year",
      transformItems(items) {
        return items.sort((a, b) => +b.label - +a.label)
      }
    }),
    instantsearch.widgets.sortBy({
      container: "#sort-by",
      items: [
        { value: indexName, label: "関連性順" },
        { value: `${indexName}:timestamp:desc`, label: "最近->過去" },
        { value: `${indexName}:timestamp:asc`, label: "過去->最近" }
      ]
    })
  ])

  try {
    search.start()
  } catch (error) {
    console.error(error)
    showSearchError("検索を開始できませんでした。時間をおいて再度お試しください。")
    return
  }

  const mainSearchInput = document.querySelector("#searchbox input")
  if (mainSearchInput) {
    mainSearchInput.setAttribute("aria-label", "サイト内検索")
    mainSearchInput.setAttribute("aria-describedby", "search-help")
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

  const initialQuery = new URLSearchParams(window.location.search).get("q")
  if (initialQuery && mainSearchInput) {
    mainSearchInput.value = initialQuery
    mainSearchInput.dispatchEvent(new Event("input", { bubbles: true }))
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSearch, { once: true })
} else {
  initSearch()
}
