function initImageSearch() {
  const root = document.querySelector(".image-search")
  const form = document.getElementById("image-search-form")
  const searchInput = document.getElementById("image-search-input")
  const resultList = document.getElementById("image-search-results")
  const statusLabel = document.getElementById("image-search-status")

  if (!root || !form || !searchInput || !resultList || !statusLabel) return

  const apiBaseUrl = root.dataset.apiUrl
  const imageBaseUrl = root.dataset.imageUrl

  if (!apiBaseUrl || !imageBaseUrl) {
    statusLabel.textContent = "画像検索の設定が見つかりません。"
    return
  }

  let activeController = null

  function clearResults() {
    if (activeController) {
      activeController.abort()
      activeController = null
    }
    resultList.innerHTML = ""
    resultList.setAttribute("aria-busy", "false")
    statusLabel.textContent = ""
  }

  async function executeSearch(query) {
    if (activeController) activeController.abort()
    activeController = new AbortController()
    const controller = activeController

    resultList.innerHTML = ""
    statusLabel.textContent = "検索中..."
    resultList.setAttribute("aria-busy", "true")

    try {
      const url = `${apiBaseUrl}?filename=${encodeURIComponent(query)}`
      const response = await fetch(url, { signal: controller.signal })

      if (!response.ok) {
        throw new Error(`通信エラー: ${response.status}`)
      }

      const data = await response.json()
      renderResults(data)
    } catch (error) {
      if (error.name === "AbortError") return
      statusLabel.textContent = "エラーが発生しました。時間をおいて再度お試しください。"
      console.error(error)
    } finally {
      if (activeController === controller) {
        resultList.setAttribute("aria-busy", "false")
        activeController = null
      }
    }
  }

  function renderResults(data) {
    resultList.innerHTML = ""

    const results = Array.isArray(data.results) ? data.results : []
    const total = Number.isFinite(data.total) ? data.total : results.length
    statusLabel.textContent = `該当: ${total}件`

    if (results.length === 0) {
      statusLabel.textContent = "該当する画像がありません。"
      return
    }

    const fragment = document.createDocumentFragment()

    results.forEach((item) => {
      const listItem = document.createElement("li")
      listItem.className = "image-search-item"

      const link = document.createElement("a")
      const filename = String(item.filename || "")
      link.href = `${imageBaseUrl}?width=2000&quality=100&file=${encodeURIComponent(filename)}`
      link.target = "_blank"
      link.rel = "noopener noreferrer"

      const image = document.createElement("img")
      image.src = `${imageBaseUrl}?width=200&quality=20&file=${encodeURIComponent(filename)}`
      image.alt = filename
      image.loading = "lazy"
      image.decoding = "async"

      const name = document.createElement("span")
      name.className = "image-search-name"
      name.textContent = filename

      link.append(image, name)
      listItem.append(link)
      fragment.append(listItem)
    })

    resultList.append(fragment)
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const query = searchInput.value.trim()

    if (!query) {
      clearResults()
      return
    }

    executeSearch(query)
  })

  searchInput.addEventListener("input", () => {
    if (!searchInput.value.trim()) {
      clearResults()
    }
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initImageSearch, { once: true })
} else {
  initImageSearch()
}
