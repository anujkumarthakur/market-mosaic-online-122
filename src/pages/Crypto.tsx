
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CryptoMarket } from '@/components/crypto/CryptoMarket';
import { useCryptoData, mockCryptos } from '@/utils/stocksApi';
import { StatsCard } from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, TrendingUp, TrendingDown, Coins, BarChart3, Flame, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Crypto = () => {
  const navigate = useNavigate();
  const cryptos = useCryptoData(mockCryptos);
  
  // Calculate crypto market statistics
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + (crypto.price * crypto.volume / crypto.price), 0);
  const gainers = cryptos.filter(crypto => crypto.changePercent > 0);
  const losers = cryptos.filter(crypto => crypto.changePercent < 0);
  
  const topGainer = [...cryptos].sort((a, b) => b.changePercent - a.changePercent)[0];
  const topLoser = [...cryptos].sort((a, b) => a.changePercent - b.changePercent)[0];

  return (
    <PageLayout title="Cryptocurrency Market">
      <div className="space-y-6">
        {/* Crypto Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
          <StatsCard 
            title="Total Market Cap" 
            value="$2.41T"
            trend={2.34}
            icon={<Bitcoin />}
            className="bg-primary/5"
          />
          <StatsCard 
            title="24h Volume" 
            value="$89.7B"
            description="Trading volume"
            icon={<Coins />}
            className="bg-primary/5"
          />
          <StatsCard 
            title="Top Gainer" 
            value={topGainer?.symbol || 'N/A'}
            trend={topGainer?.changePercent || 0}
            trendLabel={topGainer?.name || ''}
            icon={<TrendingUp />}
            className="bg-success/5"
          />
          <StatsCard 
            title="Top Loser" 
            value={topLoser?.symbol || 'N/A'}
            trend={topLoser?.changePercent || 0}
            trendLabel={topLoser?.name || ''}
            icon={<TrendingDown />}
            className="bg-danger/5"
          />
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/crypto-market-cap')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Cap Rankings
                </span>
                <ExternalLink className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View detailed market cap rankings for all cryptocurrencies with comprehensive data and analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/crypto-trending')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Trending Cryptos
                </span>
                <ExternalLink className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover trending cryptocurrencies, top gainers, losers, and recently added tokens.
              </p>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Price Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Community-driven price predictions with detailed analysis and reasoning.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Crypto Market Component */}
        <div className="animate-slide-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
          <CryptoMarket cryptos={cryptos} className="w-full" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Crypto;
