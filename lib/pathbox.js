;(function ($, window, document, undefined) {
  var pluginName = "pathbox",
      defaults = {};

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options) ;
    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {
    var img_url = $(this.element).data("image");
    var box = this.element;

    if (typeof img_url != "undefined") {
      $(this.element).css({ "background": "url(" + $(this.element).data("image") + ") no-repeat scroll center center" });
      $(this.element).addClass("closed");
    }

    $(box).live('click', function(event) {
      var image = new Image();
      image.src = $(box).data("image");
      box.image = image;

      if ($(box).hasClass("closed")) {
        Plugin.open(box);
      } else {
        Plugin.close(box);
      }

      event.preventDefault();
    });
  };

  Plugin.open = function(box) {
    $(box).animate({ height: (box.image.height - 10) }, "slow", function() {
      $(box).children().fadeOut("fast");
      $(box).removeClass("closed");
      $(box).addClass("open");
    });
  };

  Plugin.close = function(box) {
    $(box).animate({ height: "50px" }, "slow", function() {
      $(box).children().fadeIn("fast");
      $(box).removeClass("open");
      $(box).addClass("closed");
    });
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  }
})(jQuery, window, document);
