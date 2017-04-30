 /*global jQuery */
/*!
 * jQuery Scrollbox
 * (c) 2009-2013 Hunter Wu <hunter.wu@gmail.com>
 * MIT Licensed.
 *
 * http://github.com/wmh/jquery-scrollbox   // MODIFIED FOR TRAILS MTU
 */

(function($) {

$.fn.trailbox = function(config) {
  //default config
  var defConfig = {
    linear: false,          // Scroll method
    startDelay: 2,          // Start delay (in seconds)
    delay: 3,               // Delay after each scroll event (in seconds)
    step: 5,                // Distance of each single step (in pixels)
    speed: 32,              // Delay after each single step (in milliseconds)
    switchItems: 1,         // Items to switch after each scroll event
    direction: 'vertical',
    distance: 'auto',
    autoPlay: true,
    onMouseOverPause: true,
    paused: false,
    queue: null,
    listElement: 'ul',
    listItemElement:'li'
  };
  config = $.extend(defConfig, config);
  config.scrollOffset = config.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
  if (config.queue) {
    config.queue = $('#' + config.queue);
  }

  return this.each(function() {
    var container = $(this),
        containerUL,
        scrollingId = null,
        nextScrollId = null,
        paused = false,
        backward,
        forward,
        resetClock,
        scrollForward,
        scrollBackward,
        forwardHover,
        pauseHover,
        lasto,
        lastd,
        lastt,
        coffset = 0;

    if (config.onMouseOverPause) {
      container.bind('mouseover', function() { paused = true; });
      container.bind('mouseout', function() { paused = false; });
    }
    containerUL = container.children(config.listElement + ':first-child');

    scrollForward = function() {
      if (paused) {
        console.log("paused");
        return;
      }
      var curLi,
          i,
          newScrollOffset,
          scrollDistance,
          theStep;

      curLi = containerUL.children(config.listItemElement + ':first-child');

      scrollDistance = config.distance !== 'auto' ? config.distance :
        config.direction === 'vertical' ? curLi.outerHeight(true) : curLi.outerWidth(true);
          console.log("scrollForward 1");

      console.log($.trim(curLi.text()));
      console.log("cheight: "+curLi.height());
      // offset
      
      
        
      theStep = Math.max(3, parseInt((scrollDistance - container[0][config.scrollOffset]) * 0.3, 10));
      newScrollOffset = Math.min(container[0][config.scrollOffset] + theStep, scrollDistance);
      //newScrollOffset = Math.min(coffset + theStep, scrollDistance);
      
      
      console.log("newScrollOffset: " + newScrollOffset);
      console.log(container[0]);
      console.log("container[0][config.scrollOffset]: " + container[0][config.scrollOffset]); // this setting somehow sets scrollTop of container?
      console.log("theStep: " + theStep);
      console.log("scrollDistance: " + scrollDistance);
      
      if (lasto == newScrollOffset) {
     //   newScrollOffset = newScrollOffset + 5;
      }

      var visheight = container.height();
      //console.log("visheight: " + visheight);
/*
      var t = 0;
      var tot = 0;
      var lastitemheight = 0;
      var godist = 0;
      container.find("li").each(function() {
        t++;
        tot += $(this).height();
        if (tot > visheight) {
          console.log("outty");
          console.log(tot - visheight);
          console.log($(this).text());
          godist = tot - visheight;
          lastitemheight = $(this).height();
          return;
        }
      });
      console.log("lastitemheight");
      console.log(lastitemheight);

*/
      // find the hieght of the element hanging off the page
      container[0][config.scrollOffset] = newScrollOffset;

      console.log("newScrollOffset: " + newScrollOffset);

     // coffset = newScrollOffset;

      var nomovement = (lasto == newScrollOffset && lastd == scrollDistance && lastt == curLi.text());
      console.log("scrollForward: " + newScrollOffset + " " + scrollDistance + " " + (newScrollOffset >= scrollDistance) + " " + nomovement);
     
      nomovement = false;

      //if (newScrollOffset >= scrollDistance || true) {
      if (newScrollOffset >= scrollDistance || nomovement) {     // flip items... ?   
        console.log("greater");
        for (i = 0; i < config.switchItems; i++) {
          if (config.queue && config.queue.find(config.listItemElement).length > 0) {
            containerUL.append(config.queue.find(config.listItemElement)[0]);
            containerUL.children(config.listItemElement + ':first-child').remove();
          } else {
            containerUL.append(containerUL.children(config.listItemElement + ':first-child'));
          }
        }
        container[0][config.scrollOffset] = 0;
        clearInterval(scrollingId);
        if (config.autoPlay) {
          nextScrollId = setTimeout(forward, config.delay * 1000);
        }
      }

      lasto = newScrollOffset;
      lastd = scrollDistance;
      lastt = curLi.text();


    };

    // Backward
    // 1. If forwarding, then reverse
    // 2. If stoping, then backward once
    scrollBackward = function() {
      if (paused) {
        console.log("paused");
        return;
      }
      var curLi,
          i,
          liLen,
          newScrollOffset,
          scrollDistance,
          theStep;

          console.log("backinit");
      // init
      if (container[0][config.scrollOffset] === 0) {
        liLen = containerUL.children(config.listItemElement).length;
        for (i = 0; i < config.switchItems; i++) {
          containerUL.children(config.listItemElement + ':last-child').insertBefore(containerUL.children(config.listItemElement+':first-child'));
        }

        curLi = containerUL.children(config.listItemElement + ':first-child');
        scrollDistance = config.distance !== 'auto' ?
            config.distance :
            config.direction === 'vertical' ? curLi.height() : curLi.width();
        container[0][config.scrollOffset] = scrollDistance;
      }

      // new offset
      if (!config.linear) {
        theStep = Math.max(3, parseInt(container[0][config.scrollOffset] * 0.3, 10));
        newScrollOffset = Math.max(container[0][config.scrollOffset] - theStep, 0);
      } else {
        newScrollOffset = Math.max(container[0][config.scrollOffset] - config.step, 0);
      }
      container[0][config.scrollOffset] = newScrollOffset;

      if (newScrollOffset === 0) {
        clearInterval(scrollingId);
        if (config.autoPlay) {
          nextScrollId = setTimeout(forward, config.delay * 1000);
        }
      }
    };

    forward = function() {
      clearInterval(scrollingId);
      scrollingId = setInterval(scrollForward, config.speed);
    };

    // Implements mouseover function.
    forwardHover = function() {
        config.autoPlay = true;
        paused = false;
        clearInterval(scrollingId);
        scrollingId = setInterval(scrollForward, config.speed);
    };
    pauseHover = function() {
        paused = true;
    };

    backward = function() {
      clearInterval(scrollingId);
      scrollingId = setInterval(scrollBackward, config.speed);
    };

    resetClock = function(delay) {
      config.delay = delay || config.delay;
      clearTimeout(nextScrollId);
      if (config.autoPlay) {
        nextScrollId = setTimeout(forward, config.delay * 1000);
      }
    };

    if (config.autoPlay) {
      nextScrollId = setTimeout(forward, config.startDelay * 1000);
    }

    // bind events for container
    container.bind('resetClock', function(delay) { resetClock(delay); });
    container.bind('forward', function() { clearTimeout(nextScrollId); forward(); });
    container.bind('pauseHover', function() { pauseHover(); });
    container.bind('forwardHover', function() { forwardHover(); });
    container.bind('backward', function() { clearTimeout(nextScrollId); backward(); });
    container.bind('speedUp', function(speed) {
      if (typeof speed === 'undefined') {
        speed = Math.max(1, parseInt(config.speed / 2, 10));
      }
      config.speed = speed;
    });
    
    container.bind('speedDown', function(speed) {
      if (typeof speed === 'undefined') {
        speed = config.speed * 2;
      }
      config.speed = speed;
    });

    container.bind('updateConfig', function (event,options) {
        config = $.extend(config, options);
    });

  });
};

}(jQuery));
