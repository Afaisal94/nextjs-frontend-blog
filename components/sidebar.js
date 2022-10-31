import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import useSWR from "swr"
import axios from "axios"

const fetcher = async () => {
  const response = await axios.get("https://mern-backend-blog-app.herokuapp.com/categories");
  return response.data.categories;
};

export default function Sidebar() {
  const router = useRouter();
  const { data, error } = useSWR("categories", fetcher);
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/post/search/${query}`);
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className="col-lg-5">
      <div className="card mb-4">
        <div className="card-header">Search</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search Post"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <input
                className="btn btn-primary"
                id="button-search"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">Categories</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <ul className="list-unstyled mb-0">
                {data.map((category) => {
                  return (
                    <li key={category._id}>
                      <Link href={`/post/category/${category.name}`}>
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
