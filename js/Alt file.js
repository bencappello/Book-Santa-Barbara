//Calculator

//slider
var productsSlider = document.getElementById("productsSlider");

//input
var photoInput = document.getElementById("photos");
var gifInput = document.getElementById("gifs");
var productsInput = document.getElementById("products");
var totalCost = document.getElementById("totalCost");

//checkboxes
var studio = document.getElementById("on-location");
var producer = document.getElementById("producer");
var hand = document.getElementById("hand-model");
var body = document.getElementById("body-model");
var pet = document.getElementById("pet-model");
var stylist = document.getElementById("stylist");

//set defaults
console.log("has fired");
productsInput.value = 1;
photoInput.value = 1;
gifInput.value = 0;
totalCost.value = 160;

//Step Counter
$(document).ready(function () {
  $(".minus").click(function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 0 ? 0 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $(".plus").click(function () {
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});

//Calculation
function calculateChange() {
  productsInput.value = productsSlider.value;
  totalCost.value = 100 + photoInput.value * 30 + gifInput.value * 80 + productsInput.value * 30;
  if (studio.checked === true) {
    totalCost.value = Number(totalCost.value) + 1000;
  }
  if (producer.checked === true) {
    totalCost.value = Number(totalCost.value) + 1000;
  }
  if (hand.checked === true) {
    totalCost.value = Number(totalCost.value) + 120;
  }
  if (body.checked === true) {
    totalCost.value = Number(totalCost.value) + 400;
  }
  if (pet.checked === true) {
    totalCost.value = Number(totalCost.value) + 200;
  }
  if (stylist.checked === true) {
    totalCost.value = Number(totalCost.value) + 500;
  }
  console.log("change");
}

//call functions
photoInput.onchange = function () {
  calculateChange();
};
gifInput.onchange = function () {
  calculateChange();
};
studio.onchange = function () {
  calculateChange();
};
producer.onchange = function () {
  calculateChange();
};
hand.onchange = function () {
  calculateChange();
};
body.onchange = function () {
  calculateChange();
};
pet.onchange = function () {
  calculateChange();
};
stylist.onchange = function () {
  calculateChange();
};

//active form field
$(".email-field").on("focusin", function () {
  $(this).siblings(".field-label").addClass("active");
});
$(".email-field").on("focusout", function () {
  if ($(this).val().length == 0) {
    $(this).siblings(".field-label").removeClass("active");
  }
});



<script src="https://fengyuanchen.github.io/datepicker/js/datepicker.js"></script>

<script>
//Datepicker
    $(document).ready(function () {
        $('[data-toggle="datepicker"]').datepicker({
            format: 'mm-dd-yyyy'
        });
        // Available date placeholders:
        // Year: yyyy
        // Month: mm
        // Day: dd
        if (window.innerWidth < 768) {
            $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
        }
    });

</script>