$(document).ready(function(){
	
	//Sending the form data to the server
	$('#send-form').on('click', function(){
		
		var name = $('#contact_name').val();
		var email = $('#contact_email').val();
		var message = $('#contact_message').val();

		var is_name_empty = variable_is_empty(name);
		var is_email_empty = variable_is_empty(email);
		var is_message_empty = variable_is_empty(message);

		if (is_email_empty || is_name_empty || is_message_empty) {
			$('.contact__error').removeClass('hide');
			$('.contact__error').html('All the fields are required');
			return false
		} 

		var is_current_email_valid = is_email_valid(email);

		if (!is_current_email_valid) {
			$('.contact__error').removeClass('hide');
			$('.contact__error').html('Invalid Email');
			return false;
		}

		var data_to_send = {
			name : name,
			email : email,
			message : message
		};

		$('.contact__error').addClass('hide');
        $('.contact__error').html('');
        
        $.post('contact.php', data_to_send).done(function(response){
			response = JSON.parse(response);
			//console.log(response);
			if (response.status == true) {
				$('.email-form').addClass('sent');
				setTimeout(function() {
					$('.email-confirmed').removeClass('hide');
					$('.email-confirmed').addClass('sent');
					$('.email-confirmed').addClass('bounceIn');
                    $('.email-form').addClass('hide');
                    $('#send-form').addClass('hide');
				}, 400);
			}
		});
    });

    //Animating menu items
    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href') );
    
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 50
            }, 900, 'swing', function () {
                //window.location.hash = target;
            });
        }
    
    });

    $(window).on('scroll', function(){
		$('.about__article-content').each(function(index, element){
            
            if ($(this).hasClass('animated') || !checkVisible(element)) return;
                        
            var classesToApply = 'animated zoomIn';

            $(this).addClass(classesToApply);
		});
		
        $('.team__member-photo').each(function(index, element){
            
            if ($(this).hasClass('animated') || !checkVisible(element)) return;
                        
            var classesToApply = 'animated';

            if(index % 2 === 0) {
                classesToApply += ' fadeInRight';
            } else {
                classesToApply += ' fadeInLeft';
            }

            $(this).addClass(classesToApply);
        });
    });
    
    function checkVisible(elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

	function variable_is_empty(variable) {
		
		if (variable == '' || 
			variable === null || 
			typeof(variable) == 'undefined') {
			return true;
		}

		return false;
	}

	function is_email_valid(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

    
});