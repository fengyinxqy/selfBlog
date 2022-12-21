(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"form-group blog-modal--group\">\r\n        <label class=\"col-sm-2 control-label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":12,"column":46},"end":{"line":12,"column":55}}}) : helper)))
    + "</label>\r\n        <div class=\"col-sm-10 \" data-error-name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"query") || (depth0 != null ? lookupProperty(depth0,"query") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"query","hash":{},"data":data,"loc":{"start":{"line":13,"column":49},"end":{"line":13,"column":58}}}) : helper)))
    + "\" data-msg=\"\">\r\n          <input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":14,"column":23},"end":{"line":14,"column":31}}}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"query") || (depth0 != null ? lookupProperty(depth0,"query") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"query","hash":{},"data":data,"loc":{"start":{"line":14,"column":39},"end":{"line":14,"column":48}}}) : helper)))
    + "\" data-input-query=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"query") || (depth0 != null ? lookupProperty(depth0,"query") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"query","hash":{},"data":data,"loc":{"start":{"line":14,"column":68},"end":{"line":14,"column":77}}}) : helper)))
    + "\" class=\"form-control\"\r\n            placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":15,"column":25},"end":{"line":15,"column":40}}}) : helper)))
    + "\">\r\n        </div>\r\n      </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <button type=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isSubmit") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":22,"column":20},"end":{"line":22,"column":63}}})) != null ? stack1 : "")
    + "\" class=\"btn btn-default\"\r\n        data-btn-target=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"targetName") || (depth0 != null ? lookupProperty(depth0,"targetName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"targetName","hash":{},"data":data,"loc":{"start":{"line":23,"column":25},"end":{"line":23,"column":39}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":23,"column":41},"end":{"line":23,"column":49}}}) : helper)))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "submit";
},"6":function(container,depth0,helpers,partials,data) {
    return "button";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"blog-modal--wrap\">\r\n  <div class=\"blog-modal--head\">\r\n    <h4 class=\"blog-modal--title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":43}}}) : helper)))
    + "</h4>\r\n    <button type=\"button\" class=\"close blog-modal--close\" data-btn-target=\"close\"><span aria-hidden=\"true\"\r\n        data-btn-target=\"close\">&times;</span></button>\r\n  </div>\r\n  <form id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"formType") || (depth0 != null ? lookupProperty(depth0,"formType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formType","hash":{},"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":7,"column":24}}}) : helper)))
    + "\" action=\"javascript:;\" class=\"form-horizontal\">\r\n    <div class=\"blog-modal--content\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"formData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":18,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"blog-modal--foot\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"btns") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":6},"end":{"line":24,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n  </form>\r\n</div>";
},"useData":true});
})();