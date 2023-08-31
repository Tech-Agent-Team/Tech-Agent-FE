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


    async function deleteResource(id) {
        const urldelete = url + "/api/customer/deletorders/";
        const deleteUrl = urldelete + id;
        if (!token) {
          return;
        }
        try {
          const options = config();
          options.method = "DELETE";
          await fetch(deleteUrl, options);
          mutate();
        } catch (error) {
          console.error("Error deleting order:", error);
          throw error; // Propagate the error for further handling
        }
      }

      async function updateResource(id, updatedData) {
        const urlUpdate = url + "/updateorder/";
        const updateUrl = urlUpdate + id;
        try {
          const response = await axios.post(updateUrl, updatedData, config);
          return response.data; // Optionally return the updated data or response
        } catch (error) {
          console.error("Error updating order:", error);
          throw error;
        }
      }

      
    

    async function fetchResource() {
        const urlget = url+"/api/customer/myorders/"
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
        response : data || [],
        deleteResource,
        updateResource


    }
}