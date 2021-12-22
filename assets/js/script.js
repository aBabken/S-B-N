$(document).ready(function () {
  function refreshPage() {
    let text = $(".video-animation").find(".text-block")

    var defaultOptions = {
      container: document.body,
      panelSelector: "*[data-section]",
      directionThreshold: 50,
      delay: 0,
      duration: 1000,
      easing: "ease",
    };

    let panel = new PanelSnap(defaultOptions);
    $(".scroll-btn").click(function (e) {
      e.preventDefault();
      let next = $(panel.activePanel).data("section") + 1;
      let pane = panel.panelList.find((el) => $(el).data("section") == next);
      let p = pane;
      panel.snapToPanel(p);
    });
    window.onscroll = function () {
      scrollAction();
    };
    window.onresize = function () {
      mediaActions();
    };

    let sliderMain = $(".slider-block").not('.slick-initialized').slick({
      draggable: false,
      infinite: false,
      speed: 0,
      arrows: false,
      swipe: false,
    });

    function sliderContentReveal(active = null) {
      gsap.to(`.slick-active .image-wrap`, {
        scaleX: active ? 1 : 0,
        duration: 0.5,
        ease: Power4.easeInOut,
      });

      gsap.to(".slider-subtitle, .slider-title", {
        opacity: active ? 0 : 1,
        duration: 0.5,
        ease: Power4.easeInOut,
      });
    }

    $(".arrow-next").click(function () {
      sliderContentReveal(1);
      setTimeout(function () {
        sliderMain.slick("slickNext");
      }, 500);
    });
    $(".arrow-prev").click(function () {
      sliderContentReveal(1);
      setTimeout(function () {
        sliderMain.slick("slickPrev");
      }, 500);
    });
    sliderMain.on(
      "afterChange",
      function (event, slick, currentSlide, nextSlide) {
        $(".slider-arrow").removeClass("disabled");
        if ($("[data-slick-index='0'").hasClass("slick-active")) {
          $(".arrow-prev").addClass("disabled");
        }
        if (
          $(`[data-slick-index='${slick.slideCount - 1}'`).hasClass(
            "slick-active"
          )
        ) {
          $(".arrow-next").addClass("disabled");
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
        $(".video-animation").click(function () {
          if (
            $(this).hasClass("animation-done") &&
            !$element.find("video").get(0).paused
          ) {
            $element.find("video").get(0).pause();
            $(this).find("img").fadeIn();
          } else if (
            $(this).hasClass("animation-done") &&
            $element.find("video").get(0).paused
          ) {
            $element.find("video").get(0).play();
            $(this).find("img").fadeOut();
          }
        });
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
            $element.find("img").fadeOut();
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

          let _scrollResponsibleTop = mediaChecker("max", 1200)
            ? scrollTop * 1.5
            : scrollTop;
          $(text).css({
            transform: `translate(50%, -${_scrollResponsibleTop || 0}px)`,
          });
        }
      });
    });

    
    $(".video-animation_default").each(function () {
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
        $(".video-animation_default").click(function () {
          if (
            $(this).hasClass("animation-done") &&
            !$element.find("video").get(0).paused
          ) {
            $element.find("video").get(0).pause();
            $(this).find("img").fadeIn();
          } else if (
            $(this).hasClass("animation-done") &&
            $element.find("video").get(0).paused
          ) {
            $element.find("video").get(0).play();
            $(this).find("img").fadeOut();
          }
        });
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
            $element.find("img").fadeOut();
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
            .find(".video-border_def.video-border-top")
            .css({ transform: "scale(1, " + percentageAnimNeg + ")" });
          $element
            .find(".video-border_def.video-border-bottom")
            .css({ transform: "scale(1, " + percentageAnimNeg + ")" });
          $element
            .find(".video-border_def.video-border-left")
            .css({ transform: "scale(" + percentageAnimNeg + ", 1)" });
          $element
            .find(".video-border_def.video-border-right")
            .css({ transform: "scale(" + percentageAnimNeg + ", 1)" });

          let _scrollResponsibleTop = mediaChecker("max", 1200)
            ? scrollTop * 1.5
            : scrollTop;
          $(text).css({
            transform: `translate(50%, -${_scrollResponsibleTop || 0}px)`,
          });
        }
      });
    });

    function changeActiveTab(
      _this,
      selectorTabWrap,
      selectorTabContent,
      selectorTabContentText,
      selectorTabLink,
      classLinkActive
    ) {
      _this
        .closest(selectorTabWrap)
        .querySelectorAll(selectorTabLink)
        .forEach((element) => {
          element.classList.remove(classLinkActive);
        });

      _this.classList.add(classLinkActive);

      const indexTab = [..._this.parentElement.children].indexOf(_this);
      const newActiveTabContent = _this
        .closest(selectorTabWrap)
        .querySelectorAll(selectorTabContent)[indexTab];
      const newActiveTabContentText = _this
        .closest(selectorTabWrap)
        .querySelectorAll(selectorTabContentText)[indexTab];
      _this
        .closest(selectorTabWrap)
        .querySelectorAll(selectorTabContent)
        .forEach((element) => {
          element.classList.add("hidden-block");
        });

      _this
        .closest(selectorTabWrap)
        .querySelectorAll(selectorTabContentText)
        .forEach((element) => {
          element.classList.add("hidden-block");
        });

      newActiveTabContent.classList.remove("hidden-block");
      newActiveTabContentText.classList.remove("hidden-block");
    }
    // trigger for comments
    document.querySelectorAll(".tab").forEach((element) => {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        let _this = this;
        changeActiveTab(
          _this,
          ".section-trigger--wrapper",
          ".trigger-block",
          ".trigger-block-text",
          ".tab",
          "active"
        );

        return false;
      });
    });

    document.querySelectorAll(".line").forEach((element) => {
      let duration = $(element).data("duration")
        ? $(element).data("duration")
        : 1;
      let letter = $(element).find(".letter");
      gsap.to(letter, {
        y: "-200%",
        stagger: 0.1,
        duration: duration,
        ease: "ease-in",
        scrollTrigger: {
          trigger: element,
          start: "top center",
        },
      });
    });
    
    document.querySelectorAll(".text-reveal").forEach((element) => {
      let duration = $(element).data("duration")
        ? $(element).data("duration")
        : 0.5;
      let delay = $(element).data("delay")
      ? $(element).data("delay")
      : 0.1;
      let target = $(element).find("span");
      gsap.to(target, {
        y: "0",
        stagger: 0.1,
        duration: duration,
        delay: delay,
        ease: "ease-in",
        scrollTrigger: {
          trigger: element,
          start: "top center",
        },
      });
    });
    

    gsap.fromTo(
      "[data-reveal_b]",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: Power4.easeInOut,
        scrollTrigger: {
          trigger: "[data-reveal_b]",
          start: "center bottom",
        },
      }
    );
    gsap.fromTo(
      "[data-stack]",
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.2,
        duration: 0.3,
        delay: 0.1,
        ease: SteppedEase.config(3),
        scrollTrigger: {
          trigger: "[data-stack]",
          start: "center center",
        },
      }
    );

    gsap.to(".slick-active .image-wrap", {
      scaleX: 0,
      duration: 1,
      ease: Power4.easeInOut,
      scrollTrigger: {
        trigger: ".slider-section",
        start: "top center",
      },
    });

    gsap.fromTo(
      ".opac",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.4,
        ease: Power4.easeInOut,
        scrollTrigger: {
          trigger: ".opac",
          start: "top center",
        },
      }
    );
    $(".images-block--inner .row").each(function () {
      gsap.to(this, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: Power4.easeInOut,
        scrollTrigger: {
          trigger: this,
          start: "center bottom",
        },
      });
    });


    galleryAction();

    $('.trigger-btn').click(function() {
      $(this).toggleClass('active');
      $(this).closest('.trigger-section').find('.trigger-content').slideToggle();
      galleryAction();
    })



    let hngSlider = $(".hng-slider");
    let initialCount = hngSlider.find(".hng-slider--item").length;
    let status = $(".slider-scroll span");
    hngSlider.on(
      "beforeChange init reInit afterChange",
      function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;  
        status.text(i + "/" + initialCount);
      }
    );
  
    hngSlider.slick({
      slidesToShow: 1,
      arrows: false,
      dots: false,
      infinite: false,
      touchThreshold: 200,
      responsive: [
        {
          breakpoint: 3000,
          settings: "unslick",
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });



    function mediaActions() {
      windowWidth = parseInt($(window).width());
      borderWidth = parseInt($(".video-border-right").width());
      if (mediaChecker('max', 425)) {
        hngSlider[0]?.slick?.refresh();
      }

      galleryAction()
      

      
    }
    function scrollAction() {
      $("._color").each(function () {
        let $object = $(this);
        let x = $object[0].getBoundingClientRect().x;
        let y = $object[0].getBoundingClientRect().y;

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
      });

      // scroll btn
      if (
        $(window).scrollTop() >= 200 &&
        $(window).scrollTop() + $(window).height() + 100 < $(document).height()
      ) {
        $(".scroll-btn").fadeIn();
      } else {
        $(".scroll-btn").fadeOut();
      }

      // console.log($('#firstLottie')[0]._lottie.wrapper)
    }
    function mediaChecker(max_min, resolution, width = "width") {
      return window.matchMedia(
        `(${max_min}-${width}: ${resolution}px)`
      ).matches;
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
      for (
        i = previousPointerEvents.length;
        (d = previousPointerEvents[--i]);

      ) {
        elements[i].style.setProperty(
          "pointer-events",
          d.value ? d.value : "",
          d.priority
        );
      }

      // return our results
      return elements;
    }
    function galleryAction() {
      
      var imgs = document.querySelectorAll('.image img'),
      len = imgs.length,
      counter = 0;

      [].forEach.call( imgs, function( img ) {
          if(img.complete)
            incrementCounter();
          else
            img.addEventListener( 'load', incrementCounter, false );
      } );

      function incrementCounter() {
          counter++;
          if ( counter === len ) {
                   
          $(".image img").each(function () {
            let image = this;
              if (mediaChecker("max", 700)) {
                $(image)
                  .closest("div")
                  .width(`${parseInt(image.naturalWidth) / 3.59}%`);
              } else if (mediaChecker("max", 768)) {
                $(image)
                  .closest("div")
                  .width(`${parseInt(image.naturalWidth) / 7.36}%`);
              } else {
                $(image)
                  .closest("div")
                  .width(`${parseInt(image.naturalWidth) / 18.88}%`);
              }              
              $(image).closest("div").height($(image).height());
          });
          }
      }

      $('.gt-mob-mt').each(function() {
        if (mediaChecker('max', 700)) {
          $(this).css('margin-top', `-${$(this).height()}px`)
        } else {
          $(this).css('margin-top', `0`)
        }
        
      })
      $('.gt-tab-mr').each(function() {
        if (mediaChecker('max', 700)) {
          $(this).css('margin-left', `13.42%`);

        } else if (mediaChecker('max', 768)) {
          $(this).css('margin-left', `${$(this).prev().width() + 10}px`);
        } else {
          $(this).css('margin-left', `0`);
        }
        
      })
    }
    scrollAction();
    mediaActions();
  }
  
  refreshPage();
  // const swup = new Swup();
  // swup.on("contentReplaced", function () {
  //   setTimeout(function(){
  //     window.scrollTo(0, 0);
  //   }, 200)
  //   refreshPage();
  // });
});
