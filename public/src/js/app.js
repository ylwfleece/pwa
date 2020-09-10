var deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('Service worker registered!')
        });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
});

var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        //resolve('This is executed once the timer is done');
        reject({code: 500, message: 'An error occurred!'});
    }, 3000);
});

// promise.then(function(text) {
//     return text;
// }, function(err) {
//     console.log(err.code, err.message)
// }).then(function(newText) {
//     console.log(newText);
// })

promise.then(function(text) {
    return text;
}).then(function(newText) {
    console.log(newText);
}).catch(function(err) {
    console.log(err.code, err.message);
})

console.log('This is executed right after setTimeout()');