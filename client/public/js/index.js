//HEADER
const nav = document.querySelector(".nav-menu");
const navigation = document.querySelector(".navigation");
const header = document.querySelector(".header");
const nav_link = document.querySelectorAll(".scroll-link");
const openBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");

const navLeft = nav.getBoundingClientRect().left;

console.log(navLeft)
 openBtn.addEventListener("click", () => {
  if (navLeft < 0) {
    for(var x=0; x < nav_link.length; x++)
        {
            nav_link[x].classList.add("nav-link-response");
            nav_link[x].classList.remove("nav_link");
        }
    header.classList.remove("header");
    navigation.classList.add("show");
    nav.classList.add("show");
    document.body.classList.add("show");
  }
}); 

closeBtn.addEventListener("click", () => {
    if (navLeft < 0) {
      for(var x=0; x < nav_link.length; x++)
      {
          nav_link[x].classList.remove("nav-link-response");
          nav_link[x].classList.add("nav_link");
      }
      header.classList.add("header");
      navigation.classList.remove("show");
      nav.classList.remove("show");
      document.body.classList.remove("show");
    }
});


// FIXED NAV
const navBar = document.querySelector(".navigation");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
    for(var x=0; x < nav_link.length; x++)
    {
        nav_link[x].classList.add("nav-link-response");
        nav_link[x].classList.remove("nav_link");
    } 

  } else {
    navBar.classList.remove("fix-nav");
    for(var x=0; x < nav_link.length; x++)
    {
        nav_link[x].classList.remove("nav-link-response");
        nav_link[x].classList.add("nav_link");
    }
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;
    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      top: position,
      left: 0,
    });

    navigation.classList.remove("show");
    nav.classList.remove("show");
    document.body.classList.remove("show");
  });
});



//SLIDER
/* const myslide = document.querySelectorAll('.myslide'),
	  dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
	
	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";
} */

/* $(document).ready(function() {
  $('.card-slider').slick({
    dots: false,
    arrows: true,
    slidesToShow: 4,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
}); */