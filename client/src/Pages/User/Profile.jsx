import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile(){

    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.auth?.data);


    

    return(
        <>

        </>
    )
}

export default Profile;

