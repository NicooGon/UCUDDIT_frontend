import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () =>{
    
    const {user, isAuthenticated, isLoading} = useAuth0();
    if(isLoading)
    {
        return <div>Loading...</div>
    }

    return(
        isAuthenticated && (
            <button 
                className="col-2 img-fluid rounded-circle border border-white" 
                style={{ backgroundImage: `url(${user.picture})`, height:'5vh', backgroundSize:'cover' , backgroundPosition:'center' }}>
            </button>
        )
    );
}