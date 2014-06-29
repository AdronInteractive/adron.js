describe('core', function() {
    it('should exist', function() {
        expect(adron).toBeDefined();
    });

    describe('export', function() {
        it('should exist', function() {
            expect(adron.export).toEqual(jasmine.any(Function));
        });

        it('should add to window.adron', function() {
            expect(adron.Foobar).not.toBeDefined();
            var foobar = {
                foo: 'bar'
            };

            adron.export('Foobar', foobar);

            expect(adron.Foobar).toBe(foobar);
            delete adron.Foobar;
        });

        it('should be exported to module.exports', function() {
            expect(typeof module).toBe('undefined');
            window.module = { exports: {} };
            var foobar = {
                foo: 'bar'
            };

            adron.export('Foobar', foobar);

            expect(module.exports).toBe(foobar);
            delete window.module;
        });
    });
});