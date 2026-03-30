(function($) {
	"use strict"

	///////////////////////////
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});

	///////////////////////////
	// Scrollspy
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});

	///////////////////////////
	// Smooth scroll
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	///////////////////////////
	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});

	///////////////////////////
	// Mobile dropdown
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});

	///////////////////////////
	// On Scroll
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	///////////////////////////
	// magnificPopup
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});
	/* ---------------- Black Friday countdown + subtle confetti ---------------- */
	(function(){
		// set BF end date (year, monthIndex, day, hour, min, sec)
		var bfEnd = new Date(2025,10,30,23,59,59).getTime();

		function formatDiff(ms){
			if (ms <= 0) return '';
			var s = Math.floor(ms/1000);
			var d = Math.floor(s/86400);
			var h = Math.floor((s%86400)/3600);
			var m = Math.floor((s%3600)/60);
			return d+'d '+h+'h '+m+'m';
		}

		function tick(){
			var diff = bfEnd - Date.now();
			var txt = formatDiff(diff);
			if ($('#bf-countdown').length) $('#bf-countdown').text(diff>0 ? txt : '');
			if ($('#bf-countdown-2').length) $('#bf-countdown-2').text(diff>0 ? txt : '');
		}
		tick();
		setInterval(tick,1000);

		function burstConfetti(n){
			if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			for(var i=0;i<n;i++){
				var $c = $('<div class="bf-confetti"></div>');
				$c.css({
					left:(20 + Math.random()*60)+'%',
					top:(-10 - Math.random()*40)+'px',
					width:(6 + Math.random()*8)+'px',
					height:(6 + Math.random()*8)+'px',
					background:['#ff5252','#81d4fa','#ffd54f','#66bb6a'][Math.floor(Math.random()*4)],
					animationDuration:(1200 + Math.random()*1200)+'ms'
				});
				$('body').append($c);
				(function($el){ setTimeout(function(){ $el.remove(); }, 2600); })($c);
			}
		}
		if (Date.now() < bfEnd) setTimeout(function(){ burstConfetti(18); }, 800);
	})();

	/* ---------------- Footer small handlers ---------------- */
	// set year
	if ($('#year').length) $('#year').text(new Date().getFullYear());

	// newsletter small handler
	$('#footer-news').on('submit', function(e){
		e.preventDefault();
		alert('Mulțumim! Vei primi un email de confirmare.');
		this.reset();
	});

	// ensure portfolio tap toggle (non-intrusive)
	$('.work').on('click', function(e){
		if ($(e.target).closest('a').length) return;
		$('.work.open').not(this).removeClass('open');
		$(this).toggleClass('open');
	});

	// Animate pricing .amount on load (subtle)
	(function animatePrices(){
	  if (!document.querySelectorAll) return;
	  document.querySelectorAll('.price .amount').forEach(function(el){
	    var end = parseInt(el.textContent.replace(/[^\d]/g,''),10) || 0;
	    var start = 0;
	    var dur = 800;
	    var t0 = performance.now();
	    function step(t){
	      var p = Math.min(1, (t - t0) / dur);
	      el.textContent = Math.round(p * end);
	      if (p < 1) requestAnimationFrame(step);
	      else el.textContent = end;
	    }
	    requestAnimationFrame(step);
	  });
	})();

	/* Team: tilt on mousemove + modal detail (requires jQuery */
	(function(){
	    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	    // tilt effect
	    $('.team-card').on('mousemove', function(e){
	        var $t = $(this);
	        var w = $t.outerWidth(), h = $t.outerHeight();
	        var offset = $t.offset();
	        var px = (e.pageX - offset.left) / w - 0.5;
	        var py = (e.pageY - offset.top) / h - 0.5;
	        var rx = -py * 6; var ry = px * 6;
	        $t.css('transform','perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(0)');
	    });
	    $('.team-card').on('mouseleave', function(){
	        $(this).css('transform','');
	    });

	    // modal detail
	    $('.team-card').on('click', function(e){
	        if ($(e.target).closest('a').length) return; // let links work
	        var $c = $(this);
	        var name = $c.data('name') || $c.find('h4').text();
	        var role = $c.data('role') || $c.find('small').text();
	        var bio = $c.data('bio') || $c.find('p').text() || '';
	        var img = $c.data('img') || $c.find('img').attr('src') || '';

	        var $modal = $(

	            '<div class="team-modal" role="dialog" aria-modal="true" aria-label="Team member detail">' +
	                '<div class="modal-card">' +
	                    '<button class="modal-close" aria-label="Close">&times;</button>' +
	                    '<div class="modal-photo"><img src="' + img + '" alt="' + (name||'') + '"></div>' +
	                    '<div class="modal-body"><h3>' + name + '</h3><small style="color:rgba(255,255,255,0.75)">' + role + '</small><p style="margin-top:12px">' + bio + '</p></div>' +
	                '</div>' +
	            '</div>'
	        );

	        $('body').append($modal);
	        $modal.hide().fadeIn(220);
	        $modal.find('.modal-close').on('click', function(){
	            $modal.fadeOut(180, function(){ $modal.remove(); });
	        });
	        // ESC to close
	        $(document).on('keydown.teamModal', function(ev){
	            if (ev.key === 'Escape') { $modal.fadeOut(180, function(){ $modal.remove(); $(document).off('keydown.teamModal'); }); }
	        });
	    });

	})();

	/* --- Button ripple effect (attach to .btn-ripple) --- */
	(function(){
	  $(document).on('click', '.btn-ripple', function(e){
	    var $btn = $(this);
	    if ($btn.css('position') === 'static') $btn.css('position','relative');
	    var offset = $btn.offset();
	    var x = e.pageX - offset.left;
	    var y = e.pageY - offset.top;
	    var $r = $('<span class="ripple"></span>');
	    $r.css({ left: x - 10, top: y - 10, width: 20, height: 20 });
	    $btn.append($r);
	    setTimeout(function(){ $r.remove(); }, 700);
	  });
	})();

	/* --- Simple parallax for elements with .parallax (based on scroll) --- */
	(function(){
	  var $par = $('.parallax');
	  if (!$par.length) return;
	  var max = 40; // px translate limit
	  $(window).on('scroll.parallax resize.parallax', function(){
	    var st = $(window).scrollTop();
	    var wh = $(window).height();
	    $par.each(function(){
	      var $el = $(this);
	      var offset = $el.offset().top;
	      var h = $el.outerHeight();
	      // calculate normalized progress [-1..1]
	      var mid = offset + h/2;
	      var progress = (mid - st - wh/2) / (wh/2);
	      var y = Math.max(-max, Math.min(max, -progress * max * 0.4));
	      $el.css('transform', 'translateY('+ y +'px)');
	    });
	  }).trigger('scroll.parallax');
	})();

	/* --- Staggered reveal using IntersectionObserver fallback to jQuery --- */
	(function(){
	  var revealed = 0;
	  var items = document.querySelectorAll('.reveal, .slide-left, .slide-right, .underline-anim');
	  if ('IntersectionObserver' in window) {
	    var io = new IntersectionObserver(function(entries){
	      entries.forEach(function(entry){
	        if (!entry.isIntersecting) return;
	        var el = entry.target;
	        // stagger using small delay based on revealed count
	        setTimeout(function(){
	          if (el.classList.contains('slide-left') || el.classList.contains('slide-right')) {
	            el.classList.add('in');
	          } else {
	            el.classList.add('active');
	            if (el.classList.contains('underline-anim')) el.classList.add('active');
	          }
	        }, Math.min(220, revealed * 80));
	        revealed++;
	        io.unobserve(el);
	      });
	    }, { threshold: 0.12 });
	    items.forEach(function(i){ io.observe(i); });
	  } else {
	    // fallback: simple add active
	    items.forEach(function(i){ i.classList.add('active'); });
	  }
	})();

	/* --- Pricing plans: staggered reveal + animated number on discount flip --- */
	(function(){
    // animate numeric from -> to
    function animateNumber($el, from, to, duration){
        var start = performance.now();
        function step(now){
            var t = Math.min(1,(now-start)/duration);
            var v = Math.round(from + (to-from) * (1 - Math.pow(1-t,3))); // ease-out-ish
            $el.text(v);
            if (t < 1) requestAnimationFrame(step);
            else $el.text(to);
        }
        requestAnimationFrame(step);
    }

    // stagger entrance for plans
    $('.pricing-grid .plan').each(function(i){
        var $p = $(this);
        setTimeout(function(){ $p.addClass('show'); }, i * 120);
    });

    // prepare flip/back price markup if not present
    $('.pricing-grid .plan').each(function(){
        var $p = $(this);
        var $price = $p.find('.price');
        if (!$price.length) return;
        // wrap faces if not already
        if (!$price.parent().hasClass('price-wrap')){
            var amountText = $price.find('.amount').text().trim();
            var $wrap = $('<span class="price-wrap"></span>');
            var $front = $('<span class="price-face price-front"></span>');
            var $back  = $('<span class="price-face price-back"></span>');
            $front.append($price.clone());
            // back holds discounted value (hidden) — compute later on hover
            $back.append($price.clone());
            $wrap.append($front).append($back);
            $price.replaceWith($wrap);
        }
    });

    // hover: flip to discounted if data-discount present, animate numbers
    $('.pricing-grid .plan').on('mouseenter', function(){
        var $p = $(this);
        var discount = parseFloat($p.attr('data-discount')) || parseFloat($p.data('discount')) || 0;
        var $frontAmt = $p.find('.price-front .amount');
        var $backAmt  = $p.find('.price-back .amount');
        var from = parseInt($frontAmt.text().replace(/[^\d]/g,''),10) || 0;
        if (discount > 0 && $backAmt.length){
            var to = Math.round(from * (1 - (discount/100)));
            // update back amount instantly to start from smaller for animation
            $backAmt.text(from);
            animateNumber($backAmt, from, to, 520);
            // flip
            $p.addClass('flip');
            // confetti for featured plans
            if ($p.hasClass('featured')){
                // call existing burstConfetti if present, else quick fallback
                if (typeof burstConfetti === 'function') try{ burstConfetti(8); }catch(e){}
                else {
                    for(var i=0;i<8;i++){
                        var $c = $('<div class="bf-confetti"></div>');
                        $c.css({ left:(30 + Math.random()*40)+'%', top: (-10 - Math.random()*40)+'px', background: ['#ff5252','#81d4fa','#ffd54f','#66bb6a'][Math.floor(Math.random()*4)] });
                        $('body').append($c);
                        (function($el){ setTimeout(function(){ $el.remove(); }, 2000); })($c);
                    }
                }
            }
        }
    }).on('mouseleave', function(){
        var $p = $(this);
        $p.removeClass('flip');
        // restore front amount to original (ensure value)
        var $frontAmt = $p.find('.price-front .amount');
        var original = $frontAmt.data('orig');
        if (original) $frontAmt.text(original);
    });

    // ensure original stored
    $('.pricing-grid .plan .price .amount, .pricing-grid .plan .amount').each(function(){
        var $amt = $(this);
        $amt.data('orig', $amt.text().trim());
    });

    })();
	/* Easter eggs de Paște */
	(function(){
		var $eggs = $('.egg-card');
		var $result = $('#egg-result');
		var $emailForm = $('#egg-email-form');
		var $emailInput = $('#egg-email-input');
		var $eggGrid = $('.egg-grid');
		if (!$eggs.length) return;

		var gameActive = true;
		var selectedEgg = null;
		var userEmail = localStorage.getItem('easter-egg-user-email');
		var lastPlayTime = localStorage.getItem('easter-egg-last-play');
		var now = Date.now();
		var COOLDOWN = 24 * 60 * 60 * 1000; // 24 ore în ms

		var prizes = [
			{label:'50% reducere', variant:'success'},
			{label:'30% reducere', variant:'success'},
			{label:'20% reducere', variant:'success'},
			{label:'10% reducere', variant:'success'},
			{label:'Ai avut ghinion 😄', variant:'miss'},
			{label:'Mai încearcă!', variant:'miss'}
		];

		function shuffle(arr){
			return arr.sort(function(){ return 0.5 - Math.random(); });
		}

		function emitConfetti(count){
			for (var i = 0; i < count; i++){
				var $c = $('<div class="bf-confetti"></div>');
				$c.css({
					left:(15 + Math.random()*70)+'%',
					top:(-10 - Math.random()*40)+'px',
					width:(6 + Math.random()*8)+'px',
					height:(6 + Math.random()*8)+'px',
					background:['#ffd54f','#ff8a65','#81d4fa','#b39ddb'][Math.floor(Math.random()*4)],
					animationDuration:(900 + Math.random()*900)+'ms'
				});
				$('body').append($c);
				(function($el){ setTimeout(function(){ $el.remove(); }, 2200); })($c);
			}
		}

		function showMessage(txt, variant){
			if (!$result.length) return;
			$result.removeClass('egg-message-success egg-message-luck')
				.addClass(variant === 'success' ? 'egg-message-success' : 'egg-message-luck')
				.html(txt);
		}

		function getTimeUntilNextPlay(){
			if (!lastPlayTime) return 0;
			var nextPlayTime = parseInt(lastPlayTime) + COOLDOWN;
			var remaining = nextPlayTime - now;
			return Math.max(0, remaining);
		}

		function formatTimeLeft(ms){
			var hours = Math.floor(ms / (60 * 60 * 1000));
			var minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
			return hours + 'h ' + minutes + 'min';
		}

		// Helper function to validate email
		function isValidEmail(email){
			var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return re.test(email);
		}

		// Handle email form submission
		$emailForm.on('submit', function(e){
			e.preventDefault();
			var email = $emailInput.val().trim();
			if (!email || !isValidEmail(email)) {
				$emailInput.style.borderColor = '#ff6b6b';
				setTimeout(function(){ $emailInput.style.borderColor = ''; }, 1500);
				return;
			}
			
			// Disable button during submission
			$emailForm.find('button').prop('disabled', true).text('Se salvează...');
			
			// Send email to server
			fetch('/save-email.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: email })
			})
			.then(function(response) { return response.json(); })
			.then(function(data) {
				if (data.success || data.error === 'Email already registered') {
					// Save email to localStorage as backup
					localStorage.setItem('easter-egg-user-email', email);
					userEmail = email;
					
					// Hide email form and show egg grid
					$emailForm.fadeOut(300, function(){
						$eggGrid.fadeIn(400);
						initializeEasterEggs();
					});
				} else {
					$emailInput.style.borderColor = '#ff6b6b';
					$emailForm.find('button').prop('disabled', false).text('Pe locul tău →');
					setTimeout(function(){ $emailInput.style.borderColor = ''; }, 1500);
				}
			})
			.catch(function(err) {
				console.log('Server unavailable, using local storage:', err);
				// Fallback: save locally if server is down
				localStorage.setItem('easter-egg-user-email', email);
				userEmail = email;
				
				$emailForm.fadeOut(300, function(){
					$eggGrid.fadeIn(400);
					initializeEasterEggs();
				});
				$emailForm.find('button').prop('disabled', false).text('Pe locul tău →');
			});
		});

		// If user already has email saved, show eggs immediately
		if (userEmail){
			$emailForm.hide();
			$eggGrid.show();
			initializeEasterEggs();
		} else {
			$emailForm.show();
			$eggGrid.hide();
			return; // Don't initialize game yet
		}

		function initializeEasterEggs(){
			gameActive = true;

			// Check dacă jucătorul poate juca
			var timeLeft = getTimeUntilNextPlay();
			if (timeLeft > 0){
				gameActive = false;
				$eggs.addClass('disabled').css('opacity','0.5').css('cursor','not-allowed');
				showMessage('<strong>⏳ Revino peste 24h!</strong><br>Poți juca din nou în: <strong>' + formatTimeLeft(timeLeft) + '</strong><br>Doar unu pe zi! 🎁', 'luck');
				return;
			}

			var assignment = shuffle(prizes.slice());
			$eggs.each(function(i){
				var $btn = $(this);
				var prize = assignment[i] || {label:'Mai încearcă!', variant:'miss'};
				$btn.data('prize-label', prize.label);
				$btn.data('prize-variant', prize.variant);
				$btn.attr('aria-label', 'Ou de Paște norocos');
			});

			showMessage('Alege unu din 6 ouă! 🥚 (Doar unu pe 24h)', 'luck');

			$eggs.on('click', function(){
				if (!gameActive) return;
				
				var $btn = $(this);
				var label = $btn.data('prize-label') || 'Ai avut ghinion 😄';
				var variant = $btn.data('prize-variant') || 'miss';
				
				// Salveaza timestamp-ul
				localStorage.setItem('easter-egg-last-play', Date.now().toString());
				
				// Deschide oul selectat
				$btn.addClass('opened');
				$btn.find('.egg-status').text(label);
				$btn.attr('aria-pressed','true');
				selectedEgg = $btn;
				gameActive = false;

				// Disable toate celelalte
				$eggs.not($btn).addClass('disabled').css('opacity','0.4').css('cursor','not-allowed');

				// Afisaj final
				if (variant === 'success'){
					showMessage('<strong>Felicitări! 🎉</strong><br>Ai câștigat: <span style="font-size:20px; color:#d4ffcb;">' + label + '</span><br><small style="font-size:12px; opacity:0.8;">Revino mâine pentru alt premiu!</small>', 'success');
					emitConfetti(15);
				} else {
					showMessage('<strong>Ups! ☹️</strong><br>' + label + '<br><small style="font-size:12px; opacity:0.8;">Revino mâine și încearcă din nou!</small>', 'luck');
				}
			});
		}

		// Previne click pe celelalte
		$eggs.on('click', function(e){
			if ($(this).hasClass('disabled')){
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		});
	})();
	/* --- Testimonials: static 2 reviews layout (no carousel on mobile) --- */
    (function(){
      // simply ensure testimonials display nicely without carousel logic
      var $slider = $('#testimonial-slider');
      if ($slider.length) {
        $slider.removeClass('owl-carousel owl-theme');
        $slider.css({
          'display': 'flex',
          'flex-wrap': 'wrap',
          'gap': '20px',
          'justify-content': 'center'
        });
        $slider.find('.testimonial').css({
          'flex': '0 1 calc(50% - 10px)',
          'min-width': '280px'
        });
        // mobile: stack 1 per row
        if (window.innerWidth < 768) {
          $slider.find('.testimonial').css('flex', '0 1 100%');
        }
      }
    })();

})(jQuery);
