document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultList = document.getElementById('result-list');
    const statusLabel = document.getElementById('status');

    // APIおよび画像配信のベースURLを定数として定義
    const API_BASE_URL = 'https://img.sk85.org/api/search';
    const IMAGE_BASE_URL = 'https://img.sk85.org/imaginary/resize';

    // ul要素にCSSクラスを適用
    resultList.className = 'ais-RefinementList-list';

    function triggerSearch() {
        const query = searchInput.value.trim();

        if (!query) {
            resultList.innerHTML = '';
            statusLabel.textContent = '';
            return;
        }

        executeSearch(query);
    }

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.isComposing) {
            e.preventDefault();
            triggerSearch();
        }
    });

    async function executeSearch(query) {
        statusLabel.textContent = '検索中...';
        
        try {
            // 定数を使用してリクエストURLを構築
            const url = `${API_BASE_URL}?filename=${encodeURIComponent(query)}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`通信エラー: ${response.status}`);

            const data = await response.json();
            renderResults(data);
        } catch (error) {
            statusLabel.textContent = 'エラーが発生しました';
            console.error(error);
        }
    }

    function renderResults(data) {
        resultList.innerHTML = '';
        const results = data.results || [];
        
        statusLabel.textContent = `該当: ${data.total || 0}件`;

        results.forEach(item => {
            const li = document.createElement('li');
            li.className = 'ais-RefinementList-item';
            li.style.width = '150px';

            const spanImg = document.createElement('span');
            spanImg.className = 'img';

            const img = document.createElement('img');
            // 定数を使用してサムネイル画像のURLを構築
            img.src = `${IMAGE_BASE_URL}?width=200&quality=20&file=${item.filename}`;
            img.alt = item.filename;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';

            spanImg.appendChild(img);

            const link = document.createElement('a');
            // 定数を使用してオリジナル画像のURLを構築
            link.href = `${IMAGE_BASE_URL}?width=2000&quality=100&file=${item.filename}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = item.filename;
            link.className = 'hit-name';
            
            link.style.fontSize = '12px';
            link.style.wordBreak = 'break-all';
            link.style.display = 'block';
            link.style.textAlign = 'center';

            li.appendChild(spanImg);
            li.appendChild(link);
            resultList.appendChild(li);
        });
    }
});