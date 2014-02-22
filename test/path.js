var path = require('store-path'),
    Store = require('store'),
    assert = require('assert');

describe("Path middleware", function() {
  var store = null;
  beforeEach(function() {
    store = new Store({
      country : {
        france: 'paris',
        canada : 'edmonton'
      }
    });
    store.use(path);
  });
  
  describe("API", function() {
    it("should have path handler", function() {
      assert.equal(typeof store.path, 'function');
    });

    it("should have change handler", function() {
      assert.equal(typeof store.change, 'function');      
    });
  });

  describe("Getter", function() {
    it('should get store value from path', function() {
      assert.equal(store.path('country.canada'), 'edmonton');
    });
  });
  
  describe("Setter", function() {
    it('should set store value from path', function() {
      store.path('country.canada.city', 'calgary');
      store.path('country.france', 'strasbourg');

      var country = store.get('country');
      assert.equal(country.canada.city, 'calgary');
      assert.equal(country.france, 'strasbourg');
    });
  });
  
  
});
