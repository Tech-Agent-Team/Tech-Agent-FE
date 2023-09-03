import styles from '../styles/login.module.css'; // Import your CSS module
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

const LoginForm = () => {
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      await login(username, password);
      router.push('/LoginPage');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.loginSection}>
        <div className={styles['form-box']}>
          <div className={styles['form-value']}>
            <form action="" onSubmit={handleLogin}>
              <h2 className={styles.h2}>Login</h2>
              <div className={styles['inputbox']}>
                <ion-icon name="mail-outline"></ion-icon>
                <input type="text" required name="username" className={styles.input} />
                <label className={styles.label}>UserName</label>
              </div>
              <div className={styles['inputbox']}>
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" required name="password" className={styles.input} />
                <label className={styles.label}>Password</label>
              </div>
              
              <button className={styles.button} type='submit'>Log in</button>
              <div className={styles['register']}>
                <p>
                  Don't have an account? 
                </p>
                <div className="flex justify-between">
          <Link href="/TechRegPage" legacyBehavior>
            <a className="p-2 mr-1 text-white bg-gray-500 rounded-md hover:bg-green-600 focus:outline-none wider whitespace-nowrap">
              Register as Technician
            </a>
          </Link>
          <Link href="/UserRegPage" legacyBehavior>
            <a className="p-2 ml-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none wider whitespace-nowrap">
              Register as customer
            </a>
          </Link>
        </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;