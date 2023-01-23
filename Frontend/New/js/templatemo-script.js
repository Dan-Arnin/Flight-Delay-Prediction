/*

TemplateMo 560 Astro Motion

https://templatemo.com/tm-560-astro-motion

*/

var gallery = undefined;

function closeMenu() {
  $(".navbar-collapse").removeClass("show"); 
}

function highlightMenu(no) {
  $(".navbar .navbar-nav > .nav-item").removeClass('selected');
  $(".navbar .navbar-nav > .nav-item > .nav-link[data-no='" + no + "']").parent().addClass('selected');
}

function setupGallery() {
  gallery = $('.gallery-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 3,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}

async function openPage(no) {

  if(no == 2) {
    if(gallery == undefined) {
      setupGallery();
      const mon = document.getElementById("monno").value;
  const dom = document.getElementById("domno").value;
  const dow = document.getElementById("downo").value;
  const carrier = document.getElementById("carrier").value;
  const origin = document.getElementById("origin").value;
  const miles = document.getElementById("miles").value;
  const depart = document.getElementById("depart").value;
  const duration = document.getElementById("duration").value;
  params = {
    'mon': mon, 'dom': dom, 'dow': dow, 'carrier': carrier, 'org':origin, "mile":miles, "depart": depart, "duration": duration
  }

  const response = await fetch('http://127.0.0.1:8000/flightdelayprediction', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
  });
  const data = await response.json();
  console.log(data); 
  result_ele = document.getElementById("finalresults");
  result_ele.innerText = data["result"];
    } else {
      $('.gallery-slider').slick('unslick');
      setupGallery();
    }    
  }
  

  $('.cd-hero-slider li').hide();
  $('.cd-hero-slider li[data-page-no="' + no + '"]')
    .fadeIn();


  
}

$(window).on('load', function() {
  $('body').addClass('loaded');
  openPage(1);
});

jQuery(function() {
    $('.tm-page-link').on('click', function(){
      var pageNo = $(this).data('page-no');
      openPage(pageNo);
      highlightMenu(pageNo);
    });

    $(".navbar .navbar-nav > .nav-item > a.nav-link").on('click', function(e){
      var pageNo = $(this).data('no');

      openPage(pageNo);
      highlightMenu(pageNo);
      closeMenu();     
    });

    $("html").click(function(e) {
      closeMenu();
    });
});