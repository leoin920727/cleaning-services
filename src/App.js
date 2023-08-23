import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Book1 from "./pages/book/Book1";
import Book2 from "./pages/book/Book2";
import Book3 from "./pages/book/Book3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="book1" element={<Book1 />} />
        <Route path="book2" element={<Book2 />} />
        <Route path="book3" element={<Book3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
