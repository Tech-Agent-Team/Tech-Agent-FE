export default function useResource() {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL; 
  
    function config1() {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
   
    function config2() {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }
    async function createResource1(newTechnician) {
        const urlpost = 'http://localhost:8000/api/technician/signup/';
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

      async function createResource2(newTechnician) {
        const urlpost = 'http://localhost:8000/api/customer/signup/';
        try {
          const options = config2();
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
    return {
      createResource1,
      createResource2,

    };
  }
  