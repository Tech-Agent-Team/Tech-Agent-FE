import { useAuth } from "@/context/auth";
import { useState } from "react";
import styles from "../styles/techupdate.module.css";
const baseUrl = process.env.NEXT_PUBLIC_URL;
import Link from "next/link";
import { professions } from "@/professions"
import { useRouter } from "next/router";

export default function UpdateTechnicianProfileForm() {
  const { user, token } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfessionsDropdownOpen, setIsProfessionsDropdownOpen] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };



  const toggleProfession = (profession) => {
    if (selectedProfessions.includes(profession)) {
      setSelectedProfessions(
        selectedProfessions.filter((p) => p !== profession)
      );
    } else {
      setSelectedProfessions([...selectedProfessions, profession]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: selectedImage, // Assuming selectedImage contains the image data
      professions: selectedProfessions,
    };

    console.log(updatedFormData);

    try {
      const response = await fetch(
        `${baseUrl}/api/technician/profileupdate/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        router.push("./techprofile")
      } else {
        alert("email already exist");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const formData = new FormData();
      formData.append("professions", selectedProfessions);
      formData.append("description", e.target.description.value);
      formData.append("image", selectedImage);
      console.log(formData);

      const response = await fetch(
        `${baseUrl}/api/technician/profileupdateInfo/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (true) {

    return (
      <div className={styles.background}>
        <section className={styles.loginSection}>
          <div className={styles["form-box"]}>
            <div className={styles["form-value"]}>
              <form onSubmit={handleSubmit}>
                <h2 className={styles.h2}>Update Information </h2>
                <div className={styles["inputbox"]}>
                  <ion-icon name="person-outline"></ion-icon>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    // defaultValue={user.phone}
                    required
                    className={styles.input}
                  />
                  <label className={styles.label}>Phone</label>
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
                    type="text"
                    id="location"
                    name="location"
                    required
                    className={styles.input}
                  />
                  <label className={styles.label}>Location</label>
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
                  Update
                </button>
                <div className={styles["register"]}>
                  <p>Back to profile ?<Link href="/techprofile" legacyBehavior>
                    <a className={`${styles.loginLink} hover:bg-orange-400`}>Back</a>
                  </Link></p>

                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}