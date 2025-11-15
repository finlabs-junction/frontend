import { Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import type { NewsArticle } from "../types";
import { AIHelper } from "./AIHelper";

interface NewsFeedProps {
  articles: NewsArticle[];
}

export function NewsFeed({ articles }: NewsFeedProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial":
        return "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "alert":
        return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700";
    }
  };

  return (
    <Card className="h-fit" data-context="news">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-gray-900 dark:text-white" />
          <CardTitle>News Feed</CardTitle>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Time-accurate financial news & events
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="px-6 pb-6 space-y-4">
            {articles
              .sort((a, b) => b.id - a.id)
              .map((article) => {
                const fullArticleText = `${article.title}. ${article.description}`;
                return (
                  <div
                    key={article.id}
                    className={`p-4 border rounded-lg ${getCategoryColor("financial")}`}
                    data-news-id={article.id}
                    data-article-text={fullArticleText}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm line-clamp-2">
                            {article.title}
                          </h4>
                          <AIHelper
                            context={`news-${article.id}`}
                            tooltipText="Get insights about this news"
                          />
                        </div>
                        <p className="text-xs opacity-80 mb-2">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {article.date}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {articles.length === 0 && (
              <p className="text-sm text-gray-500">
                No news articles available.
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
