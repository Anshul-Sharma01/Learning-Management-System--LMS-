import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setsignupData] = useState({
        fullName : "",
        email : "",
        password : "",
        avatar : ""
    })

    function handleUserInput(e){
        const { name, value } = e.target;
        setsignupData({...signupData, [name]:  value});
    }

    function getImage(event){
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            setsignupData({
                ...signupData, avatar : uploadedImage
            });
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener('load',function(){
            setPreviewImg(this.result);
        })
    }

    function createNewAccount(e){
        e.preventDefault();
        if(!signupData.email || !signupData.fullName || !signupData.password || !signupData.avatar){
            toast.error('Please fill all the details');
            return;
        }

        if(signupData.fullName.length < 5){
            toast.error('Name should be atleast of 5 characters');
            return;
        }

        if(!signupData.emailmatch(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid email id");
            return;
        }

        if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
            toast.error("Password should be 6-18 characters long with atleast a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append('fullName', signupData.fullName);
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);
        formData.append('avatar', signupData.avatar);




    }

    const [previewImg, setPreviewImg] = useState("");


    return(
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} action="" className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="img_upload" className="cursor-pointer" >
                        {previewImg ? ( <img className="w-24 h-24 rounded-full m-auto" src={previewImg}/>) : (<BsPersonCircle  className="w-24 h-24 rounded-full m-auto"/>)}
                    </label>
                    <input type="file" onChange={getImage} className="hidden" id="img_upload" accept=".jpg, .jpeg, .png, .svg"  name="avatar"/>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold">Name : </label>
                        <input type="text" required name="fullName" id="fullname" placeholder="enter your email.." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signupData.fullName}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email : </label>
                        <input type="email" required name="email" id="email" placeholder="enter your email.." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signupData.email}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password : </label>
                        <input type="password" required name="password" id="password" placeholder="enter your password.." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signupData.password}/>
                    </div>
                    <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2">
                        Create Account
                    </button>
                    <p className="text-center">Already have an account ? <Link to="/login" className="link text-accent cursor-pointer">Login</Link></p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;


