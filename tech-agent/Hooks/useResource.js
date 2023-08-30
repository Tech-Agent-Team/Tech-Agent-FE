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
    function config1() {
        return {
            headers: {
                "Content-Type": "application/json",
                
            },


        }
    }
    

    async function fetchResource() {
        const urlget = url+"/api/technician/hometechnician/"
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

    
    async function fetchResourcecustomer() {
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



    async function createResource1(newTechnician) {
        const urlpost = 'http://localhost:8000/api/technician/signup/';
        try {
          const options = config1();
          options.method = 'POST';
          options.body = JSON.stringify(newTechnician);
          const response = await fetch(urlpost, options);
          console.log(response.status)
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      

        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

      async function createResource2(newTechnician) {
        const urlpost = 'http://localhost:8000/api/customer/signup/';
        try {
          const options = config1();
          options.method = 'POST';
          options.body = JSON.stringify(newTechnician);
          const response = await fetch(urlpost, options);
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      
          // You can handle success here if needed
        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

      async function createResource3(arrivalTime,order_id) {
        const urlpost = `http://127.0.0.1:8000/acceptorder/${order_id}/`;
        try {
          const options = config();
          options.method = 'POST';
          options.body = JSON.stringify(arrivalTime);
          const response = await fetch(urlpost, options);
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      
          // You can handle success here if needed
        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

 

    async function errorHandler(err) {
        console.error(err)
        if (err) {
          console.log(err)
          }
          logout()
        }

    return {
        response : data || [],
        deleteResource,
        createResource1,
        createResource2,
        createResource3

    }
}