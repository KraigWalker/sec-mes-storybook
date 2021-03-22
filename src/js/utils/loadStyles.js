export const loadStyles = () => {
  const head = document.getElementsByTagName('head')[0];
  const element = document.createElement('link');
  element.rel = 'stylesheet';
  element.href = '/css/app.vm.css';
  head.appendChild(element);
};
