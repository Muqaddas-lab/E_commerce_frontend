import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "skyblue",
        color: "white",
        textAlign: "center",
        padding: "15px",
        width: "100%",
        marginTop: "20px", // thoda space
      }}
    >
      <p>© 2025 My E-Commerce. All rights reserved.</p>
      <p>
        Follow us on:{" "}
        <a href="#" style={{ color: "white", margin: "0 5px" }}>
          Facebook
        </a>
        <a href="#" style={{ color: "white", margin: "0 5px" }}>
          Instagram
        </a>
        <a href="#" style={{ color: "white", margin: "0 5px" }}>
          Twitter
        </a>
      </p>
    </footer>
  );
};

export default Footer;
