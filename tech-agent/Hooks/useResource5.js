import { useAuth } from "@/context/auth"
import useSWR from 'swr'

export default function useResource() {
    const url = process.env.NEXT_PUBLIC_URL
    const { token} = useAuth()
    const {data,error,isLoading} = useSWR([url,token],fetchResource)


    function config() {
        return {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.access
            },


        }
    }


    
    async function fetchResource() {
        const urlget = url + `/api/customer/profile/${user.username}/`;
        if (!token) {
            return;
        }
        try {
            const response = await fetch(urlget, config());
            console.log('Response from fetchResource:', response);
            const jsonResponse = await response.json();
            console.log('JSON response:', jsonResponse);
            return jsonResponse;
        } catch (error) {
            console.error('Error fetching resource:', error);
            throw error;
        }
    }
    

    
    

    return {
        response: data || [], 
        isLoading: !data && !error,
      
    };
}
