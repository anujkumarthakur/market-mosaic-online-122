import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bitcoin, TrendingUp, TrendingDown, Star, Globe, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockCryptos, generatePriceHistory, formatNumber } from '@/utils/stocksApi';
import { PricePredictionCard } from '@/components/crypto/PricePredictionCard';

const CryptoDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState<any>(null);
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState('24h');

  useEffect(() => {
    const foundCrypto = mockCryptos.find(c => c.symbol.toLowerCase() === symbol?.toLowerCase());
    if (foundCrypto) {
      setCrypto(foundCrypto);
      // Generate price history based on timeframe
      const days = timeframe === '24h' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365;
      const history = generatePriceHistory(days * 24, foundCrypto.price, 3).map((price, index) => ({
        time: index,
        price,
        volume: Math.random() * 10000000000
      }));
      setPriceHistory(history);
    }
  }, [symbol, timeframe]);

  if (!crypto) {
    return (
      <PageLayout title="Cryptocurrency Not Found">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground mb-4">Cryptocurrency not found</p>
          <Button onClick={() => navigate('/crypto')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Crypto Market
          </Button>
        </div>
      </PageLayout>
    );
  }

  const currentPrice = crypto.price;
  const priceChange = crypto.changePercent;
  const isPositive = priceChange >= 0;

  return (
    <PageLayout title={`${crypto.name} (${crypto.symbol})`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/crypto')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Market
          </Button>
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Add to Watchlist
          </Button>
        </div>

        {/* Price Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bitcoin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{crypto.name}</h1>
                  <p className="text-muted-foreground">{crypto.symbol}</p>
                </div>
              </div>
              <Badge variant={isPositive ? "default" : "destructive"}>
                Rank #{crypto.symbol === 'BTC' ? '1' : crypto.symbol === 'ETH' ? '2' : Math.floor(Math.random() * 100) + 3}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-3xl font-bold">${currentPrice.toLocaleString()}</p>
                <div className={`flex items-center gap-1 mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{isPositive ? '+' : ''}{priceChange.toFixed(2)}%</span>
                  <span className="text-muted-foreground">24h</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                <p className="text-xl font-semibold">${formatNumber(crypto.marketCap)}</p>
                <p className="text-sm text-muted-foreground">Rank #{crypto.symbol === 'BTC' ? '1' : crypto.symbol === 'ETH' ? '2' : Math.floor(Math.random() * 100) + 3}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                <p className="text-xl font-semibold">${formatNumber(crypto.volume)}</p>
                <p className="text-sm text-muted-foreground">Volume/Market Cap: {((crypto.volume / crypto.marketCap) * 100).toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Prediction Component */}
        <PricePredictionCard crypto={crypto} />

        {/* Charts and Data */}
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="24h">24H</TabsTrigger>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={timeframe} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={isPositive ? "#22c55e" : "#ef4444"}
                        fill={isPositive ? "#22c55e20" : "#ef444420"}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Market Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">All-Time High</span>
                  </div>
                  <p className="text-lg font-semibold">${(currentPrice * 1.25).toLocaleString()}</p>
                  <p className="text-sm text-red-500">-{((1.25 - 1) * 100).toFixed(1)}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">All-Time Low</span>
                  </div>
                  <p className="text-lg font-semibold">${(currentPrice * 0.15).toLocaleString()}</p>
                  <p className="text-sm text-green-500">+{(((1 / 0.15) - 1) * 100).toFixed(0)}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Circulating Supply</span>
                  </div>
                  <p className="text-lg font-semibold">{formatNumber(crypto.volume / crypto.price)}</p>
                  <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Max Supply</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {crypto.symbol === 'BTC' ? '21M' : '∞'}
                  </p>
                  <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CryptoDetail;