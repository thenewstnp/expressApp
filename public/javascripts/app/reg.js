$(function () {

    $("#reg_Btn").on("click", function () {

        $.ajax({
            url: "users/register",
            type: "POST",
            data: {
                username: $("#reg_username").val(),
                password: $("#reg_password").val(),
                repassword: $("#reg_rePassword").val()
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

                if (data.code == 3) {
                    emptyValue(data);
                    return;
                }

                if (data.code == 0) {
                    $(".error").fadeIn(500);
                    $(".error").find("span").text(data.message);
                    setTimeout(function () {
                        location.href = "/login";
                    }, 3000);
                }
            }
        });

    })

    addBorderColor(".form_item");

});


function emptyValue(data) {
    $(".error").fadeIn(500);
    $(".error").find("span").text(data.message);
    $("#reg_username").val("");
    $("#reg_password").val("");
    $("#reg_rePassword").val("");
}

function addBorderColor(el) {
    $(el).focus(function () {
        $(this).css("border-color", "rgb(30, 95, 153)");
    });

    $(el).blur(function () {
        $(this).css("border-color", "rgb(82, 89, 97)");
    });
}