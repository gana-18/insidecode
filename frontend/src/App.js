import { useEffect,useState } from "react";
import {Routes,Route, Navigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {fetchLogin} from './features/auth/authSlice'
import {fetchPosts,fetchFollowingPosts,reset} from './features/post/postSlice';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import BlogInput from "./pages/Blog";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Bookmarks from "./pages/Bookmarks";
import Following from "./pages/Following";
function App() {
  const dispatch = useDispatch();
  const [user,setUser] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [posts,setPosts] = useState(null);
  const post = useSelector((state) => state.post);
  const [followingPosts,setFollowingPosts] = useState(null);
  /*useEffect(() => {
    if (!auth.user) {
      dispatch(fetchLogin());
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    if (auth.status === "succeeded") {
      setUser(auth.user);
    } else if (auth.status === "failed") {
      setUser(null);
    }
  }, [auth.status, auth.user]);*/

  useEffect(() => {
    if (post.status === 'idle') {
      dispatch(fetchPosts());
    }
    if(post.status === 'succeeded'){
      setPosts(post.posts);
    }
    if(post.status === 'failed'){
      setPosts(null);
    }
  }, [post.status, dispatch]);


  
  useEffect(() => {
    if (post.status === 'idle') {
      if(user)
      dispatch(fetchFollowingPosts(user._id));
    }
    if(post.status === 'succeeded'){
      setFollowingPosts(post.followingPosts);
    }
    if(post.status === 'failed'){
      setFollowingPosts(null);
    }
  }, [post.status, dispatch]);

  useEffect(() => {
    if(auth.status==='idle'||auth.status==='loading'){
      dispatch(fetchLogin());
    }
    if(auth.status==='succeeded'){
      setUser(auth.user);
    }
    if(auth.status==='failed'){
      setUser(null);
    }
  }, [auth.status, dispatch]);

  console.log("auth is",auth)
  return (
    <>
        <div>
        <Header user={user}/>
          <Routes>
            <Route path="/" element={user? <Navigate to ="/home"/>:<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path={user? `/home/following/${user._id}` : `/`} element={<Home/>}/>
            <Route path= {user ? `/post/create/${user._id}` : '/'} element={<BlogInput/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/bookmarks" element={<Bookmarks/>}/>
            <Route path="/user/following" element={<Following/>}/>
          </Routes>
        </div>
    </>
    
  );
}

export default App;
