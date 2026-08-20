import BlogCard from "../Components/BlogCard";
import CategorySection from "../Components/CategorySection";
import Deshboard from "../Components/Deshboard";
import Hero from "../Components/Hero";
import Nav from "../Components/Nav";
import { getPosts } from "../Appwrite/service";
import { useEffect, useState } from "react";
import AboutSection from "../Components/AboutSection";
import Footer from "../Components/Footer";
import NewzLatter from "../Components/NewzLatter";
import FullStory from "../Components/FullStory";

const Home = () => {
  const [postdata, setpostdata] = useState([]);

  const getallposts = async () => {
    const res = await getPosts();
    setpostdata(res.documents);
  };
  useEffect(() => {
    getallposts();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <BlogCard postdata={postdata} />
      <AboutSection />
      <NewzLatter />
      <Footer />
    </>
  );
};

export default Home;
