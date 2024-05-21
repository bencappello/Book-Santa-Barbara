document.addEventListener('DOMContentLoaded', function() {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('submit event handler', event.target, event)

        html2canvas(dom('event-details')).then(function(canvas) {
            var screenshotInput = document.createElement('input');
            screenshotInput.type = 'hidden';
            screenshotInput.name = 'event-details-screenshot';
            screenshotInput.setAttribute('data-name', 'event-details-screenshot');
            screenshotInput.id = 'event-details-screenshot';
            screenshotInput.value = canvas.toDataURL();
            // screenshotInput.value = 'TESTING ADDING INPUT';
            form.appendChild(screenshotInput);

            // form.submit();
        });
    });
});


//options for Service function
['type': "fixed-price-option", 'title': "ceremony-sound", 'cost': 350],
['type': "fixed-price-option", 'title': "remote-power", 'cost': 200],
['type': "add-on-slider", 'title': "custom-songs", 'cost': 100, 'increment': 1],
['type': "fixed-price-option", 'title': "beach-ceremony", 'cost': 200]