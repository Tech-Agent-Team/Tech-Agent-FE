import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/auth';
import Footer from './Footer';
import styles from '../styles/orderuser.module.css';
import { professions } from "@/professions"

const UserOrderForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const auth = useAuth();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const token = auth.token;
    formData.append('description', event.target.description.value);
    formData.append('location', event.target.location.value);
    formData.append('technician_type', event.target.TechnicianType.value);
    formData.append('image', selectedImage);
    formData.append('address', event.target.address.value);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = urlenv + '/createorder/';
    const data = await axios.post(url, formData, config);
    
    event.target.reset();
  };

  return (
    <div className={styles.background}>
      <section className={styles.loginSection}>
        <div className={styles['form-box']}>
          <div className={styles['form-value']}>
            <form onSubmit={handleOrderSubmit}>
              <h2 className={styles.h2}>User Order Form</h2>
              <div className={styles['inputbox']}>
                <ion-icon name="person-outline"></ion-icon>
                <input
                  className={`${styles.input} w-full p-2 border rounded-md`}
                  type="text"
             
                  name="description"
                  required
                />
                <label className={styles.label}>Description</label>
              </div>
              <div className={styles['inputbox']}>
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  className={`${styles.input} w-full p-2 border rounded-md`}
                  type="text"
                 
                  name="location"
                  required
                />
                <label className={styles.label}>Location</label>
              </div>

              <div className={styles['inputbox']}>
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



              <div className={styles['inputbox']}>
                <ion-icon name="location-outline"></ion-icon>
                <input
                  className={`${styles.input} w-full p-2 border rounded-md`}
                  type="text"
                  
                  name="address"
                  required
                />
                <label className={styles.label}>Address</label>
              </div>
              <button
                type="submit"
                className={`${styles.button} w-full p-2 text-gray bg-green-500 rounded-md hover:bg-orange-400 focus:outline-none`}
              >
                Create Order
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserOrderForm;
