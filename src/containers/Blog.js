
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ data }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {data.map(component => (
        <li key={component.id}>
          <Link to={`/blog/post/${component.id}/`}>{component.title}</Link>
        </li>
      ))}
    </ul>
  </div>
))
