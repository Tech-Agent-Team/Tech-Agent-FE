import Header from '@/components/HeaderTec';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
const techprofile = () => {
    const { user} = useAuth()
  const urlenv = process.env.NEXT_PUBLIC_URL

    const url = urlenv+`/api/customer/profile/${user.username}/`;
    const { response: data1, error: error1 } = useResource(url);



    return (
        <div>
            <Header />

        <div>


            {data1 && (
                <h1>{data1.profession}</h1>
            )}
        </div>

        </div>
    );
};

export default techprofile;