describe("CSS Slider", function(){
  describe("Initialization:", function(){

    beforeEach(function(){
      loadFixtures('example.html');
      $('.css-slider').cssSlider();
    });

    it("should add absolute position to each slide", function () {
      expect($('.css-slider .slide').css('position')).toBe('absolute');
    });
    
  });

  describe("Configurations:", function(){

    describe("start slide", function(){

      it("should be the default when not specified", function () {
        loadFixtures('example.html');
        $('.css-slider').cssSlider();
        expect($('.css-slider').data('CSSSlider').current).toEqual(0);
      });
      
      it("should be the specified slide when specified via data", function () {
        var startSlide = 2;
        loadFixtures('example.html');
        $('.css-slider').data('start', startSlide);
        $('.css-slider').cssSlider();
        expect($('.css-slider').data('CSSSlider').current).toEqual(startSlide);
      });
      
      it("should be the specified slide when specified via object", function () {
        var startSlide = 1;
        loadFixtures('example.html');
        $('.css-slider').cssSlider({
          start: startSlide
        });
        expect($('.css-slider').data('CSSSlider').current).toEqual(startSlide);
      });
      
    });
  });

  describe("CSS Classes:", function(){
    var slider;
    beforeEach(function(){
      loadFixtures('example.html');
      var sliderElem = $('.css-slider').cssSlider();
      slider = sliderElem.data('CSSSlider');
    });

    describe("first and last classes", function(){

      it("should have only one 'first' class", function(){
        expect($('.css-slider .slide.first').length).toBe(1);
      });

      it("should have only one 'last' class", function(){
        expect($('.css-slider .slide.last').length).toBe(1);
      });

      it("'first' class should be on the first slide", function(){
        expect(slider.elements.slides.first()).toHaveClass('first');
      });

      it("'last' class should be on the last slide", function(){
        expect(slider.elements.slides.last()).toHaveClass('last');
      });

    });

    describe("prev and next classes", function(){

      it("should have a 'prev' class before the current slide");

      it("should have a 'next' class after the current slide");

    });

    describe("active class", function(){

      it("should have an active class on only one slide", function(){
        expect($('.css-slider .slide.current').length).toBe(1);
      });

      it("should change the active class when navigating", function(){
        var current = slider.current;
        expect(slider.elements.slides.eq(current)).toHaveClass('current');

        // Navigate and store
        slider.goTo(current+1);
        var newCurrent = slider.current;

        expect(slider.elements.slides.eq(current)).not.toHaveClass('current');
        expect(slider.elements.slides.eq(newCurrent)).toHaveClass('current');
      });

    });
  });

  describe("Events:", function(){
    var slider, sliderElem;

    describe("built event", function(){
      it("should trigger an event when built", function(){

        loadFixtures('example.html');
        var sliderElem = $('.css-slider');
        spyOnEvent(sliderElem, 'slider:built');
        sliderElem.cssSlider();

        expect('slider:built').toHaveBeenTriggeredOn(sliderElem);
      });
    });

    describe("navigation events", function(){

      beforeEach(function(){
        loadFixtures('example.html');
        sliderElem = $('.css-slider').cssSlider();
        slider = sliderElem.data('CSSSlider');
        spyOnEvent(sliderElem, 'slider:before');
        spyOnEvent(sliderElem, 'slider:complete');
      });

      describe("after animating (before)", function(){
        it("should trigger a 'before' callback event", function(){
          slider.goTo(slider.current+1);
          expect('slider:before').toHaveBeenTriggeredOn(sliderElem);
        });
      });

      // This test uses a very strange test implementation.
      // The done argument in the beforeEach handles the pausing
      // of the tests being run. Once the pause is done, we can see
      // if the complete event fired.
      describe("after animating (complete)", function(){
        beforeEach(function(done){
          var waitFor = slider.options.speed + 50;
          slider.goTo(slider.current+1);
          setTimeout(function(){
            done();
          }, waitFor);
        });

        it("should trigger a 'complete' callback event", function(){
          expect('slider:complete').toHaveBeenTriggeredOn(sliderElem);
        });
      });
    });
  });

  describe("Navigation:", function(){
    var slider, sliderElem;

    beforeEach(function(){
      loadFixtures('example.html');
      sliderElem = $('.css-slider').cssSlider();
      slider = sliderElem.data('CSSSlider');
    });

    describe("when using 'goTo'", function(){
      it("should call slide()", function(){
        spyOn(slider, 'slide');
        slider.goTo(2);
        expect(slider.slide).toHaveBeenCalled();
      });
      it("should change the current slide property", function(){
        var previousSlide = slider.current;
        slider.goTo(2);
        var currentSlide = slider.current;
        expect(previousSlide).not.toEqual(currentSlide);
      });
    });

    describe("when using prev()/next()", function(){
      it("should not call slide()", function(){
        spyOn(slider, 'slide');

        slider.prev();
        expect(slider.slide).toHaveBeenCalled();

        slider.next();
        expect(slider.slide).toHaveBeenCalled();
      });
      it("should not change the current slide property", function(){
        var previousSlide, currentSlide;
        
        previousSlide = slider.current;
        slider.prev();
        currentSlide = slider.current;
        expect(previousSlide).not.toEqual(currentSlide);

        previousSlide = slider.current;
        slider.next();
        currentSlide = slider.current;
        expect(previousSlide).not.toEqual(currentSlide);
      });
    });

    describe("if slider is disabled", function(){
      beforeEach(function(){
        loadFixtures('example.html');
        sliderElem = $('.css-slider').cssSlider();
        slider = sliderElem.data('CSSSlider');
        slider.disabled = true;
      });
      describe("when using 'goTo'", function(){
        it("should not call slide()", function(){
          spyOn(slider, 'slide');
          slider.goTo(2);
          expect(slider.slide).not.toHaveBeenCalled();
        });
        it("should not change the current slide property", function(){
          var previousSlide = slider.current;
          slider.goTo(2);
          var currentSlide = slider.current;
          expect(previousSlide).toEqual(currentSlide);
        });
      });

      describe("when using prev()/next()", function(){
        it("should not call slide()", function(){
          spyOn(slider, 'slide');

          slider.prev();
          expect(slider.slide).not.toHaveBeenCalled();

          slider.next();
          expect(slider.slide).not.toHaveBeenCalled();
        });
        it("should not change the current slide property", function(){
          var previousSlide, currentSlide;
          
          previousSlide = slider.current;
          slider.prev();
          currentSlide = slider.current;
          expect(previousSlide).toEqual(currentSlide);

          previousSlide = slider.current;
          slider.next();
          currentSlide = slider.current;
          expect(previousSlide).toEqual(currentSlide);
        });
      });
    });

    describe("when autoPlay is enabled", function(){
      var sliderElem, slider;
      beforeEach(function(done){
        loadFixtures('example.html');
        sliderElem = $('.css-slider').cssSlider({
          autoPlay: true,
          autoPlayDelay: 150
        });
        slider = sliderElem.data('CSSSlider');
        var autoPlayDelay = slider.option('autoPlayDelay');
        
        setTimeout(function(){
          done();
        }, autoPlayDelay + 50);
      });

      it("should increment the starting slide by 1 after options.autoPlayDelay has elapsed", function(){
        expect(slider.option('start')).not.toEqual(slider.current);
      });
    });

  });
});