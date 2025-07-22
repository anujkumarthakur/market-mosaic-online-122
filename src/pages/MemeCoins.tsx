import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Flame, Rocket, Clock } from "lucide-react";
import { useState } from "react";

const timeFilters = [
  { label: "1m", value: "1m", key: "change1m" },
  { label: "5m", value: "5m", key: "change5m" },
  { label: "15m", value: "15m", key: "change15m" },
  { label: "1h", value: "1h", key: "change1h" },
  { label: "6h", value: "6h", key: "change6h" },
  { label: "12h", value: "12h", key: "change12h" },
  { label: "1d", value: "1d", key: "change24h" },
];

const solanaMemeCoins = [
  {
    name: "dogwifhat",
    symbol: "WIF",
    price: "$2.45",
    change1m: "+2.1%",
    change5m: "+4.3%",
    change15m: "+7.8%",
    change1h: "+9.2%",
    change6h: "+11.1%",
    change12h: "+12.0%",
    change24h: "+12.5%",
    marketCap: "$2.4B",
    volume: "$145M",
    isPositive: true,
    icon: "🐕"
  },
  {
    name: "Bonk",
    symbol: "BONK",
    price: "$0.000032",
    change1m: "+1.8%",
    change5m: "+3.1%",
    change15m: "+5.4%",
    change1h: "+6.7%",
    change6h: "+7.9%",
    change12h: "+8.1%",
    change24h: "+8.2%",
    marketCap: "$2.1B",
    volume: "$98M",
    isPositive: true,
    icon: "🐶"
  },
  {
    name: "Popcat",
    symbol: "POPCAT",
    price: "$1.23",
    change1m: "-0.5%",
    change5m: "-1.2%",
    change15m: "-2.1%",
    change1h: "-2.8%",
    change6h: "-3.0%",
    change12h: "-3.1%",
    change24h: "-3.1%",
    marketCap: "$1.2B",
    volume: "$67M",
    isPositive: false,
    icon: "🐱"
  },
  {
    name: "Jito",
    symbol: "JTO",
    price: "$3.45",
    change1m: "+5.2%",
    change5m: "+8.9%",
    change15m: "+12.3%",
    change1h: "+14.1%",
    change6h: "+15.5%",
    change12h: "+15.6%",
    change24h: "+15.7%",
    marketCap: "$890M",
    volume: "$123M",
    isPositive: true,
    icon: "🚀"
  },
  {
    name: "Myro",
    symbol: "MYRO",
    price: "$0.156",
    change1m: "-2.1%",
    change5m: "-4.3%",
    change15m: "-5.8%",
    change1h: "-6.9%",
    change6h: "-7.2%",
    change12h: "-7.3%",
    change24h: "-7.4%",
    marketCap: "$156M",
    volume: "$23M",
    isPositive: false,
    icon: "🐭"
  }
];

const ethereumMemeCoins = [
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: "$0.078",
    change1m: "+1.2%",
    change5m: "+2.8%",
    change15m: "+3.9%",
    change1h: "+4.5%",
    change6h: "+5.0%",
    change12h: "+5.1%",
    change24h: "+5.2%",
    marketCap: "$11.2B",
    volume: "$892M",
    isPositive: true,
    icon: "🐕"
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    price: "$0.0000095",
    change1m: "+0.8%",
    change5m: "+1.9%",
    change15m: "+2.7%",
    change1h: "+3.2%",
    change6h: "+3.6%",
    change12h: "+3.7%",
    change24h: "+3.8%",
    marketCap: "$5.6B",
    volume: "$234M",
    isPositive: true,
    icon: "🐕"
  },
  {
    name: "Pepe",
    symbol: "PEPE",
    price: "$0.0000012",
    change1m: "+8.1%",
    change5m: "+12.4%",
    change15m: "+15.8%",
    change1h: "+17.2%",
    change6h: "+18.7%",
    change12h: "+18.8%",
    change24h: "+18.9%",
    marketCap: "$5.1B",
    volume: "$1.2B",
    isPositive: true,
    icon: "🐸"
  },
  {
    name: "Floki",
    symbol: "FLOKI",
    price: "$0.000023",
    change1m: "-0.3%",
    change5m: "-0.8%",
    change15m: "-1.4%",
    change1h: "-1.8%",
    change6h: "-2.0%",
    change12h: "-2.1%",
    change24h: "-2.1%",
    marketCap: "$2.2B",
    volume: "$89M",
    isPositive: false,
    icon: "🐕"
  },
  {
    name: "Baby Doge Coin",
    symbol: "BABYDOGE",
    price: "$0.0000000034",
    change1m: "+2.1%",
    change5m: "+4.2%",
    change15m: "+5.8%",
    change1h: "+6.9%",
    change6h: "+7.4%",
    change12h: "+7.5%",
    change24h: "+7.6%",
    marketCap: "$1.4B",
    volume: "$45M",
    isPositive: true,
    icon: "🐶"
  }
];

const MemeCoinsTable = ({ coins, chainName, selectedTimeFilter }: { 
  coins: typeof solanaMemeCoins, 
  chainName: string,
  selectedTimeFilter: string 
}) => {
  const currentFilter = timeFilters.find(f => f.value === selectedTimeFilter);
  const changeKey = currentFilter?.key || "change24h";
  
  return (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {chainName === "Solana" ? "🟣" : "💎"} {chainName} Meme Coins
        <Flame className="h-5 w-5 text-orange-500" />
      </CardTitle>
      <CardDescription>
        Top performing meme coins on {chainName} blockchain
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">Coin</th>
              <th className="text-right py-3 px-2">Price</th>
              <th className="text-right py-3 px-2">{currentFilter?.label} Change</th>
              <th className="text-right py-3 px-2">Market Cap</th>
              <th className="text-right py-3 px-2">Volume</th>
              <th className="text-center py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => {
              const changeValue = coin[changeKey as keyof typeof coin] as string;
              const isPositive = changeValue.startsWith('+');
              
              return (
              <tr key={coin.symbol} className="border-b border-border/50 hover:bg-muted/50">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{coin.icon}</span>
                    <div>
                      <div className="font-semibold">{coin.name}</div>
                      <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="text-right py-4 px-2 font-mono">{coin.price}</td>
                <td className="text-right py-4 px-2">
                  <Badge variant={isPositive ? "default" : "destructive"} className="gap-1">
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {changeValue}
                  </Badge>
                </td>
                <td className="text-right py-4 px-2 font-mono">{coin.marketCap}</td>
                <td className="text-right py-4 px-2 font-mono">{coin.volume}</td>
                <td className="text-center py-4 px-2">
                  <Button variant="outline" size="sm">
                    <Rocket className="h-4 w-4 mr-1" />
                    Trade
                  </Button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);
};
export default function MemeCoins() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("1d");
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          🚀 Meme Coins Universe
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the hottest meme coins across Solana and Ethereum blockchains. 
          From community favorites to viral sensations!
        </p>
        
        {/* Time Filter Buttons */}
        <Card className="w-fit mx-auto">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Time Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2 justify-center">
              {timeFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedTimeFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeFilter(filter.value)}
                  className="min-w-[50px]"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8">
        <MemeCoinsTable coins={solanaMemeCoins} chainName="Solana" selectedTimeFilter={selectedTimeFilter} />
        <MemeCoinsTable coins={ethereumMemeCoins} chainName="Ethereum" selectedTimeFilter={selectedTimeFilter} />
      </div>

      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚠️ Meme Coin Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Meme coins are highly volatile and speculative investments. They can experience extreme price swings 
            and may lose value rapidly. Always do your own research (DYOR) and never invest more than you can afford to lose.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}