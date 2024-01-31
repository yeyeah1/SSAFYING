import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BottomNavBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setVisible(!isScrollingDown);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TabBarWrapper $visible={visible}>
      <div data-hover="NOW">
        <span>NOW</span>
      </div>
      <div data-hover="ALL">
        <span>ALL</span>
      </div>
      <div data-hover="HOME">
        <span>HOME</span>
      </div>
      <div data-hover="FOREST">
        <span>FOREST</span>
      </div>
      <div data-hover="PROFILE">
        <span>PROFILE</span>
      </div>
    </TabBarWrapper>
  );
};

export default BottomNavBar;

const TabBarWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.$visible ? "0" : "-60px")};
  left: 0;
  right: 0;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  transition: bottom 0.3s;
  z-index: 1000;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration-line: none;
    color: black;
  }
`;

const Menu = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  text-align: center;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  padding: 0;

  span {
    display: block;
    -webkit-transition: -webkit-transform 500ms
      cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: -webkit-transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
      -webkit-transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &:after {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    content: attr(data-hover);
    display: inline;
    text-align: center;
    -webkit-transition: top 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transition: top 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &:hover {
    color: #ffa6c9;
  }

  &:hover span {
    color: #ffa6c9;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  &:hover:after {
    top: 0;
  }

  &:active {
    -webkit-animation-name: rubberBand;
    animation-name: rubberBand;
  }
`;
