import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./app/components/Home/Home";
import Post from "./app/components/Posts/Post";
import Header from "./app/components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
