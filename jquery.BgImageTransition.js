jQuery.extend({
    BgImageTransitions: []
});

jQuery.fn.extend({
    BgImageTransition: function(src, options) {
        if( !src ){ return jQuery; }

        //copy css from the element to the helper element function
        function copyCSS( from, to ){
            jQuery(['border-bottom-color', 'border-bottom-style', 'border-bottom-width', 'border-left-lolor',
            'border-left-style', 'border-left-width', 'border-right-color', 'border-right-style',
            'border-right-width', 'border-spacing', 'border-top-color', 'border-top-style',
            'border-top-width', 'bottom', 'height', 'left', 'margin-bottom', 'margin-left',
            'margin-right', 'margin-top', 'marker-offset', 'max-height', 'max-width', 'min-height',
            'min-width', 'opacity', 'outline-color', 'outline-offset', 'outline-width',
            'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'position', 'right',
            'top', 'width', 'z-index']).each( function(i,v){
                jQuery(to).css( v, jQuery(from).css( v ) );
            });
        }

        //make sure there is a zIndex set - we will the helperElement to be *above* the original one
        if( !this.css('zIndex') ){
            this.css('zIndex',1);
        }

        //default plugin settings
        var settings = jQuery.extend({
            effect: {opacity: 'toggle'},
            duration: 'slow',
            easing: 'linear',
            callback: function(){},
            helperElementId: this.attr('id')+'2',
            zindex: parseInt(this.css('zIndex'),10)+1
        }, options);

        //check the bgImageTransition array and see whether there is already a helperElement for the original one. Generate one, if not
        var helperElement = null;
        if( !jQuery.BgImageTransitions[this.attr('id')] ){
            helperElement = this.clone();
            copyCSS( this, helperElement );
            helperElement.css('zIndex', settings.zindex);
            helperElement.css('display', 'none');
            helperElement.attr('id', settings.helperElementId );
            helperElement.insertAfter(this);
            jQuery.BgImageTransitions[this.attr('id')] = helperElement;
        }
        else{
            helperElement = jQuery.BgImageTransitions[this.attr('id')];
        }

        //load the image file into cache first, so that we get a nice and fast load. Make the transition when the image has been loaded in cache
        var tempImage = new Image();

        jQuery(tempImage).load( function(){
            var newImage = ( helperElement.css('display') == 'block' ) ? jQuery(this) : jQuery(helperElement);
            newImage.css('backgroundImage', 'url('+tempImage.src+')');
            helperElement.animate( settings.effect, settings.duration, settings.easing, settings.callback );
        });

        tempImage.src = src;

        return jQuery;
    }
});