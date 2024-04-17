import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import "../gallery/gallery.css"



function Gallery() {
    return (
        <div>

            <Header />

            <div class="container">

                <h1 class="heading">The Heritage Hotel <span>Gallery</span></h1>

                <div class="gallery">

                    <div class="gallery-item">
                        <img class="gallery-image" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=500&fit=crop" alt="person writing in a notebook beside by an iPad, laptop, printed photos, spectacles, and a cup of coffee on a saucer"></img>
                    </div>

                    <div class="gallery-item">
                        <img class="gallery-image" src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=500&h=500&fit=crop" alt="sunset behind San Francisco city skyline"></img>
                    </div>

                    <div class="gallery-item">
                        <img class="gallery-image" src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=500&h=500&fit=crop" alt="people holding umbrellas on a busy street at night lit by street lights and illuminated signs in Tokyo, Japan"></img>
                    </div>

                    <div class="gallery-item">
                        <img class="gallery-image" src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=500&h=500&fit=crop" alt="car interior from central back seat position showing driver and blurred view through windscreen of a busy road at night"></img>
                    </div>

                    <div class="gallery-item">
                        <img class="gallery-image" src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=500&h=500&fit=crop" alt="back view of woman wearing a backpack and beanie waiting to cross the road on a busy street at night in New York City, USA"></img>
                    </div>

                    <div class="gallery-item">
                        <img class="gallery-image" src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=500&h=500&fit=crop" alt="man wearing a black jacket, white shirt, blue jeans, and brown boots, playing a white electric guitar while sitting on an amp"></img>
                    </div>

                </div>

            </div>

            <Footer />

        </div>
    )
}

export default Gallery;


