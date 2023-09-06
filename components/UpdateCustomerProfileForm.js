import { useAuth } from "@/context/auth";
import Header from "./Header";
import styles from "../styles/userupdate.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function UpdateCustomerProfileForm() {
  const { user, token } = useAuth();
  console.log(token);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      location: e.target.location.value,
    };

    try {
      const response = await fetch(`${baseUrl}/api/customer/profileupdate/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        router.push("./userprofile")
      } else {
        alert("email already exist");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
if (user){
    
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
                  required
                  className={styles.input}
                />
                <label className={styles.label}>Phone</label>
              </div>

              <div className={styles["inputbox"]}>
              <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="text"
                  id="email"
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

              <button className={styles.button} type="submit">
                Update
              </button>
              
              <div className={styles["register"]}>
                <p>Back to profile ?<Link href="/userprofile" legacyBehavior>
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