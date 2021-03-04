import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const about = () => (
    <Layout>
      <SEO title="About" />
      <h1>Welcome</h1>
      <p>
        This website compiles data from the Solitaire Games on Your Table geeklists, 
        found on <a href="https://boardgamegeek.com/dashboard" target="_blank" rel="noreferrer">boardgamegeek</a>.
      </p>
      <p>
        The data was compiled by using python and the boardgamegeek API.
      </p>
      <p>
        The website was created using <a href="https://gatsbyjs.com/" target="_blank" rel="noreferrer">gatsby</a>.
      </p>
      <p>
        To contact me regarding bugs, feature requests, or general comments, please message <a href="https://boardgamegeek.com/user/userid122002" target="_blank" rel="noreferrer">me</a> on boardgamegeek.
      </p>
      <p>
        The code is open-source and can be found <a href="https://github.com/userid122002/sgoyt" target="_blank" rel="noreferrer">here</a>. Please let me know if you're interestd in contributing!
      </p>
      <p>
        Click <Link to="/history">here</Link> to see a history of updates and changes.
      </p>
    </Layout>
  )
  
  export default about