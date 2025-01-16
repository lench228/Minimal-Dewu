import React from "react";
import Home from "./home";

const HomePage = () => {
  return (
    <section className={"w-full flex sm:flex-row flex-col-reverse"}>
      <Home></Home>
      <div
        className={
          "self-end flex flex-col items-center mx-auto my-4 sm:mx-12 sm:my-12 gap-4 w-full sm:w-auto"
        }
      >
        {window.screen.width > 680 && (
          <img
            className={"w-[150px] h-auto"}
            src={"./dist/illustrations/qr-code.png"}
          ></img>
        )}
        <a
          className={
            "text-white-darker-1 font-title text-xl underline text-center"
          }
          href={
            "https://sj.qq.com/appdetail/com.shizhuang.duapp?android_schema=dewuapp%3A%2F%2Fm.poizon.com%2Fhome%2FHomePage%3Fhome%3Dmall%0A&from_wxz=1"
          }
        >
          Приложение Dewu
        </a>
      </div>
    </section>
  );
};

export default HomePage;
