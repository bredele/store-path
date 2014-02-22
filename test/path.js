var path = require('store-path'),
    Store = require('store'),
    assert = require('assert');

describe("Path middleware", function() {
  var store = null;
  beforeEach(function() {
    store = new Store({
      country : {
        canada : 'awesome'
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
      assert.equal(store.path('country.canada'), 'awesome');
    });
  });
  
  describe("Setter", function() {
    it('should set store value from path', function() {
      store.path('country.canada', 'amazing');
      assert.equal(store.get('country').canada, 'amazing');
    });
  });
  
  
});
