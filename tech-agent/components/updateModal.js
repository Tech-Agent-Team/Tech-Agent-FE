import { useState } from 'react';


const UpdateModal = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <div>
                <button type="button"
                    className="bg-blue-600 text-white active:bg-black hover:bg-black flex justify-center items-center gap-2 font-bold px-6 h-12 rounded-md shadow hover:shadow-lg outline-none focus:outline-none"
                    onClick={() => setShowModal(true)} >
                    open Modal
                </button>
            </div>
            {showModal ? (
                <div className='mt-10 flex justify-center items-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2'>
                    <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center"> hello </h2>
                    <button className='my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover-shadow-lg font-semibold' onClick={()=>setShowModal}> Close </button>
                </div>
            ) : null}
        </div>
            );
}
export default UpdateModal;