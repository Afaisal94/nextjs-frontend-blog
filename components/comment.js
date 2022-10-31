import { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import axios from "axios";

const fetcher = async (url, postId) => {
    const response = await axios.get(`https://mern-backend-blog-app.herokuapp.com/${url}/post/${postId}`);
    return response.data;
  };

export default function Comment(props) {
  const { postId } = props;
  const { mutate } = useSWRConfig()
  const [comment, setComment] = useState('')
  const { data, error } = useSWR(['comments', postId], fetcher);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Post Comment
    axios
      .post("https://mern-backend-blog-app.herokuapp.com/comments", {
        comment: comment,
        post: postId,
      })
      .then((response) => {
        setComment("");
        mutate(['comments', postId]);
      });
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <section className="mb-5">
        <div className="card bg-light">
          <div className="card-body">
            {/* Comment form */}
            <form onSubmit={handleSubmit} className="mb-4">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Join the discussion and leave a comment!"
                name="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <input
                className="btn btn-primary mt-2"
                type="submit"
                value="Submit Comment"
              />
            </form>

            {/* Comment List */}
            {data.map((c) => {
              return (
                <div className="d-flex mb-3" key={c._id}>
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle"
                      src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                      alt="..."
                    />
                  </div>
                  <div className="ms-3">{c.comment}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
