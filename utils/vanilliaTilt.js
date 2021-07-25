import VanillaTilt from 'vanilla-tilt'

// ie 작동
// (function () {
//   if (typeof window.CustomEvent === 'function') { return false }

//   function CustomEvent (event, params) {
//     params = params || { bubbles: false, cancelable: false, detail: null }
//     const evt = document.createEvent('CustomEvent')
//     evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
//     return evt
//   }

//   CustomEvent.prototype = window.Event.prototype

//   window.CustomEvent = CustomEvent
// })()

export const Tilt = (element) => {
  VanillaTilt.init(element, {
    max: 10,
    speed: 400,
    glare: false
  })
}
