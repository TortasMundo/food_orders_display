chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'state': 'fullscreen',
    'bounds': {
      'width': Math.round(window.screen.width),
      'height': Math.round(window.screen.height)
    }
  });
});