import { cn } from '@/common/lib/utils';
import { Card, CardContent } from '@/common/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewCardProps {
  markdown: string;
  className?: string;
}

export function MarkdownPreviewCard({
  markdown,
  className,
}: MarkdownPreviewCardProps) {
  return (
    <Card className={className}>
      <CardContent className="font-mono text-sm">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Headings
            h1: ({ node, ...props }) => (
              <h1
                className="text-2xl font-bold mb-4 mt-6 pb-2 border-b border-border"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl font-bold mb-3 mt-5 pb-2 border-b border-border"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold mb-2 mt-4" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-base font-bold mb-2 mt-3" {...props} />
            ),
            h5: ({ node, ...props }) => (
              <h5 className="text-sm font-bold mb-2 mt-3" {...props} />
            ),
            h6: ({ node, ...props }) => (
              <h6 className="text-xs font-bold mb-2 mt-3" {...props} />
            ),

            // Paragraphs
            p: ({ node, ...props }) => (
              <p className="mb-4 leading-7" {...props} />
            ),

            // Lists
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol
                className="list-decimal list-inside mb-4 space-y-2"
                {...props}
              />
            ),
            li: ({ node, ...props }) => <li className="ml-4" {...props} />,

            // Blockquote
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-primary pl-4 py-2 my-4 italic bg-muted/50"
                {...props}
              />
            ),

            // Code
            code: ({ node, inline, className, children, ...props }) => {
              if (inline) {
                return (
                  <code
                    className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code
                  className={cn(
                    'block bg-muted p-4 rounded-md overflow-x-auto my-4 text-xs',
                    className
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            },

            // Pre (code block wrapper)
            pre: ({ node, ...props }) => (
              <pre
                className="bg-muted rounded-md overflow-x-auto my-4"
                {...props}
              />
            ),

            // Links
            a: ({ node, ...props }) => (
              <a
                className="text-primary underline hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),

            // Horizontal rule
            hr: ({ node, ...props }) => (
              <hr className="my-6 border-t border-border" {...props} />
            ),

            // Strong/Bold
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-foreground" {...props} />
            ),

            // Emphasis/Italic
            em: ({ node, ...props }) => <em className="italic" {...props} />,

            // Tables (GFM)
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table
                  className="min-w-full border border-border rounded-md"
                  {...props}
                />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-muted" {...props} />
            ),
            tbody: ({ node, ...props }) => <tbody {...props} />,
            tr: ({ node, ...props }) => (
              <tr className="border-b border-border" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="px-4 py-2 text-left font-bold border-r border-border last:border-r-0"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                className="px-4 py-2 border-r border-border last:border-r-0"
                {...props}
              />
            ),

            // Strikethrough (GFM)
            del: ({ node, ...props }) => (
              <del className="line-through opacity-70" {...props} />
            ),

            // Task list (GFM)
            input: ({ node, ...props }) => (
              <input className="mr-2 align-middle" disabled {...props} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}
