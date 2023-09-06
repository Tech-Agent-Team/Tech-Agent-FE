import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "@/context/auth";
import useResource from "@/Hooks/useResource";
import { useRouter } from "next/router";
import styles from '../styles/accept.module.css';
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane, faCancel } from "@fortawesome/free-solid-svg-icons";
;


import Cookies from "js-cookie"; // Import Cookies
const acceptedorder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const router = useRouter(); // Initialize the router object
  const { user, setToken } = useAuth();
  const imageurl = "http://res.cloudinary.com/dt0dx45wy/"
  const url = urlenv + "/api/technician/techacceptedlist/";
  const { response: data1, error: error1, createResource4,cancelResource } = useResource(url);
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      body: event.target.message.value,
    };
    createResource4(message, id);
    alert("hi");
    event.target.reset();
  };
  const customerviewhandelr = async (event) => {
    event.preventDefault();
    const namecustomer = event.currentTarget.getAttribute("data-namecustomer");
    router.push({
      pathname: "/userprofileview",
      query: { namecustomer: namecustomer },
    });
  };
  const handleCancel = async (id) => {
    console.log(id)
    try {
     cancelResource(id);
      alert("Order Cancelled");
    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order");
    }
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
      if (user && !(user.is_technician)) {
        router.push("./CustomerOrder");
      }
    } else if (!tokenFromCookie && !user) {
      router.push("../");
    }
  }, [user, router]);
  if (user && user.is_technician) {
    return (
<div
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-photo/close-up-hands-holding-wooden-item_23-2149214236.jpg")',
            backgroundSize: "cover",

          }}
        >

      
        <div className={`flex gap-20  ${styles.profileContainer}`} style={{
          paddingTop:'70px', // Add padding to create space around the inner content
          // borderRadius:'50%'
        }}>
          <Header />
          <div className={`flex flex-wrap justify-center items-center`}>
            {data1.map((order) => (
              <div key={order.id} className={` ${styles.flipcardcontainer}`}>
                <div className={` ${styles.flipcard} `}>
                  <div className={` ${styles.cardfront}`} style={{display:'block', flexDirection:'column',alignItems:'flex-start',}}>
                   <div  >
                    <img
                      src={imageurl + order.image}
                      alt={order.description}
                      className={`${styles.fixedimagesize}`}
                      
                    />
                    </div>
                    <div style={{padding:'10px'}}>
                    <h3 className="text-lg font-bold text-white ">{order.description} </h3>
                   
              <p className="text-lg text-white font-smibold-white " >Technician Type: {order.technician_type}</p>
                  {order.eta_arrival_time && (
                    <p className="text-lg text-white font-smibold-white " >Estimated Arrival Time:  {order.eta_arrival_time}</p>
                  )}
                  </div>
                  </div>
                  
                  <div className={` ${styles.cardback}`} style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                   
                   <div>
                <button onClick={() => handleCancel(order.id)} className="px-4 py-2 text-white bg-red-500 rounded-md"><FontAwesomeIcon icon={faCancel} className="text-2xl cursor-pointer hover:text-yellow-600" /></button>
              </div>
              
                   <div>
                    <p style={{padding:''}}>Go to customer profile : {""}</p>
                    <span
                      onClick={customerviewhandelr}
                      data-namecustomer={order.customer_name.username}
                      className="text-blue-500 underline cursor-pointer"
                    >
                      {order.customer_name.username}
                    </span>

                    <div className={` ${styles.messagebox}`}style={{ height: "150px", overflowY: "scroll" ,backgroundColor:'whitesmoke',borderRadius:'5px'}}>
                      {order.comments &&
                        order.comments.map((comment) => (
                          <div key={comment.id} >
                            <h3 className="p-2 text-lg">{`${comment.sender}: ${comment.body}`}</h3>
                            {/* Render other comment properties as needed */}
                          </div>
                        ))}
                    </div>

                    
                    <form onSubmit={(event) => handleSubmit(event, order.id)}>
                      <input
                        type="text"
                        placeholder="Add your message"
                        className="w-full p-2 mt-2 border rounded-md"
                        name="message"
                        required
                      />
                      <button
                        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
                        type="submit"
                        
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl cursor-pointer hover:text-yellow-600" />
                      </button>
                     
                    </form>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
        </div>
      );
      

  }
};

export default acceptedorder;