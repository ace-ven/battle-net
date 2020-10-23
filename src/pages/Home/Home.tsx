import React from "react";
import "./Home.scss";

const HomePage: any = () => {
  if (window.Worker) {
    const myWorker = new Worker("../../../worker.js");
    setTimeout(() => {
      myWorker.postMessage("test");
      console.log("Message posted to worker");
    }, 2000);

    myWorker.onmessage = function (e) {
      console.log("Message received from worker");
    };
  } else {
    console.log("Your browser doesn't support web workers.");
  }
  return (
    <div className="home-page-container">
      <h1> THIS IS HOME PAGE</h1>
    </div>
  );
};
export default HomePage;
