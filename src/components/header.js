import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav>
        <table><tbody><tr>
            <td><Link to="/" style={{ color: `white`, textDecoration: `none` }}>Game Index</Link></td>
            <td><Link to="/topgames" style={{ color: `white`, textDecoration: `none`}}>Top Games</Link></td>
            <td><Link to="/users" style={{ color: `white`, textDecoration: `none`}}>Users</Link></td>
            <td><Link to="/about" style={{ color: `white`, textDecoration: `none`}}>About</Link></td>
        </tr></tbody></table>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
