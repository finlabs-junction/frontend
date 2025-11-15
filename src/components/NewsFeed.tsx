import { Newspaper, TrendingUp, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { AIHelper } from "./AIHelper";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "financial" | "general" | "alert";
  relevance: "high" | "medium" | "low";
  hint?: string;
}

interface NewsFeedProps {
  articles: NewsArticle[];
}

export function NewsFeed({ articles }: NewsFeedProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <TrendingUp className="w-4 h-4" />;
      case "alert":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "alert":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRelevanceBadge = (relevance: string) => {
    const colors = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700",
    };
    return colors[relevance as keyof typeof colors] || colors.low;
  };

  return (
    <Card className="h-fit" data-context="news">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5" />
          <CardTitle>News Feed</CardTitle>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Time-accurate financial news & events
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="px-6 pb-6 space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className={`p-4 border rounded-lg ${getCategoryColor(article.category)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getCategoryIcon(article.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm line-clamp-2">{article.title}</h4>
                      <AIHelper
                        context={`news-${article.id}`}
                        tooltipText="Get insights about this news"
                      />
                    </div>
                    <p className="text-xs opacity-80 mb-2">{article.summary}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {article.date}
                      </Badge>
                      <Badge
                        className={`text-xs ${getRelevanceBadge(article.relevance)}`}
                      >
                        {article.relevance} relevance
                      </Badge>
                    </div>
                    {article.hint && (
                      <div className="mt-2 p-2 bg-white bg-opacity-50 rounded text-xs">
                        <span className="opacity-70">💡 Hint: </span>
                        {article.hint}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
