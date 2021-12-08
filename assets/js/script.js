$(document).ready(function () {


  let logo        = $(".header-logo"),
      menu        = $(".header-menu"),
      header      = $(".header-wrapper"),
      text        = $(".video-animation").find(".text-block"),
      windowWidth,
      borderWidth;

      
  var defaultOptions = {
    container: document.body,
    panelSelector: '*[data-section]',
    directionThreshold: 50,
    delay: 0,
    duration: 1000,
    easing: 'ease'
  };

  let panel = new PanelSnap(defaultOptions);
  $('.scroll-btn').click(function() {
    let next = $(panel.activePanel).data('section') + 1;
    let pane = panel.panelList.find( el => $(el).data('section') == next)
    let p = pane
    console.log(p)
    panel.snapToPanel(p)
  })




  scrollAction();
  mediaActions();
  window.onscroll = function () {
      scrollAction();
  };
  window.onresize = function () {
      mediaActions();
  };



  let sliderMain = $('.slider-block').slick({
    draggable: false,
    infinite: false,
    speed: 0,
    arrows: false,

  })

  function sliderContentReveal(active = null) {

      gsap.to(`.slick-active .image-wrap`, {
        scaleX: active ? 1 : 0,
        duration: .5,
        ease: Power4.easeInOut,
      });
    
      gsap.to('.slider-subtitle, .slider-title',
      {
        opacity: active ? 0 : 1,
        duration: .5,
        ease: Power4.easeInOut,  
      })

  }

  gsap.to(".slick-active .image-wrap", {
    scaleX: 0,
    duration: 1,
    ease: Power4.easeInOut,
    scrollTrigger: {
      trigger: '.slider-section',
      start: "top center",
    },
  });

  gsap.fromTo('.opac',
  {
    opacity: 0
  },
  {
    opacity: 1,
    duration: .5,
    stagger: 0.4,
    ease: Power4.easeInOut,
    scrollTrigger: {
      trigger: '.opac',
      start: "top center",
    }    
  })


  $('.arrow-next').click(function() {
    sliderContentReveal(1);
    setTimeout(function() {
      sliderMain.slick('slickNext')
    }, 500)
  })
  $('.arrow-prev').click(function() {
    sliderContentReveal(1);    
    setTimeout(function() {
      sliderMain.slick('slickPrev')

    }, 500)
  })
  sliderMain.on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      console.log(slick);
      $('.slider-arrow').removeClass('disabled');
      if ($("[data-slick-index='0'").hasClass('slick-active')) {
        $('.arrow-prev').addClass('disabled');
      }
      if ($(`[data-slick-index='${slick.slideCount - 1}'`).hasClass('slick-active')) {
        $('.arrow-next').addClass('disabled');
      }
      sliderContentReveal(0);
    }
  );


  $(".video-animation").each(function () {
    var caseTriggered = false;
    var animationFinished = false;
    var $element = $(this);
    var controlVideo = true;  
    windowWidth = parseInt($(window).width());  
    borderWidth = parseInt($(".video-border-right").width());

    // text.css({ "max-width": `${windowWidth - (borderWidth * 2)}px` });

    if (controlVideo) {
      var promise = $element.find("video").get(0).play();
      if (promise !== undefined) {
        promise
          .then(function () {
            $element.find("video").get(0).pause();
          })
          .catch(function (error) {
            console.error(error);
          });
      }
      $('.video-animation').click(function() {
        if ($(this).hasClass('animation-done') && !($element.find("video").get(0).paused)) {
          $element.find("video").get(0).pause();
          $(this).find('img').fadeIn();
        } else if ($(this).hasClass('animation-done') && $element.find("video").get(0).paused) {
          $element.find("video").get(0).play();
          $(this).find('img').fadeOut();
        }
      })

    }

    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      var elOffTop = $element.offset().top;
      var transitionFinish = elOffTop + 150;
      var percentageAnim =
        ((scrollTop - elOffTop) * 1) / (transitionFinish - elOffTop);
      var percentageAnimNeg = 1 - percentageAnim;
    //   windowWidth = parseInt($(window).width());  
    //   borderWidth = parseInt($(".video-border-right").width())

    //   text.css({ "max-width": `${windowWidth - borderWidth * 2}px` });

      if (scrollTop > elOffTop && caseTriggered === false) {
        $element.addClass("grow");
        if (controlVideo) {
          $element.find("video").get(0).play();
        }
        caseTriggered = true;
      } else if (scrollTop == 0 && caseTriggered === true) {
        $element.removeClass("grow");
        if (controlVideo) {
          $element.find("video").get(0).pause();
          $element.find('img').fadeOut();
        }
        caseTriggered = false;
      }
      if (scrollTop > transitionFinish && animationFinished === false) {
        $element.addClass("animation-done");
        animationFinished = true;
      } else if (scrollTop < transitionFinish && animationFinished === true) {
        $element.removeClass("animation-done");
        animationFinished = false;
      }
      if (scrollTop > elOffTop && scrollTop < transitionFinish) {
        $element
          .find(".video-border.video-border-top")
          .css({ transform: "scale(1, " + percentageAnimNeg + ")" });
        $element
          .find(".video-border.video-border-bottom")
          .css({ transform: "scale(1, " + percentageAnimNeg + ")" });
        $element
          .find(".video-border.video-border-left")
          .css({ transform: "scale(" + percentageAnimNeg + ", 1)" });
        $element
          .find(".video-border.video-border-right")
          .css({ transform: "scale(" + percentageAnimNeg + ", 1)" });

        let _scrollResponsibleTop = mediaChecker('max', 1200) ? scrollTop * 1.5 : scrollTop;
        $(text).css({ transform: `translate(50%, -${_scrollResponsibleTop || 0}px)`});
      }
    });
  });


  gsap.to(
    '.letter',
    {
      y: "-200%",
      stagger: 0.1,
      duration: 1,
      ease: 'ease-in',
      scrollTrigger: {
        trigger: '.line',
        start: "top center"
      },
    }
  )

  function mediaActions() {
    windowWidth = parseInt($(window).width());
    borderWidth = parseInt($(".video-border-right").width());
    // text.css({ "max-width": `${windowWidth - (borderWidth * 2)}px` });

    
    $('.image img').each(function() {
      let image = this;
      image.onload = function() {
        if (mediaChecker('max', 700)) {
          $(image).closest('div').width(`${parseInt(this.naturalWidth) / 3.59}%`);
        } else if (mediaChecker('max', 768)) {
          $(image).closest('div').width(`${parseInt(this.naturalWidth) / 7.36}%`);
        } else {
          $(image).closest('div').width(`${parseInt(this.naturalWidth) / 18.88}%`);
        }
      }      
    })
  }
  function scrollAction() {

    $('._color').each(function() {
      let $object = $(this);
      let x       = $object[0].getBoundingClientRect().x;
      let y       = $object[0].getBoundingClientRect().y;

      let element_from_point = elementsFromPoint(x, y).find((el) => {
        return $(el).data("l");
      });
      if (element_from_point) {
        let l = element_from_point.dataset.l;
        if (l !== undefined) {
          if (l == 1) {
            if (element_from_point.tagName == "VIDEO") {
              if (
                !$(element_from_point)
                  .closest(".video-animation")
                  .hasClass("animation-done")
              ) {
                $object.removeClass("white");
              } else {
                $object.addClass("white");
              }
            } else {
              $object.addClass("white");
            }
          } else {
            $object.removeClass("white");
          }
        } else {
          $object.removeClass("white");
        }
      } else {
        $object.removeClass("white");
      }
    })




    // scroll btn
    let scrollBtnOffset = $('.scroll-btn').offset().top
    if ($(window).scrollTop() >= 200) {
      $('.scroll-btn').fadeIn();
    } else {
      $('.scroll-btn').fadeOut();
    }


  }
  function mediaChecker(max_min, resolution, width = "width") {
    return window.matchMedia(`(${max_min}-${width}: ${resolution}px)`).matches;
  }
  function elementsFromPoint(x, y) {
    var elements = [],
      previousPointerEvents = [],
      current,
      i,
      d;

    if (typeof document.elementsFromPoint === "function")
      return document.elementsFromPoint(x, y);
    if (typeof document.msElementsFromPoint === "function")
      return document.msElementsFromPoint(x, y);

    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while (
      (current = document.elementFromPoint(x, y)) &&
      elements.indexOf(current) === -1 &&
      current != null
    ) {
      // push the element and its current style
      elements.push(current);
      previousPointerEvents.push({
        value: current.style.getPropertyValue("pointer-events"),
        priority: current.style.getPropertyPriority("pointer-events"),
      });

      // add "pointer-events: none", to get to the underlying element
      current.style.setProperty("pointer-events", "none", "important");
    }

    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; (d = previousPointerEvents[--i]); ) {
      elements[i].style.setProperty(
        "pointer-events",
        d.value ? d.value : "",
        d.priority
      );
    }

    // return our results
    return elements;
  }
  // var Scrollbar = window.Scrollbar;

  // Scrollbar.init(document.querySelector('.scroll'));
});
