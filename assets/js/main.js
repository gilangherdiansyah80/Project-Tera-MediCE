/**
* Template Name: Bootslander
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }

  // Format mata uang menggunakan Intl.NumberFormat
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      
    }).format(amount);
  };

  const pricing = () => {
    const buttonPrev = document.querySelector('.btn-prev');
    const buttonNext = document.querySelector('.btn-next');
    const totalUser = document.querySelector('.total-user');
    const diskon = document.querySelector('.diskon');
    const totalPrice = document.querySelector('.total-price');

    // Pastikan elemen ditemukan sebelum memasang event listener
    if (buttonPrev && buttonNext && totalUser && diskon && totalPrice) {
        const hargaPerUser = 50000;
        const hargaDiskon = 40000; // Harga diskon per user jika > 5 user
  
        // Fungsi untuk memperbarui diskon berdasarkan total user
        const updateDiskon = (currentValue) => {
            let totalDiskon = currentValue * hargaPerUser;
            diskon.innerHTML = formatCurrency(totalDiskon); // Format diskon dengan currency
        };

        // Fungsi untuk memperbarui total harga
        const total = (currentValue) => {
            let hargaPerUserAktual = currentValue > 5 ? hargaDiskon : hargaPerUser;
            let totalHarga = currentValue * hargaPerUserAktual;
            if (currentValue > 5) {
              totalPrice.innerHTML = formatCurrency(totalHarga);
              diskon.style = 'text-decoration-line: line-through';
          } else if (currentValue <= 5) {
              totalPrice.innerHTML = '';
              diskon.style = 'text-decoration-line: none';
          }
        };
  
        // Event untuk tombol "prev"
        buttonPrev.addEventListener('click', () => {
            let currentValue = parseInt(totalUser.innerHTML) || 0;
            if (currentValue > 0) { // Cegah nilai user kurang dari 1
                totalUser.innerHTML = currentValue - 1;
                updateDiskon(currentValue - 1); // Kurangi diskon
                total(currentValue - 1); // Perbarui total harga
            }
        });
  
        // Event untuk tombol "next"
        buttonNext.addEventListener('click', () => {
            let currentValue = parseInt(totalUser.innerHTML) || 0;
            totalUser.innerHTML = currentValue + 1;
            updateDiskon(currentValue + 1); // Tambah diskon
            total(currentValue + 1); // Perbarui total harga
        });
    } else {
        console.error('Element(s) not found');
    }
};

const cardFeatures = () => {
  const sectionFeatures = document.querySelector('.card-features-basic');
  const basic = document.querySelector('#basic');
  const icon = document.querySelector('#icon-close');
  const btnFeatures = document.querySelector('#btn-features');
  const btnAddons = document.querySelector('#btn-addons');
  const addons = document.querySelector('.section-addons');
  const features = document.querySelector('.section-features');
  const container = document.querySelector('.container-right');

  basic.addEventListener('click', () => {
    sectionFeatures.removeAttribute('hidden');
  })

  icon.addEventListener('click', () => {
    sectionFeatures.setAttribute('hidden', true);
  })

  btnAddons.addEventListener('click', () => {
    addons.removeAttribute('hidden');
    features.setAttribute('hidden', true);
    container.style = 'overflow-y: hidden'
  })

  btnFeatures.addEventListener('click', () => {
    features.removeAttribute('hidden');
  })
}

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  // Panggil fungsi pricing saat halaman sudah siap
  document.addEventListener('DOMContentLoaded', pricing);
  document.addEventListener('DOMContentLoaded', cardFeatures);
})();





