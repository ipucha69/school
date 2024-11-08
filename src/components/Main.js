import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";  // Keep the imports here
import { Nav, Navbar, Container } from "react-bootstrap";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../App';

//components import
import Home from "./home/Home";
import About from "./about/About";
import Profile from "./profile/Profile";
import Login from "./landing/Login";
import Register from "./landing/Register";
import { useDispatch, useSelector } from 'react-redux';
import { addSystemInfo, changeUser, selectSystemInfo, selectUser } from '../reducers/appSlice';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //check user state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const getDetails = async () => {
                const docRef = doc(db, "system","info");
                const docSnap = await getDoc(docRef);
            
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    dispatch(addSystemInfo(data));
                } else {
                    console.log("No such document!");
                    dispatch(addSystemInfo({}));
                }
            };

            dispatch(changeUser(true));
            getDetails();

        } else {
          const getDetails = async () => {
            const docRef = doc(db, "system","info");
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                const data = docSnap.data();
                dispatch(addSystemInfo(data));
            } else {
                console.log("No such document!");
                dispatch(addSystemInfo({}));
            }
          };

            dispatch(changeUser(false));
            getDetails();

            console.log('There is no user so far');
        }
    });
}, [dispatch]);

  const user = useSelector(selectUser);
  const systemInfo = useSelector(selectSystemInfo);
  console.log(systemInfo);
  
  if(user){
    return (
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark" absolute="top">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark" absolute="top">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="justify-content-right">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default Main;
