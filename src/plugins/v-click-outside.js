const ClickOutside = {
  install(app) {
    app.directive('click-outside', {
      beforeMount(el, binding) {
        // eslint-disable-next-line no-param-reassign
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });
  },
};

export default ClickOutside;
