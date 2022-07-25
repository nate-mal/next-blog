import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/post-util";
import Head from "next/head";
function SinglePostPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>

      <PostContent post={props.post} />
    </>
  );
}

export function getStaticPaths() {
  const slugs = getPostsFiles().map((fileName) =>
    fileName.replace(/\.md$/, "")
  );

  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export function getStaticProps(context) {
  const slug = context.params.slug;
  const post = getPostData(slug);
  return { props: { post }, revalidate: 60 };
}
export default SinglePostPage;
