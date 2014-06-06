describe("CSS Slider", function(){
  describe("Initialization", function(){

    beforeEach(function(){
      loadFixtures('example.html');
      $('.css-slider').cssSlider();
    });

    it("should add absolute position to each slide", function () {
      expect($('.css-slider .slide').css('position')).toBe('absolute');
    });
    
  });

  describe("Configurations", function(){

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

  describe("CSS Classes", function(){

    describe("first and last classes", function(){
      var slider;
      beforeEach(function(){
        loadFixtures('example.html');
        var sliderElem = $('.css-slider').cssSlider();
        slider = sliderElem.data('CSSSlider');
      });

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

      var slider;
      beforeEach(function(){
        loadFixtures('example.html');
        var sliderElem = $('.css-slider').cssSlider();
        slider = sliderElem.data('CSSSlider');
      });

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
});