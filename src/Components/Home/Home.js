import React from 'react';
import './Home.css';
import Carousel from '../Carousel/Carousel';


function Home() {
  return (
    <div>
      <section>
            <div class="submain1">
              {/* <h1>image carousel</h1> */}
              <Carousel />
            </div>
            <div class='anime anime1'></div>
            <div class='anime anime2'></div>
            <div class='anime anime3'></div>
            <div class='anime anime4'></div>
          </section>
    </div>
  )
}

export default Home