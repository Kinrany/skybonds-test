import * as React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { SharedEquity } from "./SharedEquity";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link to="/#shared-equity">Shared equity construction</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/">
          <SharedEquity />
        </Route>
        <Route path="/shared-equity">
          <SharedEquity />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
