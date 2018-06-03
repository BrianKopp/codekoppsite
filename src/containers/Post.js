import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ data, contents }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <h1>{data.title}</h1>
    <br />
    <div dangerouslySetInnerHTML={{ __html: contents }} />
  </div>
))
