"use client";
import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-amber max-w-none text-sm leading-relaxed">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 className="text-xl font-bold text-amber-400 mt-6 mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-semibold text-amber-300 mt-5 mb-2 border-b border-zinc-700 pb-1">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-semibold text-zinc-200 mt-4 mb-1">{children}</h3>,
          p: ({ children }) => <p className="text-zinc-300 mb-3">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3 text-zinc-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3 text-zinc-300">{children}</ol>,
          li: ({ children }) => <li className="text-zinc-300">{children}</li>,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
          em: ({ children }) => <em className="text-zinc-400">{children}</em>,
          code: ({ children }) => <code className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
          blockquote: ({ children }) => <blockquote className="border-l-2 border-amber-500 pl-4 text-zinc-400 italic my-3">{children}</blockquote>,
          table: ({ children }) => <div className="overflow-x-auto mb-4"><table className="w-full text-sm border-collapse">{children}</table></div>,
          th: ({ children }) => <th className="text-left px-3 py-2 bg-zinc-800 text-amber-300 font-semibold border border-zinc-700">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2 border border-zinc-700 text-zinc-300">{children}</td>,
          hr: () => <hr className="border-zinc-700 my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
