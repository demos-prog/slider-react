import { nanoid } from "nanoid";
import "./null_styles.css";
import "./slider.css";
import React, { useEffect, useState } from "react";

const slideWidth = 600;

export default function Slider(props) {
  const [left, setLeft] = useState(0);
  const [over, setOver] = useState(props.auto);
  const numOfSlides = props.slides.length;
  // const sliderWidth = slideWidth * numOfSlides;
  const [currentPage, setCurrentPage] = useState(left / slideWidth + 1);

  function hendlerPrev() {
    setLeft((prev) => {
      if (prev <= 0) {
        return slideWidth * (numOfSlides - 1);
      }
      return prev - slideWidth;
    });
  }

  function hendlerNext() {
    setLeft((prev) => {
      if (prev < slideWidth * (numOfSlides - 1)) {
        return prev + slideWidth;
      }
      if (props.loop) {
        return 0;
      } else {
        return slideWidth * (numOfSlides - 1);
      }
    });
  }

  useEffect(() => {
    if (over) {
      const interval = setInterval(() => {
        hendlerNext();
      }, props.delay * 1000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    setCurrentPage(left / slideWidth + 1);
  }, [left]);

  const slides = props.slides.map((slide, index) => {
    return (
      <div key={nanoid()} className="slideWrapper">
        <div className="slideImg">
          <img src={slide.img} alt={index}></img>
        </div>
        <div className="slideTxt">{slide.text}</div>
      </div>
    );
  });

  const pagination = [];

  for (let i = 1; i <= numOfSlides; i++) {
    let elem = (
      <div
        key={nanoid()}
        className={i === currentPage ? "pageBtn activePage" : "pageBtn"}
        onClick={() => {
          setLeft(slideWidth * (i - 1));
        }}
      >
        {i}
      </div>
    );
    pagination.push(elem);
  }

  return (
    <>
      <div
        className="wrapper"
        onPointerOver={() => {
          setOver(false);
        }}
        onPointerOut={() => {
          setOver(true);
        }}
      >
        <div className="slider" style={{ left: -left }}>
          {slides}
        </div>
        {props.navs && (
          <button className="arrows prev" onClick={hendlerPrev}>
            Prev
          </button>
        )}
        {props.navs && (
          <button className="arrows next" onClick={hendlerNext}>
            Next
          </button>
        )}
        <div className="currPage">
          {currentPage}/{numOfSlides}
        </div>
      </div>
      {props.pags && <div className="pagination">{pagination}</div>}
    </>
  );
}
