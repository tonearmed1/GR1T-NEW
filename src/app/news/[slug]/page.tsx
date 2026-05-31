import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  cover?: string | null;
  blocks?: { __component: string; body?: string }[];
  publicationDate: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetch(`${process.env.STRAPI_API_URL}?populate=*&filters[slug][$eq]=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch article:", res.statusText);
    return null;
  }

  const json = await res.json();

  if (!json.data || json.data.length === 0) return null;

  const a = json.data[0];

  return {
    id: a.id,
    title: a.title,
    description: a.description,
    slug: a.slug,
    createdAt: a.createdAt,
    cover: a.cover?.formats?.large?.url || a.cover?.url || null,
    blocks: a.blocks,
    publicationDate: a.publicationDate,
  };
}

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) return notFound();

  return (
    <article className="  prose pt-20 bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {article.cover && (
          <div className="relative w-full h-80 mb-6">
            <Image src={article.cover} alt={article.title} fill className="object-cover rounded-2xl" />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-3 text-black">{article.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{article.publicationDate ? article.publicationDate : ""}</p>

        {/* Main Content */}
        {article.blocks?.map((block) =>
          block.__component === "shared.rich-text" && block.body ? (
            <div key={block.body.slice(0, 10)} className="prose prose-lg max-w-none text-black">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-4xl font-bold my-6" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold my-5" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold my-4" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-xl font-semibold my-3" {...props} />,
                  p: ({ node, ...props }) => <p className="leading-relaxed text-lg my-2 text-gray-700" {...props} />,
                  a: ({ node, ...props }) => (
                    <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-4 my-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-4 my-2" {...props} />,
                  li: ({ node, ...props }) => <li className="my-1" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props} />
                  ),

                  img: ({ node, ...props }) => (
                    <Image
                      src={(props.src as string) || ""}
                      alt={props.alt || ""}
                      width={600}
                      height={400}
                      className="rounded my-4"
                    />
                  ),
                  table: ({ node, ...props }) => (
                    <table className="table-auto border-collapse border border-gray-300 my-4" {...props} />
                  ),
                  th: ({ node, ...props }) => <th className="border px-2 py-1 bg-gray-100" {...props} />,
                  td: ({ node, ...props }) => <td className="border px-2 py-1" {...props} />,
                }}
              >
                {block.body}
              </ReactMarkdown>
            </div>
          ) : null
        )}
      </div>
    </article>
  );
}
