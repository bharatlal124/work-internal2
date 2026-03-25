const testimoniaAuthorslSlider = new Swiper(".testimonial-authors-slider", {
	  loop: true,
  loopedSlides: totalSlides,
        centeredSlides: true,

  slidesPerView: "3.3",
  autoplay: {
    delay: 5000,
    reverseDirection: true,
    disableOnInteraction: false,
  },
  slideToClickedSlide: true,

  direction: "horizontal",
  allowTouchMove: false,
  spaceBetween: 20,
  slideActiveClass: "testimonial-authors-active",
  pagination: { el: ".testimonial-authors-slider-pagination", clickable: true },
  thumbs: { swiper: testimonialSlider },
  breakpoints: {
    1025: {
      direction: "vertical",
      spaceBetween: 30,
      allowTouchMove: true,
      slidesPerView: "3.3",
    },
  },
});
