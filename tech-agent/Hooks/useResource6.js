import { useAuth } from "@/context/auth"
import useSWR from 'swr'

export default function useResource() {
    const url = process.env.NEXT_PUBLIC_URL
    const { token} = useAuth()
    const {data,error,mutate} = useSWR([url,token],fetchResource)


    function config() {
        return {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.access
            },


        }
    }


    
    async function fetchResource() {
        const urlget = url+`/api/technician/profile/${user.username}/`
        if (!token) {
            return
        }
        try {
            const response = await fetch(urlget, config())
            const jsonResponse  = await response.json()
            return jsonResponse


        } catch (error) {
            console.log("hi")
        }

    }

    

    return {
        response: s || [], 
      
    };
}
