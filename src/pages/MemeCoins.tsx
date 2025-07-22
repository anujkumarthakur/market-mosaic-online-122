import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Flame, Rocket } from "lucide-react";

const solanaMemeCoins = [
  {
    name: "dogwifhat",
    symbol: "WIF",
    price: "$2.45",
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
    change24h: "+7.6%",
    marketCap: "$1.4B",
    volume: "$45M",
    isPositive: true,
    icon: "🐶"
  }
];

const MemeCoinsTable = ({ coins, chainName }: { coins: typeof solanaMemeCoins, chainName: string }) => (
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
              <th className="text-right py-3 px-2">24h Change</th>
              <th className="text-right py-3 px-2">Market Cap</th>
              <th className="text-right py-3 px-2">Volume</th>
              <th className="text-center py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
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
                  <Badge variant={coin.isPositive ? "default" : "destructive"} className="gap-1">
                    {coin.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {coin.change24h}
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
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default function MemeCoins() {
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
      </div>

      <div className="grid gap-8">
        <MemeCoinsTable coins={solanaMemeCoins} chainName="Solana" />
        <MemeCoinsTable coins={ethereumMemeCoins} chainName="Ethereum" />
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