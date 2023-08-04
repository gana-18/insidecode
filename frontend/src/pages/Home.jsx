import Article from "../components/Article";
import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {fetchFollowingPosts} from '../features/post/postSlice';
import {login} from '../features/auth/authSlice';

function Home() {
  const dispatch = useDispatch();
  const [user,setUser] = useState(null);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.user) {
      dispatch(login());
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    if (auth.status === "succeeded") {
      setUser(auth.user);
    } else if (auth.status === "failed") {
      setUser(null);
    }
  }, [auth.status, auth.user]);

  const {posts} = useSelector((state) => state.post);
  const [followingPosts, setFollowingPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchFollowingPosts(user?user._id:{})).then((response) => {
      setFollowingPosts(response.payload);
    });
  },[ dispatch])

  const cards = posts?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));

  const followcards = followingPosts?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));
const url=user? `/home/following/${user._id}` : `/`;
  
  return (
    <>
      <div className="home">
        <div className="homelinks">
          <div>
          <NavLink to="/home" style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center', color: location.pathname === "/home" ? '#3B82F6' : 'black' }}
              activeStyle={{ color: 'black' }}>
               <img src="/images/icons8-fantasy-32.png" alt="magic" /> Personalized
        </NavLink>
          </div>
        <div>
        <NavLink to={url} style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center',color: location.pathname === "/home/following" ? '#3B82F6' : 'black' }}
              activeStyle={{ color: '#3B82F6' }}
            >
             <img src="/images/icons8-following-32.png" alt="following"/> Following
        </NavLink>
        </div>
        
       </div>
          {location.pathname ===(url) ? followcards : cards}
      </div>
    </>
  )
}

export default Home;
