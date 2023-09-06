import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';
import Cookies from "js-cookie"; // Import Cookies
import axios from 'axios'
import Footer from '@/components/Footer';
import styles from '../styles/myorder.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles1 from '../styles/orderuser.module.css';
import { faPaperPlane, faCancel } from "@fortawesome/free-solid-svg-icons";
import { professions } from "@/professions"
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';



const customerOrder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL
  const imageurl = "http://res.cloudinary.com/dt0dx45wy/"
  const url = urlenv + '/api/customer/myorders/';
  const { response: data1, error: error1, createResource4, deleteResource, updateResource, updaterating, updaterating2 } = useResource(url);
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      body: event.target.message.value,
    };
    createResource4(message, id);
    // alert("hi");
    event.target.reset();
  };
  const router = useRouter();
  const { user, setToken } = useAuth(); const auth = useAuth();
  const handleDeleteOrder = (orderId) => {
    deleteResource(orderId);
  };
  const [showModal, setShowModal] = useState(false);
  const [showModalrate, setShowModalrate] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderIdrating, setSelectedOrderIdrating] = useState(null);

  const handleUpdateClick1 = (orderId) => {
    setSelectedOrderId(orderId); // Store the selected order ID
    setShowModal(true); // Open the modal
  };

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    const initializeAuthStateFromCookies = async () => {
      if (tokenFromCookie) {
        await setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user) {
      initializeAuthStateFromCookies()
    }
    if (user) {
      if (user.is_technician) {
        router.push('./AcceptedOrder'); // Redirect to the technician's home
      }
    }
    else if (!tokenFromCookie && !user) {
      router.push('../');
    }
  }, [user, router]);


  const tecnicianViewHandler = async (event) => {
    event.preventDefault();
    const nametechnitian = event.currentTarget.getAttribute("TechnicianName");
    router.push({
      pathname: "/techprofileview",
      query: { nametechnitian: nametechnitian }
    })
  }

  ///////////////rate////////////////

  const handleRateOrder = (orderId) => {
    updaterating(orderId); // Store the selected order ID
    setSelectedOrderIdrating(orderId)
    setShowModalrate(true); // Open the modal
  };

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');

  const handleInputChangerating = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input field's name
    if (name === 'feedback') {
      setFeedback(value);
    } else if (name === 'rating') {
      setRating(value);
    }
  };

  const handleUpdateClickrating = () => {
    console.log("Feedback:", feedback);
    console.log("id:", selectedOrderIdrating);

    console.log("Rating:", rating);

    // Check if both feedback and rating are non-empty before proceeding
    if (feedback && rating) {
      // Call updaterating2 with feedback and rating values and orderId
      updaterating2(selectedOrderIdrating, feedback, rating);

      // Close the modal if needed
      setShowModalrate(false);
      // alert("hi");
    } else {
      alert("no");
    }
  };


  ///////////////update////////////////

  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setSelectedImage(file);
  };


  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const token = auth.token;
    formData.append("description", event.target.description.value);
    formData.append("location", event.target.location.value);
    formData.append("technician_type", event.target.TechnicianType.value);
    formData.append("image", selectedImage);
    formData.append("address", event.target.address.value);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = urlenv + `/updateorder/${selectedOrderId}/`
    try {
      // console.log(111111111);
      const data = await axios.put(url, formData, config);
      setShowModal(false);
      // console.log(2222222222);
      alert("updated successfully !");
      event.target.reset();
    } catch (error) {
      console.error("Error:", error);

    }


  };



  ///////////////JSX////////////////


  if (user && !user.is_technician) {
    return (
      <div
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-photo/close-up-hands-holding-wooden-item_23-2149214236.jpg")',
          backgroundSize: "cover",

        }}
      >

        <div className={`flex gap-20 ${styles.profileContainer}`} style={{
          padding: '140px', // Add padding to create space around the inner content
          borderRadius: '50%'
        }}>
          <Header />


          {showModal ? (

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
              <div style={{ width: '50%' }}>
                <div className={styles1.background}>
                  <section className={styles1.loginSection}>
                    <div className={styles1['form-box']}>
                      <div className={styles1['form-value']}>
                        <form onSubmit={handleOrderSubmit}>
                          <h2 className={styles1.h2}>User Order Form</h2>
                          <div className={styles1['inputbox']}>
                            <ion-icon name="person-outline"></ion-icon>
                            <input
                              className={`${styles1.input} w-full p-2 border rounded-md`}
                              type="text"

                              name="description"
                              required
                            />
                            <label className={styles1.label}>Description</label>
                          </div>
                          <div className={styles1['inputbox']}>
                            <ion-icon name="mail-outline"></ion-icon>
                            <input
                              className={`${styles1.input} w-full p-2 border rounded-md`}
                              type="text"

                              name="location"
                              required
                            />
                            <label className={styles1.label}>Location</label>
                          </div>

                          <div className={styles1['inputbox']}>
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <select
    className={`${styles.input} w-full p-2 border rounded-md `}
    name="TechnicianType"
    required
    style={{
      background: 'rgba(139, 69, 19, 0.05)',
      color: 'white',
      border: '1px solid white', // Change the border color to white
    }}
  >
    <option value="" disabled selected style={{color:'black'}}>
      Select Technician Type
    </option>
    {professions.map((profession, index) => (
      <option key={index} value={profession} style={{ color: 'black' }}>
        {profession}
      </option>
    ))}
  </select>
                          </div>


                          <div className="mb-4">
  <label
    htmlFor="image"
    className="block mb-2 text-sm font-medium text-white"
  >
    Image
  </label>
  <div className="relative rounded-md shadow-sm">
    <input
      type="file"
      id="image"
      name="image"
      accept="image/*"
     onChange={handleImageChange}
      className="sr-only"
        required
    />
    <label
      htmlFor="image"
      className="flex justify-center px-4 py-2 text-sm font-medium text-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 active:bg-gray-50 active:text-gray-800"
    >
      Select an Image
    </label>
  </div>
</div>


                          
                          <div className={styles1['inputbox']}>
                            <ion-icon name="location-outline"></ion-icon>
                            <input
                              className={`${styles1.input} w-full p-2 border rounded-md`}
                              type="text"

                              name="address"
                              required
                            />
                            <label className={styles1.label}>Address</label>
                          </div>
                         <div style={{display:'flex'}}>
                         <button
                            type="submit"
                            className={`${styles1.button}  p-2 text-gray bg-white rounded-md hover:bg-orange-400 focus:outline-none`}
                          >
                            Update
                          </button>
                          <button
                            className={`${styles1.button}  p-2 text-gray bg-white rounded-md hover:bg-orange-400 focus:outline-none`}

                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                         </div>
                        </form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>


          ) : <>

            <div style={{ width: '50%' }}>
              <h1 style={{ fontSize: '50px', borderBottom: '5px solid white', marginLeft: '60px', color: 'rgba(222,184,135,0.5)' }}>ACCEPTED</h1>

              <div className={`flex flex-wrap justify-center items-center p-10`}>
                {data1.map(order => (
                  order.state_is_ongoing && (
                    <div key={order.id} className={` ${styles.flipcardcontainer}`}>
                      <div className={` ${styles.flipcard}`}>
                        <div className={` ${styles.cardfront}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                          <div  >
                            <img
                              src={imageurl + order.image}
                              alt={order.description}
                              className={`${styles.fixedimagesize}`}

                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{order.description}</h3>
                            <p>Technician Type: {order.technician_type}</p>
                            <p>Address: {order.address}</p>
                            <p>Creation Timestamp: {order.created_at}</p>
                            {order.eta_arrival_time && (
                              <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
                            )}
                          </div>
                        </div>

                        <div className={` ${styles.cardback}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>



                          <div className={`${styles.chatcontainer}`}>


                            <div
                              className={` ${styles.messagebox}`}
                              style={{ height: "260px", width: "300px" }}
                            >
                              {order.comments &&
                                order.comments.map((comment) => (
                                  <div
                                    key={comment.id}
                                    className={`${styles.message}`}
                                  >
                                    {comment.sender === "customer" ? (
                                      <div className="text-left">
                                        <h3>
                                          <h3>
                                            <span
                                              // onClick={tecnicianViewHandler}
                                              // className="cursor-pointer"
                                              style={{ color: 'brown', display: 'block' }}
                                              TechnicianName={user.username}
                                            >
                                              {comment.name}:
                                            </span>
                                            <span
                                              style={{ color: 'white' }}
                                            >
                                              {comment.body}
                                            </span>

                                          </h3>
                                        </h3>
                                      </div>
                                    ) : (
                                      <div className="text-right">
                                        <h3>
                                          <span
                                            onClick={tecnicianViewHandler}
                                            className="cursor-pointer"
                                            style={{ color: 'brown', display: 'block' }}
                                            TechnicianName={order.technician_name.username}
                                          >
                                            {comment.name}:
                                          </span>
                                          <span
                                            style={{ color: 'white' }}
                                          >
                                            {comment.body}
                                          </span>

                                        </h3>
                                      </div>
                                    )}

                                    {/* Render other comment properties as needed */}
                                  </div>
                                ))}
                            </div>

                            <form
                              onSubmit={(event) => handleSubmit(event, order.id)}
                              className="flex items-center"
                            >
                              <input
                                type="text"
                                placeholder="Message..."
                                name="message"
                                required
                                className={`${styles.input} flex-grow `}
                                style={{ height: '40px', color: 'black', borderRadius: '5%', border: '1px solid white', marginTop: '20px' }}
                              />
                              <div className="ml-2">
                                <button type="submit">
                                  <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    className="text-2xl text-white cursor-pointer"
                                    style={{ marginTop: '20px'}}
                                  />
                                </button>











                              </div>
                            </form>



                          </div>



                          <div>

                            <div style={{display:'flex'}}>
                              <button onClick={() => handleDeleteOrder(order.id)} className="px-4 py-2 text-white rounded-full ">
                                <FontAwesomeIcon icon={faTrash} className="" />
                                Delete
                              </button>
                            </div>

                            <div>
                              <button onClick={() => handleRateOrder(order.id)} className="px-4 py-2 text-orange-500 rounded-full ">
                                <FontAwesomeIcon icon={faCheckCircle} className="" />
                                Done
                              </button>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>






            <div style={{ width: '50%' }}>
              <h1 style={{ fontSize: '50px', borderBottom: '5px solid rgba(222,184,135,0.5)', marginLeft: '60px', color: 'white' }}>
                PENDING
              </h1>
              <div className={`flex flex-wrap justify-center items-center`}>
                {data1.map(order => (
                  !order.state_is_ongoing && (
                    <div key={order.id} className={` ${styles.flipcardcontainer}`}>
                      {/* Flip card */}
                      <div className={` ${styles.flipcard}`}>

                        <div className={` ${styles.cardfront}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                          <div>
                            <div  >
                              <img
                                src={imageurl + order.image}
                                alt={order.description}
                                className={`${styles.fixedimagesize}`}

                              />
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold ">{order.description}</h3>
                              <p>Technician Type: {order.technician_type}</p>
                              <p>Address: {order.address}</p>
                              <p>Creation Timestamp: {order.created_at}</p>
                              {order.eta_arrival_time && (
                                <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={` ${styles.cardback}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          {/* Update button */}



                          <div className="flex justify-between mt-4">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="px-4 py-2 text-white rounded-full "  >
                              <FontAwesomeIcon icon={faTrash} className="" size="4x" />

                              Delete
                            </button>

                            <div>
                              <button
                                type="button"
                                className="px-4 py-2 text-white rounded-full"
                                style={{ zIndex: '1' }}
                                onClick={() => handleUpdateClick1(order.id)}
                              >
                                <FontAwesomeIcon icon={faEdit} className="mr-2 text-orange-500" size="4x" />
                                Update
                              </button>
                            </div>




                          </div>

                        </div>
                      </div>

                      {/* Update module */}
                      <div
                        className={`update-module-container`}
                        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2', display: 'none' }}
                      >
                        {/* Add your update module content here */}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </>}
          {showModalrate ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">

              <div className={styles1['form-box']}>
                <div className={styles1['form-value']}>

                  <h2 className={styles1.h2}>Rating & Feedback:</h2>
                  <div className={styles1['inputbox']}>
                    <ion-icon name="person-outline"></ion-icon>
                    <input
                      type="text"
                      name="feedback"
                      onChange={handleInputChangerating}
                      className={`${styles1.input} w-full p-2 border rounded-md`}
                    />
                    <label className={styles1.label}>
                      Feedback:
                    </label>
                  </div>
                  <div className={styles1['inputbox']}>
                    <ion-icon name="mail-outline"></ion-icon>
                    <input
                      type="number"
                      name="rating"
                      onChange={handleInputChangerating}
                      className={`${styles1.input} w-full p-2 border rounded-md`}
                    />
                    <label className={styles1.label}>
                      Rating:
                    </label>

                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className={`${styles1.button} w-full p-2 text-gray bg-green-500 rounded-md hover:bg-gray-600 focus:outline-none`}
                      onClick={() => handleUpdateClickrating()}
                    >
                      send
                    </button>
                    <button
                      className={`${styles1.button} w-full p-2 text-gray bg-green-500 rounded-md hover:bg-gray-600 focus:outline-none`}
                      onClick={() => setShowModalrate(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}








        </div>
        <Footer style={{ flexShrink: 0 }} />
      </div>
    )
  };
}
export default customerOrder;