function checkInteger(obj) {
    //var num = new Number((obj.value).match(/^\d*(\.\d{0,2})?/)[0]);
    //obj.value = num.toFixed(2);
    // if (/\./.test(obj.value)) {
    //     alert('hi');
    // }

    if (!/^\d+/.test(obj.value)) {
        if (/\./.test(obj.value)) {
            $('#input_decimal').focus();
        }
        obj.value = obj.value.match(/^\d+/);
    }
}

function checkDecimal(obj) {
    if (!/^\d{2}/.test(obj.value)) {
        obj.value = obj.value.match(/^\d+/);
    } else {
        obj.value = obj.value.match(/^\d{2}/);
    }
    if(event.keyCode == 8 && obj.value.length == 0) {
        $('#input_integer').focus();
    }
}

function checkNumber(obj) {
    if (!/^\d+(\.\d{1,2})?$/.test(obj.value)) {
        $(obj).parent().removeClass('has-success').addClass('has-error');
        $(obj).parent().children('.glyphicon').hide();
        //$(obj).parents('.keepDetail').find('[type="submit"]').prop("disabled", true);
    } else {
        $(obj).parent().removeClass('has-error').addClass('has-success');
        $(obj).parent().children('.glyphicon').show();
        //$(obj).parents('.keepDetail').find('[type="submit"]').prop("disabled", false);
    }
}

function backspace() {
    if (event.keyCode == 8) {
        var elem = event.srcElement;
        var name = elem.nodeName;

        if (name != 'INPUT' && name != 'TEXTAREA') {
            event.returnValue = false;
            return;
        }
        if (name == 'INPUT' && (elem.readOnly == true || elem.disabled == true)) {
            event.returnValue = false;
            return;
        }
    }
}