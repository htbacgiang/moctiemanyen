import React from 'react'
import { Link , Redirect} from 'react-router-dom';
import './menu.css'
const SlideBarMobile = () => {
  return (
    <>
    <input hidden type="checkbox" className="nav-input" id="nav-mobile-input"/>
    <label for="nav-mobile-input" className="nav-overlay"></label>
    <div className="menu-mobile" >
        <label for="nav-mobile-input" className="nav-close-btn"> <i className="fas fa-times"></i></label>    
        <ul>
          <li><a> <Link to={`/`}> Trang chủ </Link> </a></li>
          <li><a> <Link to={`/about`}> Giới thiệu</Link> </a></li>
          <li>
          <a> <Link to={`/album`}> Album </Link> </a>
            <label for="btn-1">  <i class="fas fa-angle-down"></i>  </label>
            <input className='input' type="checkbox" id="btn-1"/>
            <ul>
                       <li><a> <Link to={`/album/viet-nam-que-huong-toi`}> Việt Nam quê hương tôi </Link> </a></li>
                       <li><a> <Link to={`/album/ha-tay-que-lua`}> Hà Tây quê lụa </Link> </a></li>
                       <li><a> <Link to={`/album/truong-va-nhung-nguoi-ban`}> Trường & Friends </Link> </a></li>
                       <li><a> <Link to={`/album/bsa`}> BSA </Link> </a></li>
                       <li><a> <Link to={`/album/bus-ha-noi`}> Xe bus Hà Nội </Link> </a></li>

            </ul>
          </li>
          <li><a> <Link to={`/blog`}> Bài biết </Link> </a></li>
          <li><a> <Link to={`/lien-he`}> Liên hệ </Link> </a></li>
          </ul>
    </div>
    </>
  )
}

export default SlideBarMobile