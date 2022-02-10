import React, { useEffect } from "react";
import { Field, reduxForm, change } from "redux-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchPostById } from "../actions";

const PostNew = props => {
  // const posts = useSelector(state => state.posts);
  const { id } = props.match.params;
  const post = useSelector(state => {
    return state.posts[id];
  });
  const dispatch = useDispatch();
  useEffect(() => {
    id && dispatch(fetchPostById(id));
  }, []);

  useEffect(
    () => {
      if (post) {
        dispatch(change("PostsNewForm", "title", post.title));
        dispatch(change("PostsNewForm", "categories", post.categories));
        dispatch(change("PostsNewForm", "content", post.content));
      }
    },
    [post]
  );

  const renderField = field => {
    console.log(field);
    const className = `form-group ${
      field.meta.touched && field.meta.error ? "has-danger" : ""
    }`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  };

  const onSubmit = values => {
    dispatch(
      createPost(values, () => {
        props.history.push("/");
      })
    );
  };

  const { handleSubmit } = props;

  return (
    <div>
      <div className="jumbotron">
        <h1>New Post!</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="title" component={renderField} label="Title" />
        <Field name="categories" component={renderField} label="Categories" />
        <Field name="content" component={renderField} label="Post Content" />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    </div>
  );
};

function validate(values) {
  // values is object that has (in this case) three properties
  // values.title, values.categories, and values.content
  //ie {title: "askdbnoaiwhd", categories:"oaihwdoqwbhd", content:"doihawoidh"}
  const errors = {};

  //validation occurs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter Content";
  }

  //if errors is empty, form is good to submit
  //if errors has any properties, no good
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(PostNew);
