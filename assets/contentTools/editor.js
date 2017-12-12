window.addEventListener('load', function() {
    var editor;

});

ContentTools.StylePalette.add([
    new ContentTools.Style('Author', 'author', ['p'])
]);

editor = ContentTools.EditorApp.get();
editor.init('*[data-editable]', 'data-name');

editor.addEventListener('saved', function (ev) {
    var name, payload, regions, xhr;

    // Check that something changed
    regions = ev.detail().regions;
    if (Object.keys(regions).length == 0) {
        return;
    }

    // Set the editor as busy while we save our changes
    this.busy(true);

    // Collect the contents of each region into a FormData instance
    payload = new FormData();
    for (name in regions) {
        if (regions.hasOwnProperty(name)) {
            payload.append(name, regions[name]);
        }
    }

    // Send the update content to the server to be saved
    function onStateChange(ev) {
        // Check if the request is finished
        if (ev.target.readyState == 4) {
            editor.busy(false);
            new ContentTools.FlashUI('ok');
        }
    };

    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', onStateChange);
    xhr.open('POST', '/save-my-page');
    xhr.send(payload);
});
