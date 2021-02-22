// el是否包含某个class
const hasClass = (el, className) => {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
};

// el添加某个class
const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
};

// el去除某个class
const removeClass = (el, className) => {
  if (!hasClass(el, className)) {
    return;
  }
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
  el.className = el.className.replace(reg, " ");
};

// 动态引入js
const injectScript = (src, type="text/javascript") => {
  const s = document.createElement("script");
  s.type = type;
  s.async = false;
  s.src = src;
  document.body.appendChild(s);
};
