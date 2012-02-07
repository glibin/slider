;(function($) {
    $.fn.extend({
        slider: function(options) {
            return this.each(function() {
                new $.Slider(this, options);
            });
        }
    });

    $.Slider = function(el, options) {
        options = $.extend({}, {
            'min' : 0,
            'max' : 100,
            'pos' : 0,
            'width' : 150,
            'coef': 1,

            change: function() {}
        }, options);

        var $el = $(el);
        var context = this;

        var pos = options.pos;

        var mouseDown = false;
        var offset = 0;
        var prev = 0;

        $el.html('<div class="slider"><div class="slider__bg">' +
                     '<div class="slider__slide">' +
                     '<span class="slider__number">500</span>' +
                     '</div>' +
                 '</div></div>');

        var $slider = $('.slider', $el);

        $slider.css({
            'width' : options.width
        });

        var $slide = $('.slider__slide', $el);
        var $sliderBg = $('.slider__bg', $el);
        var $slideNumber = $('.slider__number', $slide);

        var sliderWidth = $slide.width();

        $slide.mousedown(function(e) {
            mouseDown = true;
            offset = 0;
            prev = e.pageX;
            e.stopPropagation();
        }).mouseup(function() {
            mouseDown = false;
            options.change(parseInt(pos));
        });

        function render() {
            $slide.css({
                'left' : (pos / (options.max - options.min)) * options.width - sliderWidth/2
            });

            $slideNumber.html(parseInt(pos));

            $slideNumber.css({
                'left' : ($slide.width() - $slideNumber.width()) / 2
            });
        }

        function step() {
            pos += (offset / options.width) * (options.max - options.min) * options.coef;
            offset = 0;

            if (pos <= options.min) pos = options.min;
            else if (pos >= options.max) pos = options.max;

            render();
        }

        $sliderBg.mousedown(function(e) {
            pos = (e.offsetX / options.width) * (options.max - options.min);
            render();
            options.change(parseInt(pos));
            offset = 0;
            prev = e.pageX;
            mouseDown = true;
        });

        $(window).mousemove(function(e) {
            if (mouseDown) {
                offset += e.pageX - prev;
                prev = e.pageX;
                step();
            }
        }).mouseup(function() {
            if (mouseDown) {
                mouseDown = false;
                options.change(parseInt(pos));
            }
        });

        render();
    };

})(jQuery);