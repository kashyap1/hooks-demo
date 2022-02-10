import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import reducers from "./reducers";

import PostIndex from "./components/post_index";
import PostNew from "./components/posts_new";
import PostsShow from "./components/posts_show";

import * as serviceWorker from "./serviceWorker";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostNew} />
          <Route path="/posts/:id" component={PostNew} />
          <Route path="/" component={PostIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
