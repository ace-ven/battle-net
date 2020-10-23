export const detectedDrag = (elmnt: any, func: any) => {
  var pos1 = 0,
    pos3 = 0;
  // ,
  // pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    (document.getElementById(
      elmnt.id + "header"
    ) as any).onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    // pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    func(e.clientX);
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

export const detectedDragYRight = (elmnt: any, func: any) => {
  var pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    (document.getElementById(
      elmnt.id + "header"
    ) as any).onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    func(elmnt.style.top);
    (document.getElementById("iframeContainer") as any).style.zIndex = -1;
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    (document.getElementById("iframeContainer") as any).style.zIndex = 0;
  }
};

export const detectedDragYLeft = (elmnt: any, func: any) => {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    (document.getElementById(
      elmnt.id + "header"
    ) as any).onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: any) {
    e = e || window.event;
    e.preventDefault();
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    func(elmnt.style.top);
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};
