import AllPost from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";
import Head from "next/head";
function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="descrption"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPost posts={props.posts} />
    </>
  );
}
export function getStaticProps() {
  const allPosts = getAllPosts();
  return { props: { posts: allPosts } };
}
export default AllPostsPage;
