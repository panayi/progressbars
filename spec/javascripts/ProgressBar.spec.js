describe('ProgressBar', function() {

  describe('noConflict', function() {
    beforeEach(function() { this.actual = window.ProgressBar; });
    afterEach(function()  { window.ProgressBar = this.actual; });

    it('replaces the original ProgressBar', function() {
      ProgressBar.noConflict();
      expect( window.ProgressBar.isOtherProgressBar ).toBe(true);
    });

    it('returns this version', function() {
      var ours = ProgressBar;
      expect( ours.noConflict() ).toBe( ours );
    });
  });

  describe('a new ProgressBar', function() {
    var $fixture, bar;

    beforeEach(function() {
      $fixture = $('<div />').appendTo('body');
      bar = new ProgressBar();
      bar.el.appendTo( $fixture );
    });

    afterEach(function() {
      $fixture.remove();
    });

    it('renders a progress bar', function() {
      expect( $fixture.find('.progress .bar').length ).toBe(1);
    });

    it("sets the bar's width on render", function() {
      var style = bar.el.find('.bar').attr('style');
      expect( style ).toMatch( /\bwidth:\s*0%;/ );
    });

    it("updates the bar's width", function() {
      bar.update(39);
      var style = bar.el.find('.bar').attr('style');
      expect( style ).toMatch( /\bwidth:\s*39%;/ );
    });

    it("accepts a status that is used as a class on the bar", function() {
      bar.status('warning');
      expect( bar.el.find('.bar').is('.bar-warning') ).toBe(true);
    });
  });

});
