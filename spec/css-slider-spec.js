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
        var spyOnBuilt = spyOnEvent(sliderElem, 'slider:built');
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

      describe("after animating", function(){

        it("should trigger a 'before' callback event", function(){
          slider.goTo(slider.current+1);
          expect('slider:before').toHaveBeenTriggeredOn(sliderElem);
        });

        it("should trigger a 'complete' callback event", function(){
          slider.goTo(slider.current+1);

          // wait for the slide to transition
          setTimeout(function(){
            expect('slider:complete').toHaveBeenTriggeredOn(sliderElem);
          }, slider.options.speed);
        });
      });
    });
  });
});