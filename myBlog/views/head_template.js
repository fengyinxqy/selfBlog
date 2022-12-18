(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['head.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <li><a href=\"#\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a></li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"blog-head\">\r\n  <h1 class=\"blog-head--logo\">\r\n    <a href=\"#\">\r\n      <img src=\"./public/images/logo.jpg\" alt=\"logo!\" />\r\n    </a>\r\n  </h1>\r\n  <nav class=\"blog-head--nav hidden-sm hidden-xs\">\r\n    <ul class=\"blog-nav--list\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"navlist") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":6},"end":{"line":11,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\r\n  </nav>\r\n  <div class=\"blog-head--search hidden-sm hidden-xs\">\r\n    <input class=\"blog-input--search\" placeholder=\"文章检索\" type=\"text\" />\r\n    <i class=\"glyphicon glyphicon-search\"></i>\r\n  </div>\r\n  <div class=\"blog-head--login hidden-sm hidden-xs\">\r\n    <a class=\"blog-btn--login\">登录</a>\r\n    /\r\n    <a class=\"blog-btn--register\">注册</a>\r\n  </div>\r\n  <i class=\"blog-head-menu glyphicon glyphicon-list visible-sm visible-xs\"></i>\r\n</header>";
},"useData":true});
})();