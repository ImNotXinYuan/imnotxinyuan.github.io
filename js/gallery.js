// 画廊页面特定功能

// 作品数据存储
let artworks = [];
let filteredArtworks = [];

// DOM元素
const galleryContainer = document.getElementById('gallery-container');
const loadingState = document.getElementById('loading-state');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');
const retryButton = document.getElementById('retry-button');

// 作品文件夹列表 - 这里应该从服务器获取或手动维护
const artworkFolders = [
    'artwork1',
    'artwork2',
    'artwork3',
    'artwork4',
    'artwork5',
    'artwork6'
];

// 初始化画廊
async function initGallery() {
    showLoading();
    hideError();
    
    try {
        // 加载所有作品信息
        await loadArtworks();
        
        // 渲染画廊
        renderGallery(artworks);
        
        hideLoading();
    } catch (error) {
        console.error('初始化画廊失败:', error);
        showError();
        hideLoading();
    }
}

// 加载作品信息
async function loadArtworks() {
    artworks = [];
    
    // 遍历所有作品文件夹
    for (const folder of artworkFolders) {
        try {
            // 尝试加载mf.json文件
            const response = await fetch(`img/gallery/${folder}/mf.json`);
            
            if (!response.ok) {
                console.warn(`无法加载 ${folder} 的元数据文件`);
                continue;
            }
            
            const metadata = await response.json();
            
            // 添加作品到列表
            artworks.push({
                id: folder,
                name: metadata.name || '未命名作品',
                artist: metadata.artist || '未知艺术家',
                time: metadata.time || '未知时间',
                category: metadata.category || '其他',
                imageUrl: `img/gallery/${folder}/pictures/1.webp`
            });
        } catch (error) {
            console.warn(`加载 ${folder} 的作品信息失败:`, error);
        }
    }
    
    // 如果没有加载到任何作品，抛出错误
    if (artworks.length === 0) {
        throw new Error('没有找到任何作品');
    }
    
    filteredArtworks = [...artworks];
}

// 渲染画廊
function renderGallery(artworksToRender) {
    galleryContainer.innerHTML = '';
    
    if (artworksToRender.length === 0) {
        galleryContainer.innerHTML = `
            <div class="empty-state">
                <h3>没有找到匹配的作品</h3>
                <p>尝试调整搜索条件或筛选器</p>
            </div>
        `;
        return;
    }
    
    artworksToRender.forEach(artwork => {
        const card = document.createElement('div');
        card.className = 'painting-card';
        card.innerHTML = `
            <img src="${artwork.imageUrl}" alt="${artwork.name}" class="painting-img" onerror="this.src='https://via.placeholder.com/400x300/1a1a1a/666?text=图片加载失败'">
            <div class="painting-info">
                <h3 class="painting-name">${artwork.name}</h3>
                <p class="painting-artist">${artwork.artist}</p>
                <p class="painting-year">${artwork.time}</p>
            </div>
        `;
        
        galleryContainer.appendChild(card);
    });
}

// 搜索功能
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredArtworks = artworks.filter(artwork => 
        artwork.name.toLowerCase().includes(searchTerm) ||
        artwork.artist.toLowerCase().includes(searchTerm)
    );
    
    renderGallery(filteredArtworks);
}

// 分类筛选功能
function handleCategoryFilter(category) {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        filteredArtworks = [...artworks];
    } else {
        filteredArtworks = artworks.filter(artwork => 
            artwork.category === category
        );
    }
    
    renderGallery(filteredArtworks);
}

// 显示/隐藏加载状态
function showLoading() {
    loadingState.style.display = 'block';
}

function hideLoading() {
    loadingState.style.display = 'none';
}

// 显示/隐藏错误信息
function showError() {
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

// 事件监听器
searchInput.addEventListener('input', handleSearch);

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleCategoryFilter(button.dataset.category);
    });
});

retryButton.addEventListener('click', initGallery);

// 初始化画廊
document.addEventListener('DOMContentLoaded', initGallery);
