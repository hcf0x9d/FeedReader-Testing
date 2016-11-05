/* feedreader.js
 * Testing the feed reader.
 */
$(function() {

    // RSS Feed Model Tests
    describe('RSS Feeds', function() {

        // Check that the RSS feeds are defined and an empty array
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Check that all RSS feeds have a url and it is not empty
        it('have a url', function () {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(allFeeds[i].url).toMatch(/^(http|https):\/\//);
            }
        });

        // Check that the RSS feeds all have a name and it is not empty
        it('have a name', function () {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });

    });

    // DOM Tests
    describe('The Menu', function () {

        // Make sure we don't see the menu at load
        it('is hidden at DOM load', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Can we toggle the menu visibility?
        it('can be toggled with interaction', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    // Async tests
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Check that we can get the content
        it('should get the feed content', function (done) {
            expect(loadFeed).toBeDefined();
            done();
        });

        // Make sure we are returning feed links
        it('has more than one valid entry', function (done) {
            var entry = $('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', function () {

        var cache;
        beforeEach(function (done) {

            loadFeed(0, function (data) {
                cache = $('.feed').html();

                loadFeed(1, function () {
                    done();
                });
            });
        });

        it('should change its content', function (done) {
            var curr = $('.feed').html();

            expect(cache).not.toBe(curr);
            done();
        });

    });
}());
