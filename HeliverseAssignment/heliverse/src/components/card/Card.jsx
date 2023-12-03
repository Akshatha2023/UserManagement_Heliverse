import React from "react";
import styles from "./card.module.css";
const Card = (props) => {
  const mydata = {
    ...props.data,
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.flex}>
          <div>
            <img src={mydata.avatar} alt="img" className={styles.img} />
          </div>
          <div>
            <div>{mydata.first_name}</div>
            <div>{mydata.last_name}</div>
          </div>
        </div>
        <div className={styles.paraContainer}>
          <p>User id : {mydata.id}</p>
          <p>Gender : {mydata.gender}</p>
          <p>Email: {mydata.email}</p>
          <p>Domain: {mydata.domain}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
