import React from 'react';
import "./ProductDetails.css"

const Carousel = ({product}) => {
    return (
        <div>
        <div  class="carousel slide" data-bs-ride="carousel">
     <div class="carousel-inner">
    <div class="carousel-item active">
     {        product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
    </div>
  </div>
</div>
        </div>
    )
}

export default Carousel;
