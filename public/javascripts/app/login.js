$(function () {

    $("#login_btn").on("click", function () {

        $.ajax({

            url: "/users/login",
            type: "POST",
            data: {
                username: $("#login_username").val(),
                password: $("#login_password").val()
            },
            dataType: "json",
            success: function (data) {
                // console.log(data);
                if (data.code == 1) {
                    emptyValue(data);
                    return;
                }

                if (data.code == 2) {
                    emptyValue(data);
                    return;
                }

                if (data.code == 0) {
                    $(".error").fadeIn(500);
                    $(".error").find("span").text(data.message);
                    setTimeout(function () {
                        location.href = "/";
                    }, 3000);
                }
            }

        });

    });

    addBorderColor(".form_item");

});


function emptyValue(data) {
    $(".error").fadeIn(500);
    $(".error").find("span").text(data.message);
    $("#login_username").val("");
    $("#login_password").val("");
}

function addBorderColor(el) {
    $(el).focus(function () {
        $(this).css("border-color", "rgb(30, 95, 153)");
    });

    $(el).blur(function () {
        $(this).css("border-color", "rgb(82, 89, 97)");
    });
}