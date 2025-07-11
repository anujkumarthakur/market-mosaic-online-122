import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCryptos, formatNumber } from '@/utils/stocksApi';
import { TrendingUp, TrendingDown, Flame, Zap, Star, Clock, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CryptoTrending = () => {
  const navigate = useNavigate();
  
  // Generate trending data based on mock cryptos
  const trendingCryptos = mockCryptos.map((crypto, index) => ({
    ...crypto,
    rank: index + 1,
    trendScore: Math.floor(Math.random() * 100) + 1,
    socialMentions: Math.floor(Math.random() * 50000) + 1000,
    searchVolume: Math.floor(Math.random() * 100000) + 5000,
    newsArticles: Math.floor(Math.random() * 100) + 10,
    hourlyChange: (Math.random() - 0.5) * 20,
    weeklyChange: (Math.random() - 0.5) * 50
  }));

  const topGainers = [...trendingCryptos]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 10);

  const topLosers = [...trendingCryptos]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 10);

  const mostTrending = [...trendingCryptos]
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 15);

  const recentlyAdded = [...trendingCryptos]
    .filter((_, index) => index > 15)
    .slice(0, 10)
    .map(crypto => ({
      ...crypto,
      addedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    }));

  const getTrendIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  const getTrendColor = (change: number) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const TrendingCard = ({ crypto, showTrendScore = false }: { crypto: any, showTrendScore?: boolean }) => (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/crypto/${crypto.symbol.toLowerCase()}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
              {crypto.symbol.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{crypto.name}</p>
              <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
            </div>
          </div>
          {showTrendScore && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Flame className="h-3 w-3" />
              {crypto.trendScore}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
            </span>
            <div className={`flex items-center gap-1 ${getTrendColor(crypto.changePercent)}`}>
              {getTrendIcon(crypto.changePercent)}
              <span className="font-medium">
                {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Market Cap:</span>
              <span>${formatNumber(crypto.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span>Volume:</span>
              <span>${formatNumber(crypto.volume)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout title="Trending Cryptocurrencies">
      <div className="space-y-6">
        {/* Trending Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Trending Score</span>
              </div>
              <p className="text-2xl font-bold">🔥 HOT</p>
              <p className="text-sm text-orange-500">Market is active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Top Gainer</span>
              </div>
              <p className="text-lg font-bold">{topGainers[0]?.symbol}</p>
              <p className="text-sm text-green-500">+{topGainers[0]?.changePercent.toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-sm text-muted-foreground">Top Loser</span>
              </div>
              <p className="text-lg font-bold">{topLosers[0]?.symbol}</p>
              <p className="text-sm text-red-500">{topLosers[0]?.changePercent.toFixed(2)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Social Buzz</span>
              </div>
              <p className="text-lg font-bold">High</p>
              <p className="text-sm text-blue-500">+15% mentions</p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Tabs */}
        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="gainers" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Top Losers
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Recently Added
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Most Trending Cryptocurrencies
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Based on social media mentions, search volume, and trading activity
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mostTrending.map((crypto) => (
                    <TrendingCard key={crypto.symbol} crypto={crypto} showTrendScore />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gainers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Top Gainers (24h)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Cryptocurrencies with the highest price increases in the last 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topGainers.map((crypto) => (
                    <TrendingCard key={crypto.symbol} crypto={crypto} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="losers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  Top Losers (24h)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Cryptocurrencies with the largest price decreases in the last 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topLosers.map((crypto) => (
                    <TrendingCard key={crypto.symbol} crypto={crypto} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  Recently Added
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Newly listed cryptocurrencies on major exchanges
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentlyAdded.map((crypto) => (
                    <Card 
                      key={crypto.symbol}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/crypto/${crypto.symbol.toLowerCase()}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                              {crypto.symbol.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-lg">{crypto.name}</p>
                              <p className="text-muted-foreground">{crypto.symbol}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xl font-bold">
                              ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
                            </p>
                            <div className={`flex items-center gap-1 ${getTrendColor(crypto.changePercent)}`}>
                              {getTrendIcon(crypto.changePercent)}
                              <span>{crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(crypto.addedDate)}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              ${formatNumber(crypto.marketCap)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CryptoTrending;