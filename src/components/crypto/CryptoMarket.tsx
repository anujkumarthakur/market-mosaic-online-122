
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cryptocurrency, formatCurrency, formatPercentage } from '@/utils/stocksApi';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CryptoMarketProps {
  cryptos: Cryptocurrency[];
  className?: string;
}

export function CryptoMarket({ cryptos, className }: CryptoMarketProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bitcoin className="h-5 w-5 text-orange-500" />
          Cryptocurrency Market
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cryptos.slice(0, 8).map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{crypto.symbol}</span>
                  <span className="text-xs text-muted-foreground">{crypto.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">
                    {formatCurrency(crypto.price)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Vol: ${(crypto.volume / 1000000000).toFixed(1)}B
                  </div>
                </div>
                
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium min-w-[60px] justify-end",
                  crypto.changePercent >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {crypto.changePercent >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercentage(crypto.changePercent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
