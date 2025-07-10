
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CryptoMarket } from '@/components/crypto/CryptoMarket';
import { useCryptoData, mockCryptos } from '@/utils/stocksApi';
import { StatsCard } from '@/components/ui/StatsCard';
import { Bitcoin, TrendingUp, TrendingDown, Coins } from 'lucide-react';

const Crypto = () => {
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

        {/* Crypto Market Component */}
        <div className="animate-slide-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <CryptoMarket cryptos={cryptos} className="w-full" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Crypto;
