import AllPost from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";

function AllPostsPage(props) {
  return <AllPost posts={props.posts} />;
}
export function getStaticProps() {
  const allPosts = getAllPosts();
  return { props: { posts: allPosts } };
}
export default AllPostsPage;
