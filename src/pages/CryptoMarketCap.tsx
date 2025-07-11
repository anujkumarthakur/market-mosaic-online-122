import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockCryptos, formatNumber } from '@/utils/stocksApi';
import { Search, Star, TrendingUp, TrendingDown, Filter, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CryptoMarketCap = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Enhanced mock data with more details
  const enhancedCryptos = mockCryptos.map((crypto, index) => ({
    ...crypto,
    rank: index + 1,
    circulatingSupply: Math.floor(crypto.volume / crypto.price),
    totalSupply: crypto.symbol === 'BTC' ? 21000000 : crypto.symbol === 'ETH' ? null : Math.floor((crypto.volume / crypto.price) * 1.2),
    maxSupply: crypto.symbol === 'BTC' ? 21000000 : crypto.symbol === 'ETH' ? null : Math.floor((crypto.volume / crypto.price) * 1.5),
    allTimeHigh: crypto.price * (1.2 + Math.random() * 0.8),
    allTimeLow: crypto.price * (0.1 + Math.random() * 0.3),
    fullyDilutedMarketCap: crypto.marketCap * (1.1 + Math.random() * 0.3)
  }));

  const filteredCryptos = enhancedCryptos
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'marketCap':
          return b.marketCap - a.marketCap;
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.changePercent - a.changePercent;
        case 'volume':
          return b.volume - a.volume;
        default:
          return a.rank - b.rank;
      }
    });

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const getTrendIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  const getTrendColor = (change: number) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <PageLayout title="Cryptocurrency Market Capitalization">
      <div className="space-y-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Market Cap</span>
              </div>
              <p className="text-2xl font-bold">$2.41T</p>
              <p className="text-sm text-green-500">+2.34% (24h)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">24h Volume</span>
              </div>
              <p className="text-2xl font-bold">$89.7B</p>
              <p className="text-sm text-red-500">-5.12% (24h)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">BTC Dominance</span>
              </div>
              <p className="text-2xl font-bold">56.8%</p>
              <p className="text-sm text-green-500">+0.8% (24h)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active Cryptos</span>
              </div>
              <p className="text-2xl font-bold">2.4M+</p>
              <p className="text-sm text-muted-foreground">Tracked</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Top Cryptocurrencies by Market Cap</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cryptocurrencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Sort Buttons */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {[
                { key: 'rank', label: 'Rank' },
                { key: 'marketCap', label: 'Market Cap' },
                { key: 'price', label: 'Price' },
                { key: 'change', label: '24h Change' },
                { key: 'volume', label: 'Volume' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={sortBy === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy(key)}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Crypto Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">#</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-right py-3 px-2">Price</th>
                    <th className="text-right py-3 px-2">24h %</th>
                    <th className="text-right py-3 px-2">7d %</th>
                    <th className="text-right py-3 px-2">Market Cap</th>
                    <th className="text-right py-3 px-2">Volume(24h)</th>
                    <th className="text-right py-3 px-2">Circulating Supply</th>
                    <th className="text-center py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCryptos.map((crypto) => (
                    <tr 
                      key={crypto.symbol} 
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => navigate(`/crypto/${crypto.symbol.toLowerCase()}`)}
                    >
                      <td className="py-3 px-2">
                        <span className="font-medium">{crypto.rank}</span>
                      </td>
                      
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                            {crypto.symbol.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{crypto.name}</p>
                            <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="text-right py-3 px-2">
                        <span className="font-medium">
                          ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
                        </span>
                      </td>
                      
                      <td className={`text-right py-3 px-2 ${getTrendColor(crypto.changePercent)}`}>
                        <div className="flex items-center justify-end gap-1">
                          {getTrendIcon(crypto.changePercent)}
                          <span>{crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%</span>
                        </div>
                      </td>
                      
                      <td className={`text-right py-3 px-2 ${getTrendColor(crypto.changePercent * 1.2)}`}>
                        <div className="flex items-center justify-end gap-1">
                          {getTrendIcon(crypto.changePercent * 1.2)}
                          <span>{crypto.changePercent * 1.2 >= 0 ? '+' : ''}{(crypto.changePercent * 1.2).toFixed(2)}%</span>
                        </div>
                      </td>
                      
                      <td className="text-right py-3 px-2">
                        <span className="font-medium">${formatNumber(crypto.marketCap)}</span>
                      </td>
                      
                      <td className="text-right py-3 px-2">
                        <span>${formatNumber(crypto.volume)}</span>
                      </td>
                      
                      <td className="text-right py-3 px-2">
                        <div>
                          <span>{formatNumber(crypto.circulatingSupply)}</span>
                          <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
                        </div>
                      </td>
                      
                      <td className="text-center py-3 px-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWatchlist(crypto.symbol);
                          }}
                        >
                          <Star 
                            className={`h-4 w-4 ${watchlist.includes(crypto.symbol) ? 'fill-current text-yellow-500' : ''}`} 
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CryptoMarketCap;