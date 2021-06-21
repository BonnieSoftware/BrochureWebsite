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
        var url = "https://" + getApiDomainName() + "/enquiry/validate";

        var inputName = $(this).attr("name").toLowerCase();

        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: getFormData(),
            success: function (data) {
                $(".validation-for-" + inputName).empty();
            },
            error: function (xhr, status, error) {
                $(".validation-for-" + inputName).empty();

                var enquiryViewModel = JSON.parse(xhr.responseText);

                for (var key in enquiryViewModel.errors) {
                    if (key.toLowerCase() != inputName) continue;
                    for (var error in enquiryViewModel.errors[key]) {
                        $(".validation-for-" + inputName).append(enquiryViewModel.errors[key][error] + " ");
                    }
                }
            }
        });
    });

    $(".send").on("click", function (e) {
        //TODO: Display spinner over form when posting back

        e.preventDefault();

        // If there are errors do nothing.
        if ($(".validation-message:not(:empty)").length > 0) {
            console.log("form has errors");
            return;
        }

        var url = "https://" + getApiDomainName() + "/enquiry/save";

        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: getFormData(),
            success: function (data) {
                $(".validation-message").empty();
                $(".contact-form input").val("");
                $(".contact-form textarea").val("");
                $(".pricing-title h2").empty().append("Thank you for contacting us");
                $(".pricing-title p").empty().append("Your message has been sent. Where required we will contact you back as soon as possible.");
            },
            error: function (xhr, status, error) {
                var enquiryViewModel = JSON.parse(xhr.responseText);

                $(".validation-message").empty();

                for (var key in enquiryViewModel.errors) {
                    var inputName = key.toLowerCase();
                    for (var error in enquiryViewModel.errors[key]) {
                        console.log(".validation-for-" + inputName);
                        $(".validation-for-" + inputName).append(enquiryViewModel.errors[key][error] + " ");
                    }
                }
            }
        });
    });

    function getApiDomainName() {
        var apiDomainName = "";
        if (window.location.hostname != "localhost") apiDomainName += "api.";
        apiDomainName += window.location.hostname.replace("www.", "");
        return apiDomainName;
    }

    function getFormData() {
        return JSON.stringify({
            "Name": $(".name").val(),
            "Company": $(".company").val(),
            "Phone": $(".phone").val(),
            "Email": $(".email").val(),
            "Message": $(".message").val(),
        });
    }
});