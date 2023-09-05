import React, { useEffect } from "react";
import Slider from "react-slick";
import Header from "../components/Header";
import useResource from "@/Hooks/useResource";
import { useRouter } from "next/router"; // Import the useRouter hook
import { useAuth } from "@/context/auth";
import Cookies from "js-cookie"; // Import Cookies
import Footer from "@/components/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const TechHome = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const { user, setToken } = useAuth();
  const imageurl = "http://res.cloudinary.com/dt0dx45wy/";

  const router = useRouter();
  const url = urlenv + "/api/technician/hometechnician/";
  const { response: data1, error: error1, createResource3 } = useResource(url);

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const arrivalTime = {
      eta_arrival_time: event.target.eta_arrival_time.value,
    };
    createResource3(arrivalTime, id);
    alert("hi");
  };

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    const initializeAuthStateFromCookies = async () => {
      const tokenFromCookie = Cookies.get("token");
      if (tokenFromCookie) {
        setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user) {
      initializeAuthStateFromCookies();
    }
    if (user) {
      if (!user.is_technician) {
        router.push("./userHome"); // Redirect to the technician's home
      }
    } else if (!tokenFromCookie && !user) {
      router.push("../");
    }
  }, [user, router]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1, // Show only one card at a time
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    variableWidth: true,
    swipeToSlide: true, // Enable swipe to slide
  };

  if (user) {
    if (user.is_technician) {
      return (
        <div
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-photo/close-up-hands-holding-wooden-item_23-2149214236.jpg")',
            backgroundSize: "cover",
            // backgroundColor:'black',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "auto",
            overflow: "hidden", // Hide overflowing content
            position: "relative", // Add position relative to handle z-index
          }}
        >
          <Header />
          <div
            className="carousel-container"
            style={{
              position: "relative",
              padding: "100px",
              zIndex: 1, // Set a higher z-index to bring the carousel to the front
              margin: "40px",
            }}
          >
            <Slider {...sliderSettings}>
              {data1.map((order) => (
                <div
                  key={order.id}
                  // className="relative items-center justify-center overflow-hidden transition-shadow cursor-pointer group hover:shadow-xl hover:shadow-black/30 "
                  style={{
                    display: "flex",
                    alignItems: "center", // Vertically center the card content

                  }}
                >

                  <div
                    className="bg-transparent cursor-pointer card group perspective "
                    style={{
                      width: "500px",
                      backgroundColor: "rgba(111, 78, 55, 0.7)",
                      height: "550px",
                      borderRadius: "4%",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      padding: "40px", // Horizontally center the card content
                      margin: "20px",
                      backgroundRepeat: "no-repeat",
                      position: 'relative'

                    }}
                  >


                    <div
                      className="card-content"
                      style={{ flex: 1, paddingTop: 15 }}
                    >
                      <h2 className="text-lg font-semibold">
                        {order.description}
                      </h2>
                      <p className="mb-2">
                        Technician Type: {order.technician_type}
                      </p>
                      {order.eta_arrival_time && (
                        <p className="mb-2 text-gray-600">
                          <span className="font-semibold">ETA Arrival Time:</span> {order.eta_arrival_time}
                        </p>
                      )}

                      <form onSubmit={(event) => handleSubmit(event, order.id)}>
                        <input
                          type="datetime-local"
                          id="eta_arrival_time"
                          name="eta_arrival_time"
                          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                          required
                        />
                        {/* <div
      className="absolute inset-0 h-100 w-200 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/50 group-hover:via-black/60 group-hover:to-black/70"
      // style={{ borderRadius: "4%",  width: "70%", height: "100%" ,position: 'absolute',}}
    ></div> */}
                        <button
                          className="px-3 py-3 font-semibold text-white duration-1000 delay-200 scale-0 -translate-x-1/2 -translate-y-1/2 group-hover:bottom-60 group-hover:scale-125"
                          type="submit"
                          style={{ backgroundColor: "#6F4E37" }}
                        >
                          Accept
                        </button>
                      </form>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",

                        alignItems: "flex-end",
                      }}
                    >
                      <img
                        src={imageurl + order.image}
                        alt={order.description}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "400px",
                          height: "300px",
                          // objectFit: 'contain', // To maintain aspect ratio and fit inside the container
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <Footer />
        </div>
      );
    }
  }
};

export default TechHome;