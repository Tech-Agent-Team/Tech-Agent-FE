import React from "react";
import Link from "next/link";
import useResource from "@/Hooks/useResource";
import { useRouter } from "next/router";
import styles from "../styles/techregestier.module.css"; // Make sure the CSS module filename matches
import { useState } from "react";
import { professions } from "@/professions"

export default function TechRegForm() {
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [isProfessionsDropdownOpen, setIsProfessionsDropdownOpen] =
    useState(false);
  const urlenv = process.env.NEXT_PUBLIC_URL;

  // const professions = [
  //   "Electrician",
  //   "Mechanical",
  //   "Plumber",
  //   "Painter",
  //   "Construction Workers",
  //   "Blacksmiths",
  //   // Add other professions here
  // ];
  const urlpost = urlenv + "/api/technician/signup/";
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleProfession = (profession) => {
    if (selectedProfessions.includes(profession)) {
      setSelectedProfessions(
        selectedProfessions.filter((p) => p !== profession)
      );
    } else {
      setSelectedProfessions([...selectedProfessions, profession]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);
    formData.append("password2", e.target.password2.value);
    formData.append("email", e.target.email.value);
    formData.append("description", e.target.description.value);
    formData.append("image", selectedImage);
    formData.append("professions", selectedProfessions);

    try {
      const response = await fetch(urlpost, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Account Information Updated Successfully!");
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={styles.background}>
      <section className={styles.loginSection}>
        <div className={styles["form-box"]}>
          <div className={styles["form-value"]}>
            <form onSubmit={handleSubmit}>
              <h2 className={styles.h2}>Register as Technician</h2>
              <div className={styles["inputbox"]}>
                <ion-icon name="person-outline"></ion-icon>
                <input
                  type="text"
                  name="username"
                  required
                  className={styles.input}
                />
                <label className={styles.label}>Username</label>
              </div>
              <div className={styles["inputbox"]}>
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="email"
                  name="email"
                  required
                  className={styles.input}
                />
                <label className={styles.label}>Email</label>
              </div>
              <div className={styles["inputbox"]}>
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  name="password"
                  required
                  className={styles.input}
                />
                <label className={styles.label}>Password</label>
              </div>
              <div className={styles["inputbox"]}>
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  name="password2"
                  required
                  className={styles.input}
                />
                <label className={styles.label}>Confirm Password</label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Profile Picture
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="image"
                    className="flex justify-center px-4 py-2 text-sm font-medium text-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 active:bg-gray-50 active:text-gray-800"
                  >
                    Select an Image
                  </label>
                </div>
              </div>
              <div className="mb-4">
  <label className="block text-sm font-medium text-white">Profession</label>
  <div className="relative rounded-md shadow-sm">
    <div
      onClick={() => setIsProfessionsDropdownOpen(!isProfessionsDropdownOpen)}
      className="flex items-center justify-between w-full p-2 border rounded-lg cursor-pointer"
    >
      <span className="text-white">Select Professions</span>
      <button
        type="button"
        className="w-6 h-6 text-white cursor-pointer hover:text-gray-700"
      >
        {isProfessionsDropdownOpen ? "-" : "+"}
      </button>
    </div>
    {isProfessionsDropdownOpen && (
      <div className="absolute z-10 w-full py-2 mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60">
        {professions.map((profession) => (
          <label
            key={profession}
            className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
          >
            <input
              type="checkbox"
              name="professions"
              value={profession}
              checked={selectedProfessions.includes(profession)}
              onChange={() => toggleProfession(profession)}
              className="mr-2"
            />
            {profession}
          </label>
        ))}
      </div>
    )}
  </div>
</div>

              <div className={styles["inputbox"]}>
                <ion-icon name="clipboard-outline"></ion-icon>
                <input
                  type="text"
                  name="description"
                  required
                  className={styles.input}
                />

                <label className={styles.label}>Description</label>
              </div>
              <button className={styles.button} type="submit">
                Register
              </button>
              <div className={styles["register"]}>
                <p>Already have an account?<Link href="/LoginPage" legacyBehavior>
                  <a className={`${styles.loginLink} hover:bg-orange-400`}>Log in</a>
                </Link></p>
                
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}