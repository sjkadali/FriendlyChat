import './App.css';
import { useState, useEffect } from 'react';
import Post from './Post.js';
import { db, auth } from './firebase';
import iglogo from './images/iglogo.png';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts , setPosts] = useState([]);
  const [open, setOpen] = useState(false); 
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=> {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser +" loggedin");
        setUser(authUser);       
      } else {
        setUser(null);
      }
    })
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>
     setPosts(snapshot.docs.map(doc =>({
      id: doc.id,
      post: doc.data()
       })
      )));
  },[]);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));
    setOpenSignIn(false);
  }

  return (
    <div className="app">
      { user?.displayName ? (
          <ImageUpload username={user.displayName} />
      ) : (
       <h3>Sorry, you need to login to upload</h3>
       )}

      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
                <img
                  className="app__headerImage" 
                  src={iglogo}
                  alt=""
                />
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>Sign Up</Button>            
              </center> 
          </form>              
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
                <img
                  className="app__headerImage" 
                  src={iglogo}
                  alt=""
                />                
                <Input
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signIn}>Sign In</Button>            
              </center> 
          </form>              
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage" 
          src={iglogo}
          alt=""
        />       
      </div>
      { user ? (
        <Button onClick={()=> auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=> setOpen(true)}>Sign Up</Button>
        </div>
      )}
      <h1>Welcome to Instagram React App</h1>    
      <div>
        {
          posts.map(({id, post}) => (
          <Post key={id || username } username={post.username} caption={post.caption} imageUrl={post.imageUrl} />          
          ))}
      </div>      
    </div>
  )
}

export default App
