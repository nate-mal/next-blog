import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/post-util";
import Head from "next/head";
function HomePage(props) {
  return (
    <>
      <Head>
        <title>Nati's Blog</title>
        <meta
          name="description"
          content=" I post about programing and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return { props: { posts: featuredPosts } };
}

export default HomePage;
// deplo
