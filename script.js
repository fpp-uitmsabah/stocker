const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
let chartInstance = null;

if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
  themeToggleLightIcon.classList.remove('hidden');
} else {
  document.documentElement.classList.remove('dark');
  themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function () {
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');
  document.documentElement.classList.toggle('dark');
  const currentTheme = document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
  localStorage.setItem('color-theme', currentTheme);
  if (chartInstance) {
    const symbol =
      document.getElementById('stock-search').value.toUpperCase() || 'MAYBANK';
    renderChart(generateStockData(100), currentTheme, symbol);
  }
});

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const isExpanded =
    mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
  mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  mobileMenuButton
    .querySelectorAll('svg')
    .forEach((icon) => icon.classList.toggle('hidden'));
});

const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const priceAlertModal = document.getElementById('priceAlertModal');

const loginBtnNav = document.getElementById('loginBtnNav');
const loginBtnMobile = document.getElementById('loginBtnMobile');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const switchToRegisterBtn = document.getElementById('switchToRegister');

const closeRegisterModalBtn = document.getElementById('closeRegisterModal');
const switchToLoginBtn = document.getElementById('switchToLogin');

const setPriceAlertBtn = document.getElementById('setPriceAlertBtn');
const closePriceAlertModalBtn = document.getElementById('closePriceAlertModal');

function openModal(modal) {
  modal.classList.add('active');
  setTimeout(() => {
    modal
      .querySelector('div[class*="bg-white"]')
      .classList.remove('scale-95', 'opacity-0');
    modal
      .querySelector('div[class*="bg-white"]')
      .classList.add('scale-100', 'opacity-100');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal
    .querySelector('div[class*="bg-white"]')
    .classList.remove('scale-100', 'opacity-100');
  modal
    .querySelector('div[class*="bg-white"]')
    .classList.add('scale-95', 'opacity-0');
  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }, 300);
}

[loginBtnNav, loginBtnMobile].forEach((btn) =>
  btn.addEventListener('click', () => openModal(loginModal))
);
closeLoginModalBtn.addEventListener('click', () => closeModal(loginModal));
switchToRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal(loginModal);
  openModal(registerModal);
});

closeRegisterModalBtn.addEventListener('click', () =>
  closeModal(registerModal)
);
switchToLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeModal(registerModal);
  openModal(loginModal);
});

setPriceAlertBtn.addEventListener('click', () => {
  const currentSymbol =
    document.getElementById('stock-search').value.toUpperCase() || 'STOCK';
  document.getElementById(
    'alertStockSymbol'
  ).textContent = `For ${currentSymbol}`;
  openModal(priceAlertModal);
});
closePriceAlertModalBtn.addEventListener('click', () =>
  closeModal(priceAlertModal)
);

const dummyStockData = {
  MAYBANK: {
    name: 'Malayan Banking Berhad',
    price: 9.85,
    change: '+0.15',
    changePercent: '+1.55%',
    marketCap: '120.5B',
    peRatio: 12.3,
    volume: '8.5M',
    open: 9.70,
    high: 9.90,
    low: 9.65,
    yearHigh: 10.20,
    yearLow: 8.45,
  },
  TENAGA: {
    name: 'Tenaga Nasional Berhad',
    price: 11.24,
    change: '-0.08',
    changePercent: '-0.71%',
    marketCap: '65.8B',
    peRatio: 15.6,
    volume: '5.2M',
    open: 11.32,
    high: 11.40,
    low: 11.20,
    yearHigh: 12.80,
    yearLow: 9.90,
  },
  CIMB: {
    name: 'CIMB Group Holdings Berhad',
    price: 6.78,
    change: '+0.12',
    changePercent: '+1.80%',
    marketCap: '68.2B',
    peRatio: 10.8,
    volume: '12.3M',
    open: 6.66,
    high: 6.82,
    low: 6.60,
    yearHigh: 7.20,
    yearLow: 5.45,
  },
  PUBLIC: {
    name: 'Public Bank Berhad',
    price: 4.55,
    change: '-0.05',
    changePercent: '-1.09%',
    marketCap: '87.5B',
    peRatio: 13.2,
    volume: '15.8M',
    open: 4.60,
    high: 4.62,
    low: 4.52,
    yearHigh: 4.85,
    yearLow: 4.10,
  },
  PETRONAS: {
    name: 'Petronas Chemicals Group',
    price: 7.86,
    change: '+0.18',
    changePercent: '+2.34%',
    marketCap: '52.4B',
    peRatio: 18.5,
    volume: '6.9M',
    open: 7.68,
    high: 7.92,
    low: 7.65,
    yearHigh: 9.15,
    yearLow: 6.80,
  },
  SIME: {
    name: 'Sime Darby Berhad',
    price: 2.48,
    change: '+0.08',
    changePercent: '+3.33%',
    marketCap: '17.2B',
    peRatio: 16.4,
    volume: '22.5M',
    open: 2.40,
    high: 2.52,
    low: 2.38,
    yearHigh: 2.95,
    yearLow: 2.15,
  },
  DIGI: {
    name: 'Digi.Com Berhad',
    price: 3.92,
    change: '-0.04',
    changePercent: '-1.01%',
    marketCap: '29.4B',
    peRatio: 22.1,
    volume: '4.2M',
    open: 3.96,
    high: 3.98,
    low: 3.90,
    yearHigh: 4.35,
    yearLow: 3.65,
  },
};

const dummyNews = [
  {
    id: 1,
    title: 'Banking Stocks Rally on Positive Economic Outlook',
    source: 'Bursa Malaysia Today',
    time: '2h ago',
    symbol: 'MAYBANK',
  },
  {
    id: 2,
    title: 'Bank Negara Malaysia Maintains Overnight Policy Rate',
    source: 'The Edge Markets',
    time: '3h ago',
    symbol: 'General',
  },
  {
    id: 3,
    title: 'PETRONAS Chemical Posts Strong Quarter Results',
    source: 'The Star',
    time: '1h ago',
    symbol: 'PETRONAS',
  },
  {
    id: 4,
    title: 'Plantation Sector Sees Mixed Performance',
    source: 'Malaysian Reserve',
    time: '4h ago',
    symbol: 'SIME',
  },
  {
    id: 5,
    title: "Analyst Upgrades TENAGA to 'Buy'",
    source: 'Investment Insights MY',
    time: '5h ago',
    symbol: 'TENAGA',
  },
];

const tickerMove = document.querySelector('.ticker-move');
function populateTicker() {
  let tickerHTML = '';
  const symbols = Object.keys(dummyStockData);
  for (let i = 0; i < 2; i++) {
    symbols.forEach((symbol) => {
      const stock = dummyStockData[symbol];
      const changeClass = stock.change.startsWith('+')
        ? 'text-green-400'
        : 'text-red-400';
        tickerHTML += `
        <div class="ticker-item inline-flex items-center">
            <span class="font-semibold">${symbol}</span>
            <span class="ml-2 text-sm">${stock.price.toFixed(
              2
            )}</span>
            <span class="ml-1 text-xs ${changeClass}">${
stock.change
} (${stock.changePercent})</span>
        </div>
    `;
});
  }
  tickerMove.innerHTML = tickerHTML;
}
populateTicker();

setInterval(() => {
  Object.keys(dummyStockData).forEach((symbol) => {
    const stock = dummyStockData[symbol];
    const randomChange = (Math.random() * 0.5 - 0.25).toFixed(2);
    stock.price = parseFloat(
      (stock.price + parseFloat(randomChange)).toFixed(2)
    );
    if (stock.price < 0) stock.price = 0.1;

    const oldChangeVal = parseFloat(stock.change);
    const newChangeVal = (oldChangeVal + (Math.random() * 0.1 - 0.05)).toFixed(
      2
    );
    const newChangePercentVal = (
      (newChangeVal / (stock.price - newChangeVal)) *
      100
    ).toFixed(2);

    stock.change = (newChangeVal > 0 ? '+' : '') + newChangeVal;
    stock.changePercent =
      (newChangeVal > 0 ? '+' : '') + newChangePercentVal + '%';
  });
  populateTicker();
}, 5000);

const searchInput = document.getElementById('stock-search');
const searchButton = document.getElementById('search-button');
const stockDetailsDiv = document.getElementById('stock-details');
const companyNameHeader = document.getElementById('company-name');
const searchErrorDiv = document.getElementById('search-error');
const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toUpperCase().trim();
  searchErrorDiv.classList.add('hidden');
  if (!searchTerm) {
    displayStockDetails(null);
    if (chartInstance) {
      chartInstance.remove();
      chartInstance = null;
      document.getElementById('chart-loader').classList.remove('hidden');
    }
    return;
  }

  const stock = dummyStockData[searchTerm];
  displayStockDetails(stock, searchTerm);

  if (stock) {
    document.getElementById('chart-loader').classList.remove('hidden');
    renderChart(
      generateStockData(100),
      localStorage.getItem('color-theme') || 'light',
      searchTerm
    );
    addToWatchlistBtn.disabled = false;
    setPriceAlertBtn.disabled = false;
    addToWatchlistBtn.textContent = isStockInWatchlist(searchTerm)
      ? 'Remove from Watchlist'
      : 'Add to Watchlist';
    addToWatchlistBtn.classList.toggle(
      'bg-red-500',
      isStockInWatchlist(searchTerm)
    );
    addToWatchlistBtn.classList.toggle(
      'hover:bg-red-600',
      isStockInWatchlist(searchTerm)
    );
    addToWatchlistBtn.classList.toggle(
      'bg-green-500',
      !isStockInWatchlist(searchTerm)
    );
    addToWatchlistBtn.classList.toggle(
      'hover:bg-green-600',
      !isStockInWatchlist(searchTerm)
    );
  } else {
    searchErrorDiv.classList.remove('hidden');
    if (chartInstance) {
      chartInstance.remove();
      chartInstance = null;
      document.getElementById('chart-loader').classList.remove('hidden');
    }
    addToWatchlistBtn.disabled = true;
    setPriceAlertBtn.disabled = true;
  }
}

function displayStockDetails(stock, symbol = 'N/A') {
  if (stock) {
    companyNameHeader.textContent = `${stock.name} (${symbol})`;
    const changeClass = stock.change.startsWith('+')
      ? 'text-green-500 dark:text-green-400'
      : 'text-red-500 dark:text-red-400';
      stockDetailsDiv.innerHTML = `
      <div class="flex justify-between items-baseline">
          <p class="text-3xl font-bold">${stock.price.toFixed(
            2
          )} <span class="text-xs text-gray-500 dark:text-gray-400">MYR</span></p>
          <p class="text-lg ${changeClass}">${stock.change} (${
stock.changePercent
})</p>
      </div>
      <hr class="my-2 border-gray-200 dark:border-gray-600">
      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <p><strong>Open:</strong> ${stock.open.toFixed(2)}</p>
          <p><strong>High:</strong> ${stock.high.toFixed(2)}</p>
          <p><strong>Low:</strong> ${stock.low.toFixed(2)}</p>
          <p><strong>Volume:</strong> ${stock.volume}</p>
          <p><strong>Mkt Cap:</strong> ${stock.marketCap}</p>
          <p><strong>P/E Ratio:</strong> ${stock.peRatio}</p>
          <p><strong>52W H:</strong> ${stock.yearHigh.toFixed(
            2
          )}</p>
          <p><strong>52W L:</strong> ${stock.yearLow.toFixed(
            2
          )}</p>
      </div>
  `;
  } else {
    companyNameHeader.textContent = 'Company Overview';
    stockDetailsDiv.innerHTML = `<p class="text-sm text-gray-600 dark:text-gray-400">Search for a stock to see details.</p>`;
  }
}

function generateStockData(count) {
  const data = [];
  let lastClose = 50 + Math.random() * 150;
  let time = new Date();
  time.setDate(time.getDate() - count);

  for (let i = 0; i < count; i++) {
    time.setDate(time.getDate() + 1);
    const open = lastClose + (Math.random() - 0.5) * 5;
    const high = Math.max(open, lastClose) + Math.random() * 5;
    const low = Math.min(open, lastClose) - Math.random() * 5;
    const close = low + Math.random() * (high - low);
    lastClose = close;

    data.push({
      time: time.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
  }
  return data;
}

function renderChart(data, theme, symbol) {
  const chartContainer = document.getElementById('chart-container');
  const chartLoader = document.getElementById('chart-loader');

  if (chartInstance) {
    chartInstance.remove();
  }

  chartInstance = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.clientWidth,
    height: chartContainer.clientHeight,
    layout: {
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      textColor: theme === 'dark' ? '#d1d5db' : '#111827',
    },
    grid: {
      vertLines: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      horzLines: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    priceScale: {
      borderColor: theme === 'dark' ? '#4b5563' : '#cccccc',
    },
    timeScale: {
      borderColor: theme === 'dark' ? '#4b5563' : '#cccccc',
      timeVisible: true,
      secondsVisible: false,
    },
    watermark: {
      color:
        theme === 'dark' ? 'rgba(209, 213, 219, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      visible: true,
      text: symbol,
      fontSize: 48,
      horzAlign: 'center',
      vertAlign: 'center',
    },
  });

  const candleSeries = chartInstance.addCandlestickSeries({
    upColor: theme === 'dark' ? '#10b981' : '#22c55e',
    downColor: theme === 'dark' ? '#ef4444' : '#dc2626',
    borderDownColor: theme === 'dark' ? '#ef4444' : '#dc2626',
    borderUpColor: theme === 'dark' ? '#10b981' : '#22c55e',
    wickDownColor: theme === 'dark' ? '#ef4444' : '#dc2626',
    wickUpColor: theme === 'dark' ? '#10b981' : '#22c55e',
  });

  candleSeries.setData(data);
  chartInstance.timeScale().fitContent();
  chartLoader.classList.add('hidden');
  
  // Re-enable drawing tools after chart is rendered
  setTimeout(() => {
    enableDrawingOnChart();
  }, 100);

  window.addEventListener('resize', () => {
    if (
      chartInstance &&
      chartContainer.clientWidth > 0 &&
      chartContainer.clientHeight > 0
    ) {
      chartInstance.resize(
        chartContainer.clientWidth,
        chartContainer.clientHeight
      );
    }
  });
}

renderChart(
  generateStockData(100),
  localStorage.getItem('color-theme') || 'light',
  'MAYBANK'
);

const topGainersList = document.getElementById('top-gainers-list');
const topLosersList = document.getElementById('top-losers-list');

function populateMarketMovers() {
  const stocksArray = Object.entries(dummyStockData).map(([symbol, data]) => ({
    symbol,
    ...data,
  }));

  stocksArray.forEach((stock) => {
    stock.numericChangePercent = parseFloat(
      stock.changePercent.replace('+', '').replace('%', '')
    );
  });

  stocksArray.sort((a, b) => b.numericChangePercent - a.numericChangePercent);

  const gainers = stocksArray
    .filter((s) => s.numericChangePercent > 0)
    .slice(0, 5);
  const losers = stocksArray
    .filter((s) => s.numericChangePercent < 0)
    .sort((a, b) => a.numericChangePercent - b.numericChangePercent)
    .slice(0, 5);

  topGainersList.innerHTML = gainers.length
    ? gainers
        .map(
          (stock) => `
                <li class="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150 cursor-pointer" onclick="searchInput.value='${
                  stock.symbol
                }'; performSearch(); document.getElementById('stock-search').scrollIntoView({ behavior: 'smooth' });">
                <div>
                <span class="font-semibold text-gray-800 dark:text-gray-200">${
                          stock.symbol
                        }</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 block">${stock.name.substring(
                          0,
                          20
                        )}${stock.name.length > 20 ? '...' : ''}</span>
                        </div>
                        <div class="text-right">
                        <span class="font-medium text-gray-800 dark:text-gray-200">${stock.price.toFixed(
                          2
                        )}</span>
                        <span class="block text-sm text-green-500 dark:text-green-400">${
                          stock.changePercent
                        }</span>
                        </div>
                </li>
            `
        )
        .join('')
    : '<li class="text-sm text-gray-500 dark:text-gray-400">No significant gainers today.</li>';

  topLosersList.innerHTML = losers.length
    ? losers
        .map(
          (stock) => `
          <li class="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150 cursor-pointer" onclick="searchInput.value='${
            stock.symbol
          }'; performSearch(); document.getElementById('stock-search').scrollIntoView({ behavior: 'smooth' });">
              <div>
                  <span class="font-semibold text-gray-800 dark:text-gray-200">${
                    stock.symbol
                  }</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 block">${stock.name.substring(
                          0,
                          20
                        )}${stock.name.length > 20 ? '...' : ''}</span>
                        </div>
                        <div class="text-right">
                            <span class="font-medium text-gray-800 dark:text-gray-200">${stock.price.toFixed(
                              2
                            )}</span>
                            <span class="block text-sm text-red-500 dark:text-red-400">${
                              stock.changePercent
                            }</span>
                        </div>
                    </li>
            `
        )
        .join('')
    : '<li class="text-sm text-gray-500 dark:text-gray-400">No significant losers today.</li>';
}
populateMarketMovers();
setInterval(populateMarketMovers, 15000);

const watchlistItemsDiv = document.getElementById('watchlist-items');
const emptyWatchlistMessage = document.getElementById(
  'empty-watchlist-message'
);
let watchlist = JSON.parse(localStorage.getItem('stockWatchlist')) || [];

function renderWatchlist() {
  if (watchlist.length === 0) {
    watchlistItemsDiv.innerHTML = '';
    emptyWatchlistMessage.classList.remove('hidden');
    return;
  }
  emptyWatchlistMessage.classList.add('hidden');
  watchlistItemsDiv.innerHTML = watchlist
    .map((symbol) => {
      const stock = dummyStockData[symbol];
      if (!stock) return '';
      const changeClass = stock.change.startsWith('+')
        ? 'text-green-500 dark:text-green-400'
        : 'text-red-500 dark:text-red-400';
      return `
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-md transition-all duration-200 cursor-pointer" onclick="searchInput.value='${symbol}'; performSearch(); document.getElementById('stock-search').scrollIntoView({ behavior: 'smooth' });">
      <div class="flex justify-between items-start mb-2">
          <div>
              <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${symbol}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">${
                stock.name
              }</p>
          </div>
           <button class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs p-1" onclick="event.stopPropagation(); toggleWatchlist('${symbol}');" title="Remove from watchlist">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
          </button>
      </div>
      <div class="flex justify-between items-baseline">
          <p class="text-2xl font-bold text-gray-900 dark:text-white">${stock.price.toFixed(
            2
          )}</p>
          <p class="text-md ${changeClass}">${
stock.changePercent
}</p>
      </div>
  </div>
`;
})
.join('');
}

function isStockInWatchlist(symbol) {
  return watchlist.includes(symbol);
}

function toggleWatchlist(symbol) {
  if (!symbol) return;
  const stockExists = dummyStockData[symbol];
  if (!stockExists) {
    console.warn(
      `Stock ${symbol} not found in dummy data. Cannot add to watchlist.`
    );
    return;
  }

  const index = watchlist.indexOf(symbol);
  if (index > -1) {
    watchlist.splice(index, 1);
  } else {
    watchlist.push(symbol);
  }
  localStorage.setItem('stockWatchlist', JSON.stringify(watchlist));
  renderWatchlist();

  const currentSearchSymbol = searchInput.value.toUpperCase().trim();
  if (currentSearchSymbol === symbol) {
    addToWatchlistBtn.textContent = isStockInWatchlist(symbol)
      ? 'Remove from Watchlist'
      : 'Add to Watchlist';
    addToWatchlistBtn.classList.toggle(
      'bg-red-500',
      isStockInWatchlist(symbol)
    );
    addToWatchlistBtn.classList.toggle(
      'hover:bg-red-600',
      isStockInWatchlist(symbol)
    );
    addToWatchlistBtn.classList.toggle(
      'bg-green-500',
      !isStockInWatchlist(symbol)
    );
    addToWatchlistBtn.classList.toggle(
      'hover:bg-green-600',
      !isStockInWatchlist(symbol)
    );
  }
}

addToWatchlistBtn.addEventListener('click', () => {
  const symbol = searchInput.value.toUpperCase().trim();
  toggleWatchlist(symbol);
});

const newsFeedDiv = document.getElementById('news-feed');
function populateNewsFeed() {
  const currentSymbol = searchInput.value.toUpperCase().trim();
  let filteredNews = dummyNews;
  if (currentSymbol && dummyStockData[currentSymbol]) {
    const symbolSpecificNews = dummyNews.filter(
      (news) => news.symbol === currentSymbol
    );
    const generalNews = dummyNews.filter(
      (news) => news.symbol === 'General' || news.symbol !== currentSymbol
    );
    filteredNews = [...symbolSpecificNews, ...generalNews].slice(0, 5);
  } else {
    filteredNews = dummyNews.slice(0, 5);
  }

  newsFeedDiv.innerHTML = filteredNews.length
    ? filteredNews
        .map(
          (news) => `
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
          <a href="#" class="block hover:text-indigo-600 dark:hover:text-indigo-400">
              <h4 class="text-md font-semibold text-gray-800 dark:text-gray-100 mb-1">${news.title}</h4>
          </a>
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>${news.source}</span>
              <span>${news.time}</span>
          </div>
      </div>
            `
        )
        .join('')
    : '<p class="text-sm text-gray-500 dark:text-gray-400">No news available at the moment.</p>';
}

searchButton.addEventListener('click', populateNewsFeed);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    populateNewsFeed();
  }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  renderWatchlist();
  populateNewsFeed();
  displayStockDetails(null);
  if (!searchInput.value) {
    searchInput.value = 'MAYBANK';
    performSearch();
  }

  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('nav').offsetHeight;
        const tickerHeight =
          document.querySelector('.ticker-wrap').offsetHeight;
        const offsetPosition =
          targetElement.offsetTop - navbarHeight - tickerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          mobileMenuButton
            .querySelectorAll('svg')
            .forEach((icon) => icon.classList.toggle('hidden'));
        }
      }
    });
  });
});

// Drawing Tools Functionality
let currentDrawingTool = null;
let drawingColor = '#3b82f6';
let drawings = [];
let isDrawing = false;
let drawingStart = null;

// Drawing tool buttons
const toolButtons = {
  trendline: document.getElementById('tool-trendline'),
  horizontalRay: document.getElementById('tool-horizontal-ray'),
  arrow: document.getElementById('tool-arrow'),
  text: document.getElementById('tool-text'),
};

const drawingColorPicker = document.getElementById('drawing-color');
const clearDrawingsBtn = document.getElementById('clear-drawings');

// Set drawing color
drawingColorPicker.addEventListener('change', (e) => {
  drawingColor = e.target.value;
});

// Tool button click handlers
Object.keys(toolButtons).forEach((toolName) => {
  toolButtons[toolName].addEventListener('click', () => {
    // Toggle tool selection
    if (currentDrawingTool === toolName) {
      currentDrawingTool = null;
      toolButtons[toolName].classList.remove('bg-indigo-500', 'text-white', 'dark:bg-indigo-600');
      toolButtons[toolName].classList.add('bg-white', 'dark:bg-gray-600');
    } else {
      // Deselect all tools
      Object.keys(toolButtons).forEach((t) => {
        toolButtons[t].classList.remove('bg-indigo-500', 'text-white', 'dark:bg-indigo-600');
        toolButtons[t].classList.add('bg-white', 'dark:bg-gray-600');
      });
      
      // Select current tool
      currentDrawingTool = toolName;
      toolButtons[toolName].classList.add('bg-indigo-500', 'text-white', 'dark:bg-indigo-600');
      toolButtons[toolName].classList.remove('bg-white', 'dark:bg-gray-600');
    }
  });
});

// Clear all drawings
clearDrawingsBtn.addEventListener('click', () => {
  drawings.forEach(drawing => {
    if (drawing.series) {
      chartInstance.removeSeries(drawing.series);
    }
    if (drawing.marker) {
      drawing.marker.remove();
    }
  });
  drawings = [];
});

// Chart click handler for drawing
let chartClickHandler = null;

function enableDrawingOnChart() {
  if (!chartInstance) return;
  
  const chartContainer = document.getElementById('chart-container');
  
  if (chartClickHandler) {
    chartContainer.removeEventListener('click', chartClickHandler);
  }
  
  chartClickHandler = (event) => {
    if (!currentDrawingTool) return;
    
    const rect = chartContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to chart coordinates (approximate)
    const timeScale = chartInstance.timeScale();
    const priceScale = chartInstance.priceScale();
    
    try {
      const time = timeScale.coordinateToTime(x);
      const price = priceScale.coordinateToPrice(y);
      
      if (!time || !price) return;
      
      handleDrawing(time, price);
    } catch (error) {
      console.error('Error drawing:', error);
    }
  };
  
  chartContainer.addEventListener('click', chartClickHandler);
}

function handleDrawing(time, price) {
  if (!currentDrawingTool) return;
  
  if (!isDrawing) {
    // Start drawing
    drawingStart = { time, price };
    isDrawing = true;
  } else {
    // Complete drawing
    const drawingEnd = { time, price };
    
    switch (currentDrawingTool) {
      case 'trendline':
        drawTrendline(drawingStart, drawingEnd);
        break;
      case 'horizontalRay':
        drawHorizontalRay(drawingStart, drawingEnd);
        break;
      case 'arrow':
        drawArrow(drawingStart, drawingEnd);
        break;
      case 'text':
        drawText(drawingStart);
        break;
    }
    
    isDrawing = false;
    drawingStart = null;
  }
}

function drawTrendline(start, end) {
  if (!chartInstance) return;
  
  const lineSeries = chartInstance.addLineSeries({
    color: drawingColor,
    lineWidth: 2,
    lineStyle: 0, // Solid
    crosshairMarkerVisible: false,
    lastValueVisible: false,
    priceLineVisible: false,
  });
  
  lineSeries.setData([
    { time: start.time, value: start.price },
    { time: end.time, value: end.price },
  ]);
  
  drawings.push({ type: 'trendline', series: lineSeries, start, end });
}

function drawHorizontalRay(start, end) {
  if (!chartInstance) return;
  
  const lineSeries = chartInstance.addLineSeries({
    color: drawingColor,
    lineWidth: 2,
    lineStyle: 0,
    crosshairMarkerVisible: false,
    lastValueVisible: false,
    priceLineVisible: false,
  });
  
  // Horizontal ray uses the start price
  lineSeries.setData([
    { time: start.time, value: start.price },
    { time: end.time, value: start.price },
  ]);
  
  drawings.push({ type: 'horizontalRay', series: lineSeries, start, end });
}

function drawArrow(start, end) {
  if (!chartInstance) return;
  
  // Draw line first
  const lineSeries = chartInstance.addLineSeries({
    color: drawingColor,
    lineWidth: 2,
    lineStyle: 0,
    crosshairMarkerVisible: false,
    lastValueVisible: false,
    priceLineVisible: false,
  });
  
  lineSeries.setData([
    { time: start.time, value: start.price },
    { time: end.time, value: end.price },
  ]);
  
  // Add arrowhead marker at the end
  lineSeries.setMarkers([
    {
      time: end.time,
      position: 'inBar',
      color: drawingColor,
      shape: 'arrowUp',
      text: '',
    },
  ]);
  
  drawings.push({ type: 'arrow', series: lineSeries, start, end });
}

function drawText(position) {
  if (!chartInstance) return;
  
  const text = prompt('Enter text annotation:');
  if (!text) return;
  
  // Create a candlestick series to add markers
  const candleSeries = chartInstance.getCandlestickSeries && chartInstance.getCandlestickSeries();
  
  if (candleSeries) {
    const existingMarkers = candleSeries.markers() || [];
    candleSeries.setMarkers([
      ...existingMarkers,
      {
        time: position.time,
        position: 'aboveBar',
        color: drawingColor,
        shape: 'circle',
        text: text,
      },
    ]);
    
    drawings.push({ type: 'text', position, text });
  } else {
    // Fallback: create a line series for the marker
    const markerSeries = chartInstance.addLineSeries({
      color: 'transparent',
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    });
    
    markerSeries.setMarkers([
      {
        time: position.time,
        position: 'aboveBar',
        color: drawingColor,
        shape: 'circle',
        text: text,
      },
    ]);
    
    drawings.push({ type: 'text', series: markerSeries, position, text });
  }
}

// Enable drawing when chart is ready
setTimeout(() => {
  enableDrawingOnChart();
}, 1000);