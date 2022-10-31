import { useState, useEffect } from 'react'
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Container, Col, Row } from "./../../node_modules/react-bootstrap";
import Layout from "./../../components/layout";
import Comment from "./../../components/comment";

const fetcher = async (url, slug) => {
  const response = await axios.get(`https://mern-backend-blog-app.herokuapp.com/${url}?slug=${slug}`);
  return response.data;
};

export default function postDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error } = useSWR(['posts', slug], fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Container>
        <Row>
          <Col className="col-lg-12">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{data.title}</h1>
                <div className="text-muted fst-italic mb-2">
                  {Date(data.createdAt)}
                </div>
                <span className="badge bg-secondary text-decoration-none link-light">
                  Category : {data.category.name}
                </span>
              </header>
              <figure className="mb-4">
                <img
                  className="img-fluid rounded"
                  src={data.image}
                  alt={data.title}
                />
              </figure>

              <section className="mb-5">
                <div
                  className="fs-5 mb-4"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>
              </section>
            </article>
            <Comment postId={data._id}/>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
