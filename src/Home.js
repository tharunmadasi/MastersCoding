import React,{ useState } from 'react';
import './Home.css'
import Carousel from './images';

function Home() {
  const imageUrls=[
    'https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-nature-cool-images-background-hd.jpg',
    'https://images.designtrends.com/wp-content/uploads/2016/04/02133843/Beautiful-Horizon-Background.jpg',
    'https://www.pixelstalk.net/wp-content/uploads/2016/08/Cool-nature-backgrounds-hd-resolution-1920x1080.jpg',
  ];

  return (
    <div>
      <section>
            <div class="submain1">
              {/* <h1>image carousel</h1> */}
              <Carousel images={imageUrls} className="images"/>
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