import * as React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import { SharedEquity } from "./SharedEquity";
import { BondsDataCache } from "./BondsDataCache";

export default function App() {
  return (
    <HashRouter>
      <nav>
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link to="/shared-equity">Shared equity construction</Link>
          </li>
          <li>
            <Link to="/bonds-data-cache">Cache for getBondsData</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/shared-equity">
          <SharedEquity />
        </Route>
        <Route path="/bonds-data-cache">
          <BondsDataCache />
        </Route>
        <Route path="/">
          <SharedEquity />
        </Route>
      </Switch>
    </HashRouter>
  );
}
