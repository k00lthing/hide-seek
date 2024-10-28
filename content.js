console.log("Hello from content.js");
// Receive message from the background script
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message);
  if (message.isActive) {

    const classes = ['hidden', 'hidden--accessible', 'hide', 'invisible', 'display-none', 'no-display', 'opacity-zero', 'show-for-sr', 'sr-only', 'sr-only-focusable', 'visually-hidden', 'visually-hidden-focusable', 'screen-reader-text', 'screen-reader-text-focusable', 'offscreen', 'offscreen-focusable', 'hide-item'];
    let elmentsClassHidden = [];

    for (const cls of classes) {
      const classElements = document.getElementsByClassName(cls);
      elmentsClassHidden.push(...classElements);
    }

    const hiddenElements = document.querySelectorAll('[hidden], [style*="display: none"]');
    hiddenElements.forEach(element => {
      if (!elmentsClassHidden.includes(element)) {
        elmentsClassHidden.push(element);
      }
    });


    if (elmentsClassHidden.length) {

      // iterate elmentsClassHidden and add to the same array all children of the elements already in the array
      for (const elt of elmentsClassHidden) {
        const children = elt.getElementsByTagName('*');
        elmentsClassHidden.push(...children);
      }
  

      const allElements = document.querySelectorAll('*');
      const elementsToKeep = Array.from(allElements).filter(element => !elmentsClassHidden.includes(element));
      elementsToKeep.forEach(element => {
        element.style.setProperty("visibility", "hidden", "important");
      });

      for (elt of elmentsClassHidden) {
        elt.style.setProperty("display", "inherit", "important");
        elt.style.setProperty("visibility", "visible", "important");
        elt.style.setProperty("opacity", "1", "important");
        elt.style.setProperty("clip", "unset", "important");
        elt.style.setProperty("clip-path", "none", "important");
        elt.style.setProperty("overflow", "visible", "important");
        const rect = elt.getBoundingClientRect();
        if (rect.width <= 10 && rect.height <= 10) {
          elt.style.setProperty("box-shadow", "0 0 50px 10px yellow", "important");
        }
      }
      console.log(elmentsClassHidden);


    } else {
    alert("Got nothing to hide here. Move on!")
  }
}
}


