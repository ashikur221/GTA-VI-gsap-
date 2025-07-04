import { useGSAP } from '@gsap/react';
import React, { useState } from 'react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'

const App = () => {

  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%	,"
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= .9) {
            document.querySelector(".svg").remove();
            setShowContent(true);
            this.kill();
          }
        }
      });
  })

  useGSAP(() => {
    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * .4}%`,
      });

      gsap.to(".sky", {
        x: xMove,
      });

      gsap.to(".bg", {
        x: xMove * 1.8,
      })
    })
  }, [showContent])

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {
        showContent && (
          <div className="main w-full">
            <div className="landing w-full h-screen bg-black">

              <div className="navbar absolute top-0 left-0 w-full py-10 px-10  z-10 ">

                <div className="logo flex gap-7 items-center">
                  <div className="lines flex flex-col gap-1">
                    <div className="line w-10 h-2 bg-white"></div>
                    <div className="line w-8 h-2 bg-white"></div>
                    <div className="line w-5 h-2 bg-white"></div>
                  </div>
                  <h3 className="text-4xl text-white">ROCKSTAR</h3>
                </div>
              </div>


              <div className="imagesdiv relative overflow-hidden w-full h-screen">
                <img src="./sky.png" className='absolute sky scale-[1.2] top-0 left-0  w-full h-full object-cover' alt="" />
                <img src="./bg.png" className='absolute bg scale-[1.3] top-0 left-0  w-full h-full object-cover' alt="" />


                <div className="text flex flex-col gap-3 absolute text-white top-20 left-1/2 -translate-x-1/2 text-[12rem] ">
                  <h1 className='-ml-32 leading-none'>grand</h1>
                  <h1 className='ml-20 leading-none'>theft</h1>
                  <h1 className='-ml-20 leading-none'>auto</h1>
                </div>

                <img
                  className="absolute -bottom-[40%] character  left-1/2 -translate-x-1/2 scale-[0.9]"
                  src="./girlbg.png"
                  alt=""
                />
              </div>

              <div className="btmbar text-white absolute bottom-0 left-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent">
                <div className="flex gap-4 items-center">
                  <i className="ri-arrow-down-line text-white text-2xl"></i>
                  <h3 className="text-white text-2xl font-[Helvetica]">Scroll Down</h3>
                </div>
                <img className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[65px]' src="./ps5.png" alt="" />
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};

export default App;