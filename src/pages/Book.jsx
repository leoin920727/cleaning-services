import Navbar from "../components/navbarIcon";
import { Outlet } from "react-router-dom";
import BookProvider from "../components/book/BookProvider";


export default function Book() {
  return (
    <div className="container">
      <Navbar />
      <BookProvider>
        <Outlet />
      </BookProvider>
    </div>
  );
}
