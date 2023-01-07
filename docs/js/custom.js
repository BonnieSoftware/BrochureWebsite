$(function () {
    "use strict";

    $("#preloader").delay(500).fadeOut(500);

    // Fixed Navigation js
    if ($(this).scrollTop() > 20) {
        $("#navbar").addClass("header-scrolled");
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $("#navbar").addClass("header-scrolled");
        } else {
            $("#navbar").removeClass("header-scrolled");
        }
    });

    // testimonials Slider
    $(".owl-testimonials-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // Mobile navbar menu click.
    var w = $(window).width();
    if (w <= 769) {
        $(".navbar-mobile .nav-item").on("click", function () {
            $(".navbar-toggler").trigger("click");
        });
    }

    $(".contact-form input, .contact-form textarea").on("blur", function () {
        var inputName = $(this).attr("name");
        var dataType = $(this).attr("data-type");
        var data = $(this).val().trim();
        var validationMessage = $(".validation-for-" + inputName);

        validationMessage.empty();

        switch (dataType) {
            case "free-text":
                if (data.length > 0) {
                    return;
                }
                validationMessage.append("Please provide " + validationMessage.attr("data-friendly-name") + ".");
                break;
            case "phone":
                if (data.length < 1) {
                    validationMessage.append("Please provide your phone number.");
                    return;
                }

                if (!/^(((\+|00)44\d{4})|(\(?0)\d{4}\)?)\d{6}$/.test(data.replace(/\s/g, ""))) {
                    validationMessage.append("The phone number you provided appears to be invalid. Please provide your phone number.");
                    return;
                }
                
                break;
            case "email":
                if (data.trim().length < 1) {
                    validationMessage.append("Please provide your email address.");
                    return;
                }

                if (!/[^@]+@[^@]+$/.test(data)) {
                    validationMessage.append("The email address you provided appears to be invalid. Please provide your email address.");
                    return;
                }

                break;
            default:
                // Do nothing.
        }
    });

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        if (hash == "contact") {

            var success = getQueryStringVariable("success");
            var error = getQueryStringVariable("error");

            if (success == "1") {
                $(".pricing-title h2").text("Thank you for contacting us");
                $(".pricing-title p").text("Your message has been sent. Where required we will contact you back as soon as possible.");
            }
            else if (error == "1") {
                $(".pricing-title h2").text("There was an error sending your message");
                $(".pricing-title p").text("Your message has not been sent. Please try again. If the problem persists, please call us on 01394 809785.");
            }
        }
    }

    $(".send").on("click", function (e) {
        e.preventDefault();

        if ($(this).hasClass("disabled")) return;

        // Trigger validation on fields before allowing post...
        $(".contact-form input, .contact-form textarea").blur();

        // If there are errors do nothing.
        if ($(".validation-message:not(:empty)").length > 0) {
            return;
        }

        $(this).text("Sending...");
        $(this).addClass("disabled");

        $("form").submit();
    });

    function getQueryStringVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
    }
});
