import { useRouteError } from "react-router-dom";
import axiosInstance from "../Helpers/axiosInstance";
import { isEmail, isPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";


function Contact(){

    const [ userInput, setUserInput ] = useState({
        name : "",
        email : "",
        message : ""
    })

    function handleInputChange(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name] : value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All fields are mandatory");
            return;
        }

        if(!isEmail(userInput.email)){
            toast.error("Email is not valid");
            return;
        }

        try{
            const res = axiosInstance.post("/contact", userInput);
            toast.promsie(res, {
                loading : 'Submitting your message..',
                success : 'Form submitted successfuly',
                error : 'Failed to submit the form'
            })
            const contactResponse = await Response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name : "",
                    email : "",
                    message : ""
                })
            }
        }catch(err){
            toast.error("Error in submitting the form");
            return;
        }


    }


    return(
        <HomeLayout>
            <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                <h1 className="text-3xl font-semibold ">Contact Form</h1>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="flex flex-col w-full gap-1">Name</label>
                    <input value={userInput.name} onChange={handleInputChange} type="text" className="bg-transparent border px-2 py-1 rounded-sm" id="name" name="name" placeholder="Enter your name"/>
                </div>
                <div onChange={handleInputChange} className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="flex flex-col w-full gap-1">Email</label>
                    <input value={userInput.email} type="email" className="bg-transparent border px-2 py-1 rounded-sm" id="email" name="email" placeholder="Enter your email"/>
                </div>
                <div onChange={handleInputChange} className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="flex flex-col w-full gap-1">Message</label>
                    <textarea value={userInput.message} type="email" className="bg-transparent border px-2 py-1 rounded-sm resize-none h-48" id="message" name="message" placeholder="Enter your email"/>
                </div>
                <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-700 transition-all ease-in-out duration-300">
                    Submit
                </button>
            </form>
        </HomeLayout>
    )
}

export default Contact;