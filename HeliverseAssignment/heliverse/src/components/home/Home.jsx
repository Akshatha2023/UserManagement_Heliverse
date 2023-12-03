import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../Utills";
import Card from "../card/Card";
import styles from "./home.module.css";
const Home = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState([]);
  const [page, setPage] = useState({});
  const [myPage, setMyPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [domain, setDomain] = useState("");

  const handleAvailabilityChange = (event) => {
    const value = event.target.value === "true";
    setIsAvailable(value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}?page=${myPage}`);
      if (res.status === 200) {
        setUser(res.data.data);
        setPage({
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(page);
  useEffect(() => {
    getUsers();
  }, []);
  const getUserByName = async () => {
    if (!userName) {
      getUsers();
    } else {
      const payload = {
        first_name: userName.trim(),
        last_name: userName.trim(),
      };
      try {
        const res = await axios.put(`${baseUrl}/search`, payload);
        if (res.status === 200) {
          setUser(res.data.data);
          setPage({
            currentPage: res.data.currentPage,
            totalPages: res.data.totalPages,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (myPage >= 1) {
      getUsers();
    }
  }, [myPage]);

  const filteredData = async () => {
    try {
      const payload = {
        domain: domain.trim() || undefined,
        gender: selectedGender || undefined,
        available: isAvailable,
      };
      const res = await axios.put(`${baseUrl}/filter`, payload);
      if (res.status === 200) {
        setUser(res.data.data);
        setPage({
          currentPage: res.data.currentPage,
          totalPages: res.data.totalPages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedGender || isAvailable || !isAvailable) {
      filteredData();
    }
  }, [selectedGender, isAvailable]);
  useEffect(() => {
    if (!userName) {
      getUsers();
    }
  }, [userName]);
  return (
    <>
      <h3 className={styles.heading}>User Management App</h3>
      <div className={styles.pagination}>
        <input
          type="text"
          value={userName}
          placeholder="please enter name to search"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className={styles.inputField}
        />
        <button onClick={getUserByName}>search</button>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.gender}>
          <h3>Select Gender:</h3>
          <label>
            <input
              type="radio"
              value="Male"
              checked={selectedGender === "Male"}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={selectedGender === "Female"}
              onChange={handleGenderChange}
            />
            Female
          </label>
        </div>
        <div className={styles.available}>
          <h3>Select Availability:</h3>
          <label>
            <input
              type="radio"
              value="true"
              checked={isAvailable === true}
              onChange={handleAvailabilityChange}
            />
            Available
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={isAvailable === false}
              onChange={handleAvailabilityChange}
            />
            Not Available
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="please give domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button onClick={filteredData}>Apply filter</button>
        </div>
      </div>
      <div>
        <div className={styles.cardContainer}>
          {user.length > 0 &&
            user.map((ele) => {
              return <Card data={ele} />;
            })}
        </div>
      </div>
      <section className={styles.pagination}>
        <button onClick={() => setMyPage(page.currentPage - 1)}>
          previous
        </button>
        <div>
          {page.currentPage}/{page.totalPages}
        </div>
        <button onClick={() => setMyPage(page.currentPage + 1)}>next</button>
      </section>
    </>
  );
};

export default Home;
