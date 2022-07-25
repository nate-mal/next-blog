import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
SyntaxHighlighter.registerLanguage("js", js);
function PostContent({ post }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  // img(image) {
  //   return (
  //     <Image
  //       src={`/images/posts/${post.slug}/${image.src}`}
  //       alt={image.alt}
  //       width={600}
  //       height={300}
  //     />
  //   );
  // },
  const customRenderes = {
    p: (paragraph) => {
      const { children } = paragraph;

      if (children[0].type === "img") {
        const image = children[0].props;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      } else return <p>{paragraph.children}</p>;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, "")}
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderes}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
