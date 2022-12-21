(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['user.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "  <a href=\"javascript:;\" data-router=\"write\" class=\"blog-head--avatar\">\r\n    <img src=\"./public/img/avator.jpg\" alt=\"!\" />\r\n    <i class=\"blog-head--write glyphicon glyphicon-pencil\"></i>\r\n  </a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <a href=\"javascript:;\" class=\"blog-btn--login\" data-modal=\"login\">登录</a>\r\n  /\r\n  <a\r\n    href=\"javascript:;\"\r\n    class=\"blog-btn--register\"\r\n    data-modal=\"register\"\r\n  >注册</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isLogin") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":14,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();