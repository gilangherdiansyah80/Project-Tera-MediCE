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
    const buttonsPrev = document.querySelectorAll('.btn-prev');
    const buttonsNext = document.querySelectorAll('.btn-next');
    const containers = document.querySelectorAll('.container-addons');

    const diskonTotalElem = document.querySelector('.diskon-total');
    const totalPriceTotalElem = document.querySelector('.total-price-total');

    // Menyimpan total harga dan diskon untuk setiap baris
    let totalHargaSemuaBaris = 0;
    let totalDiskonSemuaBaris = 0;

    const hargaPerUserDefault = 50000; // Harga default untuk baris 1, 2, 3
    const hargaDiskon1Default = 40000;
    const hargaDiskon2Default = 35000;

    // Harga yang berbeda untuk baris ke-4 dan seterusnya
    const hargaBarisKeempat = 150000;
    const hargaBarisKelima = 100000;
    const hargaBarisKesembilan = 500000;
    const hargaBarisKesepuluh = 250000;

    // Fungsi untuk menentukan harga berdasarkan baris
    const getHargaPerBaris = (index) => {
        if (index === 3) {
            return {
                hargaPerUser: hargaBarisKeempat,
            };
        } else if (index === 4) {
            return {
                hargaPerUser: hargaBarisKelima,
            };
        } else if (index === 8) {
            return {
                hargaPerUser: hargaBarisKesembilan,
            };
        } else if (index === 9) {
            return {
                hargaPerUser: hargaBarisKesepuluh,
            };
        } else {
            return {
                hargaPerUser: hargaPerUserDefault,
                hargaDiskon1: hargaDiskon1Default,
                hargaDiskon2: hargaDiskon2Default
            };
        }
    };

    // Fungsi untuk menghitung total dan diskon dari satu container
    const updateTotalForContainer = (container, index) => {
      const totalUserElem = container.querySelector('.total-user');
      let currentValue = parseInt(totalUserElem.innerHTML) || 0;
      let totalPrice = 0;
      let totalDiskon = 0;

      const harga = getHargaPerBaris(index);

      // Hitung harga berdasarkan jumlah user
      if (currentValue > 10) {
          totalPrice = currentValue * harga.hargaDiskon2;
      } else if (currentValue > 5) {
          totalPrice = currentValue * harga.hargaDiskon1;
      } else if (currentValue > 0) {
          totalPrice = currentValue * harga.hargaPerUser;
      }

      totalDiskon = currentValue * harga.hargaPerUser;

      // Hitung total harga dan diskon dari semua baris
      totalHargaSemuaBaris += totalPrice;
      totalDiskonSemuaBaris += totalDiskon;

      diskonTotalElem.innerHTML = formatCurrency(totalDiskonSemuaBaris);
      totalPriceTotalElem.innerHTML = formatCurrency(totalHargaSemuaBaris);

      // Tambahkan efek garis pada diskon jika ada pengurangan harga
      if (totalPrice < totalDiskon) {
          diskonTotalElem.style = 'text-decoration-line: line-through';
      } else {
          diskonTotalElem.style = 'text-decoration-line: none';
      }

      // Return updated total price and discount for the row
      return { totalPrice, totalDiskon };
  };

    // Event listeners untuk prev dan next
    containers.forEach((container, index) => {
        const buttonPrev = container.querySelector('.btn-prev');
        const buttonNext = container.querySelector('.btn-next');
        const totalUserElem = container.querySelector('.total-user');

        let totalHargaPerBaris = 0;
        let totalDiskonPerBaris = 0;

        buttonPrev.addEventListener('click', () => {
          let currentValue = parseInt(totalUserElem.innerHTML) || 0;
          if (currentValue > 0) {
              totalUserElem.innerHTML = currentValue - 1;
  
              // Kurangi total harga dan diskon untuk baris ini sebelum update
              totalHargaSemuaBaris -= totalHargaPerBaris;
              totalDiskonSemuaBaris -= totalDiskonPerBaris;
  
              // Update nilai untuk container ini dan baris ini
              const { totalPrice, totalDiskon } = updateTotalForContainer(container, index);
  
              // Update harga dan diskon per baris setelah update total
              totalHargaPerBaris = totalPrice;
              totalDiskonPerBaris = totalDiskon;
          }
      });

        buttonNext.addEventListener('click', () => {
          let currentValue = parseInt(totalUserElem.innerHTML) || 0;
          totalUserElem.innerHTML = currentValue + 1;
  
          // Kurangi total harga dan diskon untuk baris ini sebelum update
          totalHargaSemuaBaris -= totalHargaPerBaris;
          totalDiskonSemuaBaris -= totalDiskonPerBaris;
  
          // Update nilai untuk container ini dan baris ini
          const { totalPrice, totalDiskon } = updateTotalForContainer(container, index);
  
          // Update harga dan diskon per baris setelah update total
          totalHargaPerBaris = totalPrice;
          totalDiskonPerBaris = totalDiskon;
      });
    });
};


const cardFeatures = () => {
  const pricingItems = document.querySelectorAll('#pricing-item');
  const sectionFeatures = document.querySelectorAll('.card-features-basic');
  const basic = document.querySelectorAll('#basic');

  sectionFeatures.forEach((containerFeature) => {
    const icon = containerFeature.querySelector('#icon-close');
    const btnFeatures = containerFeature.querySelector('#btn-features');
    const btnAddons = containerFeature.querySelector('#btn-addons');
    const addons = containerFeature.querySelector('.section-addons');
    const features = containerFeature.querySelector('.section-features');
    const containerRight = containerFeature.querySelector('.container-right');
    const closeBtn = containerFeature.querySelector('.close-btn');

    // Tutup card saat ikon 'close' atau 'closeBtn' diklik
    icon.addEventListener('click', () => {
      containerFeature.setAttribute('hidden', true);
    });

    closeBtn.addEventListener('click', () => {
      containerFeature.setAttribute('hidden', true);
    });

    // Tampilkan addons, sembunyikan fitur
    btnAddons.addEventListener('click', () => {
      addons.removeAttribute('hidden');
      features.setAttribute('hidden', true);
      containerRight.style = 'overflow-y: hidden';
    });

    // Tampilkan fitur, sembunyikan addons
    btnFeatures.addEventListener('click', () => {
      features.removeAttribute('hidden');
      addons.setAttribute('hidden', true);
    });
  });

  // Event handler untuk tombol "basic" pada setiap pricing item
  pricingItems.forEach((item, index) => {
    const basicBtn = item.querySelector('#basic');

    basicBtn.addEventListener('click', () => {
      sectionFeatures[index].removeAttribute('hidden');
    });
  });
};


  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  // Panggil fungsi pricing saat halaman sudah siap
  document.addEventListener('DOMContentLoaded', pricing);
  document.addEventListener('DOMContentLoaded', cardFeatures);
})();





