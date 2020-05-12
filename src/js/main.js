require("regenerator-runtime/runtime");
const slider = () => {

  function bindSlider(slidesSelector, prevSelector, nextSelector, dotsSelector, activeDotSelector) {
    const slides = Array.prototype.slice.call(document.querySelectorAll(slidesSelector));
    const prev = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);
    const dots = Array.prototype.slice.call(document.querySelectorAll(dotsSelector));
    const activeDot = activeDotSelector;
    let slideIndx = 1;
    let pause = null;

    function currency(n) {
      showSlide(n)
    }

    function showSlide(n) {

      if (slideIndx > slides.length) {
        n = 1;
        slideIndx = 1;
      } else if (slideIndx < 1) {
        slideIndx = slides.length;
        n = slides.length;
      }

      try {
        dots.forEach((item) => {
          item.classList.remove(activeDot);
        });
      } catch (e) {
      }

      slides.forEach((item) => {
        item.style.display = 'none';
        item.classList.add('slideInRight');
      });
      slides[n - 1].style.display = 'block';
      slides[n - 1].classList.add('slideInRight');
      try {
        dots[n - 1].classList.add(activeDot);
      } catch (e) {
      }
    }

    try {
      next.addEventListener('click', () => {
        showSlide(slideIndx += 1);
      });

      prev.addEventListener('click', () => {
        showSlide(slideIndx -= 1);
      });
    } catch (e) {
    }

    try {
      dots.forEach((item, i) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          showSlide(i + 1);
        })
      })
    } catch (e) {
    }

    const autoPlay = () => {
      pause = setInterval(() => {
        showSlide(slideIndx += 1);
      }, 5000)
    };

    slides[0].parentElement.addEventListener('mouseover', () => {
      clearInterval(pause);
    });
    slides[0].parentElement.addEventListener('mouseout', () => {
      autoPlay();
    });

    autoPlay();
    showSlide(slideIndx)
  }

  bindSlider('.slider__item', '.slider__control--left', '.slider__control--right');
  bindSlider('.reviews__item', null, null, '.dot', 'dot-active')
};

const modal = () => {
  const bindModal = (triggerSelector, modalSelector, closeSelector) => {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelectorAll(closeSelector);
    const catalogItems = document.querySelectorAll('.catalog__item');

    const hideModalOrShow = (display) => {
      modal.style.display = display;
      modal.parentNode.style.display = display;
    };

    trigger.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const textTitle = null;

        try {
          catalogItems.forEach((catalog, idx) => {
            if (item.classList.contains('catalog__btn') && i === idx) {
              modal.querySelector('.modal__text').textContent =
                  catalog.querySelector('.catalog__heading').textContent;
            }
          });
        } catch (e) {
        }

        hideModalOrShow('block');
      });
    });

    document.body.addEventListener('click', (e) => {
      if (e.target === modal.parentNode) {
        hideModalOrShow('none');
      }
    });

    document.body.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        hideModalOrShow('none');
      }
    });

    close.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'none';
        modal.parentNode.style.display = 'none';
      })
    })
  };

  bindModal('.consultation-trigger', '#consultation', '.modal__close');
  bindModal('.catalog__btn', '#order', '.modal__close');
};

const requestData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
  });

  return res;
};

const forms = () => {
  const form = document.querySelectorAll('form');
  const status = {
    success: {
      successTitle: 'Спасибо за вашу заявку!',
      successText: 'Наш менеджер свяжется с вами в ближайшее время!'
    },
    fail: 'Ошибка сервера попробуйте снова!'
  };

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = item.parentNode;
      const title = document.createElement('div');
      const text = document.createElement('div');
      const formData = new FormData(item);
      title.classList.add('modal__title');
      text.classList.add('modal__text');

      modal.appendChild(title);
      modal.appendChild(text);

      const afterSubmitForm = () => {
        setTimeout(() => {
          text.remove();
          title.remove();
          item.reset();
          item.style.display = 'block';
        }, 6000)
      };

      requestData('#', formData)
          .then((res) => {
            item.style.display = 'none';
            title.textContent = status.success.successTitle;
            text.textContent = status.success.successText;

            afterSubmitForm();
          })
          .catch((e) => {
            title.textContent = status.fail;

            afterSubmitForm();
          })
    })
  })
};

const tabs = () => {
  const bindTabs = (triggerSelector, contentSelector, activeSelector) => {
    const trigger = document.querySelectorAll(triggerSelector);
    const content = document.querySelectorAll(contentSelector);
    const active = activeSelector;

    trigger.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        hideTabs();
        e.preventDefault();
        showTabs(i);
      })
    });

    const hideTabs = () => {
      trigger.forEach((item) => {
        item.classList.remove(active);
      });

      content.forEach((item) => {
        item.style.display = 'none';
      })
    };

    const showTabs = (i) => {
      trigger[i].classList.add(active);
      content[i].style.display = 'block';
    }

    hideTabs();
    showTabs(0)
  };

  bindTabs('.catalog__link', '.catalog__content .catalog__block', 'catalog__link--active');
};

const showOverlay = () => {
  const bindOverlay = (triggerSelector, closeTrigger, overlaySelector, activeClass) => {
    const trigger = document.querySelectorAll(triggerSelector);
    const close = document.querySelectorAll(closeTrigger);
    const overlay = document.querySelectorAll(overlaySelector);
    const active = activeClass;

    const overlayShowOrClose = (trigger, overlay, active) => {
      debugger
      trigger.forEach((item, i) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();

          overlay.forEach((item, j) => {
            if (i === j) {
              item.parentElement.classList.toggle(active);
            }
          })
        })
      });
    };

    overlayShowOrClose(trigger, overlay, active);
    overlayShowOrClose(close, overlay, active)
  };

  bindOverlay('.catalog__more', '.catalog-overlay__link', '.catalog-overlay', 'catalog-overlay--showed');
};

window.addEventListener('DOMContentLoaded', () => {
  slider();
  modal();
  forms();
  tabs();
  showOverlay();
});