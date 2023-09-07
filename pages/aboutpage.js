import { useRouter } from 'next/router'; // Import the useRouter hook
import { useAuth } from '@/context/auth';
import Cookies from "js-cookie"; // Import Cookies
import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header from '@/components/aboutheader';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const teamMembers = [
  {
    name: 'Ibrahem ',
    major: 'Full stack developer',
    image: '/images/ibrahem.jpg',
    githubUrl: 'https://github.com/ibrahimfqaisi',
    linkedinUrl: 'https://www.linkedin.com/in/ibrahim-alqasrawi/',
  },
  {
    name: 'Sakher',
    major: 'Full stack developer',
    image: '/images/sakher.jpg',
    githubUrl: 'https://github.com/Sakherr',
    linkedinUrl: 'https://www.linkedin.com/in/sakher-sshteat-a9283b187/',
  },
  {
    name: 'Malik',
    major: 'Full stack developer',
    image: '/images/malik.jpg',
    githubUrl: 'https://github.com/Malik-Essa99',
    linkedinUrl: 'https://www.linkedin.com/in/malik-al-hudrub-4a1a07224',
  },
  {
    name: 'Bayan',
    major: 'Full stack developer',
    image: '/images/bayan.jpg',
    githubUrl: 'https://github.com/BayanBanat',
    linkedinUrl: 'https://www.linkedin.com/in/bayan-banat/',
  },
  {
    name: 'sajeda',
    major: 'Full stack developer',
    image: '/images/saj.jpg',
    githubUrl: 'https://github.com/sajedaalrababah',
    linkedinUrl: 'https://www.linkedin.com/in/sajeda-rababah-364309209/',
  },
  {
    name: 'Walaa',
    major: 'Full stack developer',
    image: '/images/wallaw.jpg',
    githubUrl: 'https://github.com/WalaaAlrefai',
    linkedinUrl: 'https://www.linkedin.com/in/wala-a-alrefai-/',
  },
];
const AboutPage = () => {
  const router = useRouter();
  const { user, setToken } = useAuth();
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    const initializeAuthStateFromCookies = async () => {
      const tokenFromCookie = Cookies.get("token");
      if (tokenFromCookie) {
        setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user) {
      initializeAuthStateFromCookies()
    }
  }, [user, router]);
  return (
    <div
      style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/close-up-light-wooden-floorboard-textured-background_53876-84943.jpg?w=996")',
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
      <div style={{ margin: '200px' }}>
        <div id='about' className="flex items-center justify-center ">
          <div className="grid grid-cols-1 gap-40 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative items-center justify-center overflow-hidden transition-shadow rounded-lg shadow-lg cursor-pointer group hover:shadow-xl hover:shadow-black/30" >
                <div className="h-96 w-72">
                  <img className="object-cover w-full h-full transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={member.image} alt={member.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[50%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h1 className="text-3xl font-bold text-white font-dmserif">{member.name}</h1>
                  <p className="mb-3 text-lg italic text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">{member.major}</p>
                  <div>
                    <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                      <FontAwesomeIcon icon={faGithub} className="text-2xl text-white hover:text-gray-400" />
                    </a>
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-white hover:text-gray-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer style={{ flexShrink: 0 }} />
    </div>
  );
};
export default AboutPage;