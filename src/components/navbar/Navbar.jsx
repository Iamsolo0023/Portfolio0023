import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Sidebar */}
      <Sidebar/>
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
        </motion.span>
        <div className="social">
          <a href="#">
            <img src="/facebook.png"  />
          </a>
          <a target="blank" href="https://www.instagram.com/camelcase0023/">
            <img src="/instagram.png"  />
          </a>
          <a target="blank" href="https://www.linkedin.com/in/shaswatsinha0023/">
            <img src="/linkedin.png"  />
          </a>
          <a target="blank" href="https://github.com/Iamsolo0023">
            <img src="/github.png"  />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
