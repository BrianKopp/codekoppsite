import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ contents }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <div dangerouslySetInnerHTML={{ __html: contents }} />
  </div>
))
