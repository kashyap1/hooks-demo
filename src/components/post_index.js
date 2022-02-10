import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { fetchPost, deletePost } from "../actions/index.js";
import { Link } from "react-router-dom";

const PostIndex = () => {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, []);

  const onDelete = id => {
    dispatch(deletePost(id, () => {}));
  };

  const renderPosts = () => {
    return _.map(posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <div>
            <Link to={`/posts/${post.id}`} key={`link${post.id}`}>
              {post.title}
            </Link>
          </div>
          <div onClick={onDelete.bind(null, post.id)}>Delete</div>
        </li>
      );
    });
  };

  return (
    <div>
      <div className="text-xs-right">
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>
      </div>
      <h3>Posts</h3>
      <ul className="list-group">{renderPosts()}</ul>
    </div>
  );
};

export default PostIndex;
