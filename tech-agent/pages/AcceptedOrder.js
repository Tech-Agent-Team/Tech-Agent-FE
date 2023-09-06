import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "@/context/auth";
import useResource from "@/Hooks/useResource";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // Import Cookies
import Footer from "@/components/Footer";

const acceptedorder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const router = useRouter(); // Initialize the router object
  const { user, setToken } = useAuth();
  const imageurl = "http://res.cloudinary.com/dt0dx45wy/";
  const url = urlenv + "/api/technician/techacceptedlist/";

  const { response: data1, error: error1, createResource4, cancelResource } = useResource(url);

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      body: event.target.message.value,
    };
    createResource4(message, id);
    alert("hi");
    event.target.reset();
  };

  const handleCancel = async (id) => {
    console.log(id)
    try {
     await cancelResource(id);
      alert("Order Cancelled");
    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order");
    }
  };


  const customerviewhandelr = async (event) => {
    event.preventDefault();
    const namecustomer = event.currentTarget.getAttribute("data-namecustomer");
    router.push({
      pathname: "/userprofileview",
      query: { namecustomer: namecustomer },
    });
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
    return (<>
      <div style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/brown-fabric-motion-background_53876-98184.jpg?w=996&t=st=1693907261~exp=1693907861~hmac=51aa37dc3dc325e4bcb071537760a0101e99569b58ff86f8aead7d78810c8123")',
        backgroundSize: "cover",
        // backgroundColor:'black',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        overflow: "hidden", // Hide overflowing content
        position: "relative", // Add position relative to handle z-index
      }}>
        <Header />
        <div className="flex flex-wrap p-20 ">
          {data1.map((order) => (
            <div key={order.id} className="w-1/4 m-2 border rounded-lg shadow-lg ">
              <img
                src={imageurl + order.image}
                alt={order.description}
                className="object-cover w-full h-64 mb-2 rounded-t-lg"
              />
              <h3 className="text-lg font-semibold">{order.description}</h3>
              <p>Go to customer profile: {""}</p>
              <span
                onClick={customerviewhandelr}
                data-namecustomer={order.customer_name.username}
                className="text-blue-500 cursor-pointer"
              >
                {order.customer_name.username}
              </span>
              {/* Render comments */}
              <div>
                {order.comments &&
                  order.comments.map((comment) => (
                    <div key={comment.id}>
                      <h3 className="text-lg font-semibold">{`${comment.sender}: ${comment.body}`}</h3>
                      {/* Render other comment properties as needed */}
                    </div>
                  ))}
              </div>

              <p>Technician Type: {order.technician_type}</p>
              {order.eta_arrival_time && (
                <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
              )}

              <form onSubmit={(event) => handleSubmit(event, order.id)}>
                <input
                  type="text"
                  placeholder="Add your message"
                  className="w-full p-2 mt-2 border rounded-md"
                  name="message"
                />
                <button
                  className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Send
                </button>
              </form>
              <div>
                <button onClick={() => handleCancel(order.id)} className="px-4 py-2 text-white bg-red-500 rounded-md">cancel Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div><Footer /></div>
    </>
    );
  }
};

export default acceptedorder;