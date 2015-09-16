chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    {
      id: 'mainWindow',
      bounds: {width: 960, height: 640}
    }
  );
  chrome.power.requestKeepAwake("system");
});

