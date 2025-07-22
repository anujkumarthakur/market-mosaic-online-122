import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, ExternalLink, Globe, Twitter, MessageCircle, BarChart3, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface TokenData {
  name: string;
  symbol: string;
  price: string;
  icon: string;
  marketCap: string;
  volume: string;
  change1m: string;
  change5m: string;
  change15m: string;
  change1h: string;
  change6h: string;
  change12h: string;
  change24h: string;
}

interface TokenDetailModalProps {
  token: TokenData | null;
  isOpen: boolean;
  onClose: () => void;
  chainName: string;
}

// Mock price history data
const generatePriceHistory = (currentPrice: string) => {
  const price = parseFloat(currentPrice.replace('$', ''));
  const data = [];
  
  for (let i = 23; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 0.1;
    const historicalPrice = price * (1 + variation);
    data.push({
      time: `${i}:00`,
      price: historicalPrice,
      volume: Math.random() * 1000000
    });
  }
  
  return data;
};

export default function TokenDetailModal({ token, isOpen, onClose, chainName }: TokenDetailModalProps) {
  if (!token) return null;

  const priceHistory = generatePriceHistory(token.price);
  const isPositive24h = token.change24h.startsWith('+');

  const tokenInfo = {
    totalSupply: chainName === "Solana" ? "1,000,000,000" : "420,690,000,000,000",
    circulatingSupply: chainName === "Solana" ? "999,000,000" : "410,690,000,000,000",
    holders: chainName === "Solana" ? "150,234" : "1,234,567",
    contractAddress: chainName === "Solana" 
      ? "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm"
      : "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    website: "https://tokenwebsite.com",
    telegram: "https://t.me/tokengroup",
    twitter: "https://twitter.com/token"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-3xl">{token.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{token.name}</h2>
              <p className="text-muted-foreground">{token.symbol} • {chainName}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Overview */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-2xl font-bold">{token.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <Badge variant={isPositive24h ? "default" : "destructive"} className="gap-1">
                    {isPositive24h ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {token.change24h}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-lg font-semibold">{token.marketCap}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-lg font-semibold">{token.volume}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chart" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Token Info
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Price Chart (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceHistory}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isPositive24h ? "#10b981" : "#ef4444"} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={isPositive24h ? "#10b981" : "#ef4444"} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: any) => [`$${value.toFixed(6)}`, "Price"]}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke={isPositive24h ? "#10b981" : "#ef4444"}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Volume Chart (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: any) => [`${(value / 1000000).toFixed(2)}M`, "Volume"]}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="volume" 
                          stroke="#3b82f6"
                          fill="#3b82f680" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Supply:</span>
                      <span className="font-mono">{tokenInfo.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Circulating Supply:</span>
                      <span className="font-mono">{tokenInfo.circulatingSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Holders:</span>
                      <span className="font-mono">{tokenInfo.holders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blockchain:</span>
                      <Badge variant="outline">{chainName}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contract & Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contract Address:</p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                          {tokenInfo.contractAddress}
                        </code>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Telegram
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Price Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "1m", change: token.change1m },
                      { label: "5m", change: token.change5m },
                      { label: "15m", change: token.change15m },
                      { label: "1h", change: token.change1h },
                      { label: "6h", change: token.change6h },
                      { label: "12h", change: token.change12h },
                      { label: "1d", change: token.change24h },
                    ].map((item) => {
                      const isPos = item.change.startsWith('+');
                      return (
                        <div key={item.label} className="text-center p-3 rounded-lg border">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <Badge variant={isPos ? "default" : "destructive"} className="gap-1">
                            {isPos ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {item.change}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2">
            <Button className="flex-1" size="lg">
              🚀 Buy {token.symbol}
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              📊 Add to Watchlist
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}