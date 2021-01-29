//! ----------Burger-menu------------
window.addEventListener('resize', () => {
  coachesSwiper.pagination.destroy();
  coachesSwiper.pagination.init();
  coachesSwiper.pagination.render();
  coachesSwiper.pagination.update();
});




//! ----------Swiper-------------
const servicseSwiper = new Swiper('.services-swiper', {
  // Optional parameters
  loop: true,

  breakpoints: {
    320: {
      slidesPerView: 1.3,
      spaceBetween: 6,
    },
    790: {
      slidesPerView: 1.3,
      spaceBetween: 10,
    },
    960: {
      slidesPerView: 2,
    },
    1170: {
      slidesPerView: 3,
      spaceBetween: 16,
    }
  }
});

const coachesSwiper = new Swiper('.coaches-swiper', {
  // Optional parameters
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      return current + ' of ' + total;
    }  },



  breakpoints: {
    320: {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },

      slidesPerView: 1.3,
      spaceBetween: 6,
    },
    790: {
      lidesPerView: 1.3,
      spaceBetween: 10,
    },
    960: {
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span className="' + currentClass + '"></span>' +
            ' of ' +
            '<span className="' + totalClass + '"></span>';
        }
      },
      lidesPerView: 1.3,
      spaceBetween: 10,
    },
    1170: {
      slidesPerView: 2,
      spaceBetween: 16,
    }
  }
});