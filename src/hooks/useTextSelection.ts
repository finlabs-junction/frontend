import { useState, useEffect } from "react";

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [selectionContext, setSelectionContext] = useState("");
  const [newsId, setNewsId] = useState<string | null>(null);
  const [articleText, setArticleText] = useState<string | null>(null);

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length >= 3 && text.length < 200) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setSelectionPosition({ x: rect.left, y: rect.bottom });

          // Determine context based on where selection was made
          const parentElement = range?.startContainer.parentElement;
          const context =
            parentElement
              ?.closest("[data-context]")
              ?.getAttribute("data-context") || "general";
          setSelectionContext(context);

          // If context is news, get the news article ID and full article text
          if (context === "news") {
            const newsElement = parentElement?.closest("[data-news-id]");
            const newsIdValue = newsElement?.getAttribute("data-news-id");
            const articleTextValue = newsElement?.getAttribute("data-article-text");
            setNewsId(newsIdValue || null);
            setArticleText(articleTextValue || null);
          } else {
            setNewsId(null);
            setArticleText(null);
          }
        }
      } else {
        setSelectedText(null);
        setNewsId(null);
        setArticleText(null);
      }
    };

    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("touchend", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection);
    };
  }, []);

  return {
    selectedText,
    selectionPosition,
    selectionContext,
    newsId,
    articleText,
    clearSelection: () => {
      setSelectedText(null);
      setNewsId(null);
      setArticleText(null);
    },
  };
};
