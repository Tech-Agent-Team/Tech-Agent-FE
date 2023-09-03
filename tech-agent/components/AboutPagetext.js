import React from 'react';
import styles from '../styles/about.module.css';
import cardStyles from '../styles/cardStyles.module.css';
const AboutPagetext = () => {
    return (
        <>
        <h1>SERVICES</h1>
            <div id="service" className={styles.container}>
                <div className={cardStyles.card}>
                    <figure className="pic-hover hover-scale mb20">
                        <span className="center-xy" >
                            <a className="image-popup" href="images/misc/pic_6.jpg">
                                <i className="fa fa-image btn-action btn-action-hide"></i>
                            </a>
                        </span>
                        <span className="bg-overlay" ></span>
                        <img src="https://ibt.edu/wp-content/uploads/2022/06/What-Does-an-HVAC-Tech-do-ATI-4_22-1024x684.jpg" className={`${styles.image} img-responsive`} alt="" />
                    </figure>
                    <h3 className={styles.heading}>Planning</h3>
                    <p className={styles.paragraph}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                    </p>
                </div>

                <div className={cardStyles.card}>
                    <figure className="pic-hover hover-scale mb20">
                        <span className="center-xy" >
                            <a className="image-popup" href="images/misc/pic_6.jpg">
                                <i className="fa fa-image btn-action btn-action-hide"></i>
                            </a>
                        </span>
                        <span className="bg-overlay" ></span>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMC1Qq6VBJ8im2-5dfnH3IiqP7Vcxa-smT7xX5T2NpFLkNfAS69Cuj-wkF5f_2BTPqxrc&usqp=CAU" className={`${styles.image} img-responsive`} alt="" />
                    </figure>
                    <h3 className={styles.heading}>Planning</h3>
                    <p className={styles.paragraph}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                    </p>
                </div>

                <div className={cardStyles.card}>
                    <figure className="pic-hover hover-scale mb20">
                        <span className="center-xy" >
                            <a className="image-popup" href="images/misc/pic_6.jpg">
                                <i className="fa fa-image btn-action btn-action-hide"></i>
                            </a>
                        </span>
                        <span className="bg-overlay" ></span>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_bq8jvDRtbXfqLpYvKx8z4ksERUmtUqhhHQ&usqp=CAU" className={`${styles.image} img-responsive`} alt="" />
                    </figure>
                    <h3 className={styles.heading}>Planning</h3>
                    <p className={styles.paragraph}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                    </p>
                </div>
                <div className={cardStyles.card}>
                    <figure className="pic-hover hover-scale mb20">
                        <span className="center-xy" >
                            <a className="image-popup" href="images/misc/pic_6.jpg">
                                <i className="fa fa-image btn-action btn-action-hide"></i>
                            </a>
                        </span>
                        <span className="bg-overlay" ></span>
                        <img src="https://www.simedarbymotors.com/clients/Simedarby_Motors_2016_DAFB5D56-6F74-4F70-839C-5BEF8137AB85/contentms/img/2022%20Images/Meet-Auto-Bavaria's-Top-Technician-Chuah-Teong-Lieh.jpg" className={`${styles.image} img-responsive`} alt="" />
                    </figure>
                    <h3 className={styles.heading}>Planning</h3>
                    <p className={styles.paragraph}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                    </p>
                </div>
                <div className={cardStyles.card}>
                    <figure className="pic-hover hover-scale mb20">
                        <span className="center-xy" >
                            <a className="image-popup" href="images/misc/pic_6.jpg">
                                <i className="fa fa-image btn-action btn-action-hide"></i>
                            </a>
                        </span>
                        <span className="bg-overlay" ></span>
                        <img src="https://blog.toyota-forklifts.eu/hubfs/Imported%20images/15703_768x400_toyota%20mh.jpg" className={`${styles.image} img-responsive`} alt="" />
                    </figure>
                    <h3 className={styles.heading}>Planning</h3>
                    <p className={styles.paragraph}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                    </p>
                </div>
                <div className={cardStyles.card}>
                    <figure className="pic-hover hover-scale mb20">
                        <span className="center-xy" >
                            <a className="image-popup" href="images/misc/pic_6.jpg">
                                <i className="fa fa-image btn-action btn-action-hide"></i>
                            </a>
                        </span>
                        <span className="bg-overlay" ></span>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzTJUdNZvkOCjtFhQCYUeFcgw4iyNecMO4g&usqp=CAU" className={`${styles.image} img-responsive`} alt="" />
                    </figure>
                    <h3 className={styles.heading}>Planning</h3>
                    <p className={styles.paragraph}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                    </p>
                </div>
            </div>
        </>


    );
};

export default AboutPagetext;