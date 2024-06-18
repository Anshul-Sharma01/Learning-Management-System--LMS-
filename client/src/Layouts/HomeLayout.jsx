import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function HomeLayout({ children }){

    function changeWidth(){
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 0;
    }

    function hideDrawer(){
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        changeWidth();
    }

    return(
        <div className="min-h-[90vh]"> 
            <div className="drawer absolute left-0 z-50 w-fit ">
                <input type="checkbox" id="my-drawer" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            size={"32px"}
                            className="font-bold text-white m-4"
                            onClick={changeWidth}
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <link to="/">Home</link>
                        </li>
                        <li>
                            <link to="/course">Courses</link>
                        </li>
                        <li>
                            <link to="/contact">Contact Us</link>
                        </li>
                        <li>
                            <link to="/about">About</link>
                        </li>
                    </ul>
                </div>
            </div>

            {children}

            <Footer/>
        </div>
    )
}

export default HomeLayout;
