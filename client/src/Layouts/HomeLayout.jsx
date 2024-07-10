import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Logout} from '../Redux/Slices/AuthSlice.js';


function HomeLayout({ children }){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const role = useSelector((state) => state?.auth?.role);


    function changeWidth(){
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer(){
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 0;
    }

    async function handleLogout(e){
        e.preventdefault();
        const res = await dispatch(Logout());
        if(res?.payload?.success)
        navigate("/");
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
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-fit">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashboard">Admin Dashboard</Link>
                                <Link to="/create/course">Create New Course</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/course">Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="mt-auto w-full flex flex-col items-center">
                                <button className="btn btn-primary px-4 py-1 font-semibold rounded-md w-full mb-2">
                                    <Link to='/login'>Login</Link>
                                </button>
                                <button className="btn btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to="/signup">SignUp</Link>
                                </button>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="mt-auto w-full flex flex-col items-center">
                                <button className="btn btn-primary px-4 py-1 font-semibold rounded-md w-full mb-2">
                                    <Link to="/user/profile">Profile</Link>
                                </button>
                                <button className="btn btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link onClick={handleLogout} >Logout</Link>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {children}

            <Footer/>
        </div>
    )
}

export default HomeLayout;
