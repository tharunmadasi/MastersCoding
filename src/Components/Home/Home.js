import React from "react";
import "./Home.css";
import Carousel from "../Carousel/Carousel";

function Home() {
  return (
    <div className="main">
      <section className="info">
        <h2 class="heading mt-5 text-white">Assignment Management App</h2>
        <div class="submain1">
          {/* <h1>image carousel</h1> */}
          <Carousel />
        </div>
      <h2 className="text-white" style={{marginTop: 50}}>Features</h2>
      <div className="row mt-5" style={{ justifyContent: "center"}}>
      <div className="col-md-6 card mb-5" style={{ maxWidth: 540, marginRight: 100}}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://miro.medium.com/v2/resize:fit:1024/1*IzBCwwKHz9RY7rjshw15ng.png" className="card-img" alt="..." />
          </div>
          <div className="col-md-8 feature">
            <div className="card-body">
              <h5 className="card-title text-success">Revolutionizing the Academic World</h5>
              <p className="card-text">
                Our cutting-edge web application is set to transform the
                academic landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 card mb-5" style={{ maxWidth: 540 }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://thumbs.dreamstime.com/b/business-woman-meditating-yoga-lotus-position-peaceful-african-american-trying-to-abstract-work-affairs-find-mental-114151129.jpg" className="card-img" alt="..." />
          </div>
          <div className="col-md-8 feature">
            <div className="card-body">
              <h5 className="card-title text-success">No More Chaos</h5>
              <p className="card-text">
                Say goodbye to disorganized email chains and assignment handouts
                via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 card" style={{ maxWidth: 540, marginRight:100, marginBottom: 200}}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://t4.ftcdn.net/jpg/05/42/19/99/360_F_542199967_uRXsDsJqhsVEZhzLx0o3qv5LSea0spLV.jpg" className="card-img" alt="..." />
          </div>
          <div className="col-md-8 feature">
            <div className="card-body">
              <h5 className="card-title text-success">One-Stop-Shop</h5>
              <p className="card-text">
                Our platform serves as a comprehensive solution for all academic
                needs - from assigning tasks to engaging students.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 card" style={{ maxWidth: 540, marginBottom: 200 }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src="https://static.vecteezy.com/system/resources/previews/024/033/722/original/efficiency-fill-outline-icon-design-illustration-work-in-progress-symbol-on-white-background-eps-10-file-vector.jpg" className="card-img" alt="..." />
          </div>
          <div className="col-md-8 feature">
            <div className="card-body">
              <h5 className="card-title text-success">Efficiency</h5>
              <p className="card-text">
                Our platform promotes efficiency in academic processes, saving
                valuable time and effort.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>
      <section class="anime-container waves">
      <div class="anime anime1"></div>
      <div class="anime anime2"></div>
      <div class="anime anime3"></div>
      <div class="anime anime4"></div>
      </section>
    </div>
  );
}

export default Home;
