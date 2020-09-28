import React from "react";
import "./Home.scss";
const HomePage: React.FC = () => {
  if (window.Worker) {
    const myWorker = new Worker("../../../worker.js");
    setTimeout(() => {
      myWorker.postMessage("test");
      console.log("Message posted to worker");
    }, 2000);

    // worker.onchange = function () {
    //   myWorker.postMessage([first.value, second.value]);
    //   console.log("Message posted to worker");
    // };

    myWorker.onmessage = function (e) {
      // result.textContent = e.data;
      console.log("Message received from worker");
    };
  } else {
    console.log("Your browser doesn't support web workers.");
  }
  return (
    <div className="home-page-container">
      <h1> THIS IS HOME PAGE</h1>
      {/* <button onClick={testMsp}></button> */}
    </div>
  );
};
export default HomePage;
