import Header from '@/components/HeaderTec';
import useResource from '@/Hooks/useResource6';

const techprofile = () => {
    const { response } = useResource();
console.log(11111666666661111,response)


    return (
        <div>
            <Header />

        <div>


            {response && (
                <h1>{response.profession}</h1>
            )}
        </div>

        </div>
    );
};

export default techprofile;