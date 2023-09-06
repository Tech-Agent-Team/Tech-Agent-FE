import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "@/context/auth";
import useResource from "@/Hooks/useResource";
import { useRouter } from "next/router";
import styles from "../styles/accept.module.css";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane, faCancel } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie"; // Import Cookies
const acceptedorder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const router = useRouter(); // Initialize the router object
  const { user, setToken } = useAuth();
  const imageurl = "http://res.cloudinary.com/dt0dx45wy/";
  const url = urlenv + "/api/technician/techacceptedlist/";
  const {
    response: data1,
    error: error1,
    createResource4,
    cancelResource,
  } = useResource(url);
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      body: event.target.message.value,
    };
    createResource4(message, id);
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
    console.log(id);
    try {
      cancelResource(id);
     
    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error("Error cancelling order:", error);
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
      initializeAuthStateFromCookies();
    }
    if (user) {
      if (user && !user.is_technician) {
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
            'url("https://img.freepik.com/premium-photo/carpenter-working-with-equipment-wooden-table-carpentry-shop-woman-works-carpentry-shop_1418-2507.jpg?w=1060")',
          backgroundSize: "cover",
        }}
      >
        <div
          className={`flex gap-20  ${styles.profileContainer}`}
          style={{
            paddingTop: "70px", // Add padding to create space around the inner content
            // borderRadius:'50%'
          }}
        >
          <Header />
          <div className={`flex flex-wrap justify-center items-center`}>
            {data1.map((order) => (
              <div key={order.id} className={` ${styles.flipcardcontainer}`}>
                <div className={` ${styles.flipcard} `}>
                  <div
                    className={` ${styles.cardfront}`}
                    style={{
                      display: "block",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <img
                        src={imageurl + order.image}
                        alt={order.description}
                        className={`${styles.fixedimagesize}`}
                      />
                    </div>
                    <div style={{ padding: "10px" }}>
                      <h3 className="text-lg font-bold text-white ">
                        {order.description}{" "}
                      </h3>

                      <p className="text-lg text-white font-smibold-white ">
                        Technician Type: {order.technician_type}
                      </p>
                      {order.eta_arrival_time && (
                        <p className="text-lg text-white font-smibold-white ">
                          Estimated Arrival Time: {order.eta_arrival_time}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={` ${styles.cardback}`}>


                    <div>
                    

                      <div className={`${styles.chatcontainer}`}>
                        <div
                          className={` ${styles.messagebox}`}
                          style={{ height: "360px", width: "300px" }}
                        >
                          {order.comments &&
                            order.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className={`${styles.message}`}
                              >
                                {comment.sender === "customer" ? (
                                  <div className="text-left " >
                                    <h3>
                                          <span
                                            onClick={customerviewhandelr}
                                            className="cursor-pointer"
                                            style={{ color: 'brown' ,display:'block'}}
                                          >
                                            {comment.name}:
                                          </span>
                                          <span
                                            style={{ color: 'white', }}
                                            
                                          >
                                            {comment.body}
                                          </span>

                                        </h3>
                                  </div>
                                ) : (
                                  <div className="text-right">
                                   <h3>

                                   <span
                                           onClick={customerviewhandelr}
                                           className="cursor-pointer"
                                           style={{ color: 'brown' ,display:'block'}}
                                            
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
                            placeholder="start to chat ..."
                            name="message"
                            required
                            className={`${styles.input} flex-grow`}
                          />
                          <div className="ml-2">
                            <button type="submit">
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="text-2xl text-white cursor-pointer hover:text-yellow-600"
                              />
                            </button>
                            <button
                              onClick={() => handleCancel(order.id)}
                              className="ml-2"
                            >
                              <FontAwesomeIcon
                                icon={faCancel}
                                className="text-2xl text-white cursor-pointer hover:text-yellow-600"
                              />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer style={{ flexShrink: 0 }} />
      </div>
    );
  }
};

export default acceptedorder;