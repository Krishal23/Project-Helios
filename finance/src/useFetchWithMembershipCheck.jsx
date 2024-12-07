import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute3({element}) {
    const [isMember, setIsMember] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const checkMembership = async () => {
            try {
                const response = await fetch('http://localhost:5000/me', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // Send cookies with the request
                });

                if (response.ok) {
                    const data = await response.json();
                    const check = data.user?.isMember;
                    setIsMember(check); // Update state to reflect membership status
                   
                    console.log(isMember,"asfeav", check,"adfa")
                    // Instead of relying on `isMember`, use `check` to navigate
                    if (!check) {
                        console.log(1)
                        navigate('/membership');
                        alert("You have still not purchased Membership..")
                    }
                } else {
                    
                    console.log(2)
                    navigate('/membership'); // Redirect if user is not a member
                    alert("You have still not purchased Membership.. or some error occured")
                }
            } catch (error) {
                console.log(3)
                console.error('Error checking membership:', error);
                navigate('/membership'); // Redirect in case of error
                alert("You have still not purchased Membership.. or some error occured")
            }
        };

        checkMembership();
    }, [navigate]);

    

    // return isMember;
    return element;
}

export default ProtectedRoute3;
