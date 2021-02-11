import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Welcome to Instagram React App</h1>

      <div className="app__top">
      <img 
        className="app__logo" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
        alt=""
      />
      <h1>Reels</h1>
      </div>

      <div className="app__videos">
        {/* Container 0f app__videos (scrollable) */}
      </div>
    </div>
  );
}

export default App;
