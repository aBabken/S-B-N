$(document).ready(function() {





    window.onscroll = function() {
        scrollAction();
    }

    scrollAction();

    function scrollAction() {
        let logo    = $('.header-logo'),
            menu    = $('.header-menu'),
            header  = $('.header-wrapper');
        
        let lo = header.offset();
        let x = lo.top - window.scrollY + header.height() / 2;
        let y = lo.left + header.width() / 2;
        header.addClass('sink');
        let element_bellow_link = document.elementFromPoint(x, y);
        header.removeClass('sink');
        if (element_bellow_link) {
            let l = element_bellow_link.dataset.l;
            if (l !== undefined) {
                logo.addClass('white');
                menu.addClass('white');
            
            } else {                
                logo.removeClass('white');
                menu.removeClass('white');
            }
        }
        
    }


    $('.video-animation').each(function() {
        var caseTriggered = false;
        var animationFinished = false;
        var $element = $(this);
        var controlVideo = true; 
        var text = $element.find('h1');
        var borderWidth = parseInt($('.video-border-right').width());
        var windowWidth = parseInt($(window).width());
  
        text.css({'max-width': `${windowWidth - borderWidth * 2}px`})

        if (controlVideo) {
          var promise = $element.find('video').get(0).play();
          if (promise !== undefined) {
            promise.then(function() {
              $element.find('video').get(0).pause();
            }).catch(function(error) {
              console.error(error);
            });
          }
        }
  
        $(window).scroll(function() {
  
          var scrollTop = $(window).scrollTop();
          var elOffTop = $element.offset().top;
          var transitionFinish = elOffTop + 250;
          var percentageAnim = ((scrollTop - elOffTop) * 1) / (transitionFinish - elOffTop);
          var percentageAnimNeg = 1 - percentageAnim;
            
          
          if(scrollTop > elOffTop && caseTriggered === false) {
            $element.addClass('grow');
            if (controlVideo) {
              $element.find('video').get(0).play();
            }
            caseTriggered = true;
          }
          else if (scrollTop == 0 && caseTriggered === true) {
            $element.removeClass('grow');
            if (controlVideo) {
              $element.find('video').get(0).pause();
            }
            caseTriggered = false;
          }
          if(scrollTop > transitionFinish && animationFinished === false) {
            $element.addClass('animation-done');
            animationFinished = true;
          }
          else if (scrollTop < transitionFinish && animationFinished === true) {
            $element.removeClass('animation-done');
            animationFinished = false;
          }
          if (scrollTop > elOffTop && scrollTop < transitionFinish) {
            $element.find('.video-border.video-border-top').css({'transform': 'scale(1, ' + percentageAnimNeg + ')'});
            $element.find('.video-border.video-border-bottom').css({'transform': 'scale(1, ' + percentageAnimNeg + ')'});
            $element.find('.video-border.video-border-left').css({'transform': 'scale(' + percentageAnimNeg + ', 1)'});
            $element.find('.video-border.video-border-right').css({'transform': 'scale(' + percentageAnimNeg + ', 1)'});
            console.log(text)
            $(text).css({'transform': `translate(50%, -${scrollTop}px)`})
          }
  
        });
      });

})