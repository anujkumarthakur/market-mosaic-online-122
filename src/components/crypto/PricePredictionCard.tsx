import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, Target, Clock, Users, Lightbulb } from 'lucide-react';

interface PricePrediction {
  id: string;
  userId: string;
  userName: string;
  predictedPrice: number;
  timeframe: string;
  reasoning: string;
  confidence: number;
  timestamp: Date;
  votes: number;
}

interface PricePredictionCardProps {
  crypto: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
  };
}

export const PricePredictionCard: React.FC<PricePredictionCardProps> = ({ crypto }) => {
  const { toast } = useToast();
  const [predictions, setPredictions] = useState<PricePrediction[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'CryptoTrader2024',
      predictedPrice: crypto.price * 1.15,
      timeframe: '1h',
      reasoning: 'Strong bullish momentum and positive market sentiment. Technical indicators showing upward trend.',
      confidence: 85,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      votes: 12
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'MarketAnalyst',
      predictedPrice: crypto.price * 0.92,
      timeframe: '2h',
      reasoning: 'Market correction expected due to overbought conditions. Support level around current prediction.',
      confidence: 75,
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      votes: 8
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'BlockchainExpert',
      predictedPrice: crypto.price * 1.08,
      timeframe: '4h',
      reasoning: 'Institutional buying pressure and upcoming network upgrade should drive price higher.',
      confidence: 90,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      votes: 15
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPrediction, setNewPrediction] = useState({
    predictedPrice: crypto.price,
    timeframe: '1h',
    reasoning: '',
    confidence: 50
  });

  const handleSubmitPrediction = () => {
    if (!newPrediction.reasoning.trim()) {
      toast({
        title: "Error",
        description: "Please provide reasoning for your prediction",
        variant: "destructive"
      });
      return;
    }

    const prediction: PricePrediction = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'You',
      predictedPrice: newPrediction.predictedPrice,
      timeframe: newPrediction.timeframe,
      reasoning: newPrediction.reasoning,
      confidence: newPrediction.confidence,
      timestamp: new Date(),
      votes: 0
    };

    setPredictions([prediction, ...predictions]);
    setNewPrediction({
      predictedPrice: crypto.price,
      timeframe: '1h',
      reasoning: '',
      confidence: 50
    });
    setShowForm(false);

    toast({
      title: "Prediction Submitted",
      description: "Your price prediction has been added successfully!",
    });
  };

  const handleVote = (predictionId: string) => {
    setPredictions(prev => 
      prev.map(p => 
        p.id === predictionId 
          ? { ...p, votes: p.votes + 1 }
          : p
      )
    );
    
    toast({
      title: "Vote Recorded",
      description: "Thanks for voting on this prediction!",
    });
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  const getPredictionTrend = (predictedPrice: number) => {
    const change = ((predictedPrice - crypto.price) / crypto.price) * 100;
    return change;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Price Predictions for {crypto.symbol}
          </CardTitle>
          <Button 
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? "outline" : "default"}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            {showForm ? 'Cancel' : 'Add Prediction'}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Community price predictions with reasoning and confidence levels
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Prediction Form */}
        {showForm && (
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="predictedPrice">Predicted Price ($)</Label>
                  <Input
                    id="predictedPrice"
                    type="number"
                    step="0.01"
                    value={newPrediction.predictedPrice}
                    onChange={(e) => setNewPrediction(prev => ({
                      ...prev,
                      predictedPrice: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Select 
                    value={newPrediction.timeframe} 
                    onValueChange={(value) => setNewPrediction(prev => ({ ...prev, timeframe: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30m">30 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="2h">2 hours</SelectItem>
                      <SelectItem value="4h">4 hours</SelectItem>
                      <SelectItem value="12h">12 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="confidence">Confidence Level: {newPrediction.confidence}%</Label>
                <Input
                  id="confidence"
                  type="range"
                  min="1"
                  max="100"
                  value={newPrediction.confidence}
                  onChange={(e) => setNewPrediction(prev => ({
                    ...prev,
                    confidence: parseInt(e.target.value)
                  }))}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="reasoning">Reasoning & Analysis</Label>
                <Textarea
                  id="reasoning"
                  placeholder="Explain your prediction with technical analysis, market factors, or other reasoning..."
                  value={newPrediction.reasoning}
                  onChange={(e) => setNewPrediction(prev => ({ ...prev, reasoning: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button onClick={handleSubmitPrediction} className="w-full">
                Submit Prediction
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Predictions List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">{predictions.length} Community Predictions</span>
          </div>
          
          {predictions.map((prediction) => {
            const trendChange = getPredictionTrend(prediction.predictedPrice);
            const isPositive = trendChange > 0;
            
            return (
              <Card key={prediction.id} className="border-l-4" style={{
                borderLeftColor: isPositive ? '#22c55e' : '#ef4444'
              }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                        {prediction.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{prediction.userName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(prediction.timestamp)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ${prediction.predictedPrice.toFixed(2)}
                        </span>
                        <Badge variant={isPositive ? "default" : "destructive"}>
                          {isPositive ? '+' : ''}{trendChange.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{prediction.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">{prediction.reasoning}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        Confidence: {prediction.confidence}%
                      </span>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleVote(prediction.id)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      👍 {prediction.votes}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};