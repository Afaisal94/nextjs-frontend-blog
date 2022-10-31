import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import useSWR from "swr";
import axios from "axios";
import { Container, Col, Row } from "./../node_modules/react-bootstrap";
import Header from "./../components/header";
import Layout from "./../components/layout";
import Sidebar from "./../components/sidebar";

const fetcher = async () => {
  const response = await axios.get("https://mern-backend-blog-app.herokuapp.com/posts");
  return response.data.posts;
};

export default function Home() {
  const { data, error } = useSWR("posts", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <Layout>
      <Head>
        <title>Home Blog App</title>
      </Head>
      <Header title={"Blog Home"} tagline={"Blog created by next js"} />
      <Container>
        <Row>
          <Col className="col-lg-7">
          {
            data.map((post) => (
              <div className="card mb-4" key={post._id}>
                <img
                  className="card-img-top"
                  src={post.image}                  
                  alt={post.title}
                />
                <div className="card-body">
                  <div className="small text-muted">{post.createAt}</div>
                  <h2 className="card-title">{post.title}</h2>
                  <p className="card-text" >{post.description}</p>
                  <Link href={`/post/${post.slug}`} className="btn btn-primary">
                    Read more →
                  </Link>
                </div>
              </div>
            ))
          }
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  );
}
