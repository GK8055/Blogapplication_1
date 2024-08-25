import './index.css'
import {Link} from 'react-router-dom'

const Header = () => {

  return (
    <nav className="header_container">
      <Link to="/" className="link_text link_style">
      <h1 className="title">ZuAI</h1>
      </Link>
      <div className="links_container">
        <Link to="/login" className="link_text link_style">
          Login
        </Link>
        <button className="join_now_btn" type="button" >
          Join Now
        </button>
      </div>
    </nav>
  )
}
export default Header
