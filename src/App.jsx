import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";

export const Users = React.createContext(null);

function App() {
  const [show, setSHow] = useState(true);
  const [users, setUsers] = useState("");
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_GET_URL)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  function hendalDelite(id) {
    let copid = users.filter((el) => {
      return el.id != id;
    });
    setUsers(copid);
  }

  function hendalShow() {
    setSHow(true);
  }

  function hendalClose() {
    setSHow(false);
  }

  return (
    <BrowserRouter>
      <>
        <header>
          <nav>
            <Link onClick={hendalShow} to="/">
              Home
            </Link>
            <Link onClick={hendalClose} to="/about">
              About
            </Link>
          </nav>
        </header>
        {show && (
          <main>
            {users.length &&
              users.map((el) => {
                return (
                  <div className="card" key={el.id}>
                    <img src="/user.png" alt="user-img" />
                    <p className="name">{el.name}</p>
                    <p className="username">{el.username}</p>
                    <p className="email">{el.email}</p>

                    <button
                      onClick={() => {
                        hendalDelite(el.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </main>
        )}
      </>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
