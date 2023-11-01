import React from 'react'
import { Link , Redirect} from 'react-router-dom';
import './menu.css';
import { BiMenuAltLeft,BiChevronDown } from "react-icons/bi";


const Menu = () => {
  return (
    <>
      <div className="">
            <div className="menu-pc">
                <ul>
                    <li className=" text-white ">
                        <a className='d-flex '>
                          <BiMenuAltLeft size={30} className=" text-white" />
                         <Link to={`/san-pham`} className='text-white'>Danh sách sản phẩm </Link> 
                         <BiChevronDown size={30} className=" text-white" />
                         </a>
                      <ul className='list-menu'>
                      <li><a> <Link to={`/san-pham/tra-hoa-du-du-xa-den`}> Trà hoa đu đủ xạ đen </Link> </a></li>
                      </ul>
                    </li>
                   
                </ul>
            </div>
        </div>
        
    </>
  )
}

export default Menu