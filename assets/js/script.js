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
    directionThreshold: 100,
    delay: 0,
    duration: 800,
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





  function mediaActions() {
    windowWidth = parseInt($(window).width());
    borderWidth = parseInt($(".video-border-right").width());
    // text.css({ "max-width": `${windowWidth - (borderWidth * 2)}px` });
  }
  function scrollAction() {


    // header change colors
    let lo = header.offset();
    let y = lo.top - window.scrollY + header.height() / 2;
    let x = lo.left + logo.width() / 2;
    // header.addClass("sink");
    // let element_from_point = elementsFromPoint(x, y).find((el) => {
    //   return $(el).data("l");
    // });
    // console.log(element_from_point);
    // header.removeClass("sink");

    // if (element_from_point) {
    //   let l = element_from_point.dataset.l;
    //   if (l !== undefined) {
    //     if (l == 1) {
    //       if (element_from_point.tagName == "VIDEO") {
    //         if (
    //           !$(element_from_point)
    //             .closest(".video-animation")
    //             .hasClass("animation-done")
    //         ) {
    //           logo.removeClass("white");
    //           menu.removeClass("white");
    //         } else {
    //           logo.addClass("white");
    //           menu.addClass("white");
    //         }
    //       } else {
    //         logo.addClass("white");
    //         menu.addClass("white");
    //       }
    //     } else {
    //       logo.removeClass("white");
    //       menu.removeClass("white");
    //     }
    //   } else {
    //     logo.removeClass("white");
    //     menu.removeClass("white");
    //   }
    // } else {
    //   logo.removeClass("white");
    //   menu.removeClass("white");
    // }




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
    console.log($(window).scrollTop())
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
});
