describe( "CSS Slider", function () {
  it("throws an error when X happens", function () {

  });
  describe( "setup actions", function () {
    it("should add absolute position to each slide", function () {
      // Load a sample slider.
      loadFixtures('example.html');

      // Test for absolute position applied.
      expect($('.css-slider .slide').css('position')).toBe('absolute');
    });
    it("adds dimensions to the slider", function () {

    });
  });
});