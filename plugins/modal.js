Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalButtons(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement(div)
  }
  const wrap = document.createElement('div')
  wrap.classList.add('modal__footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.classList.add(`btn_type_${btn.type || 'secondary'}`)

    $btn.onclick = btn.handler || function() {}

    wrap.appendChild($btn)
  })

  return wrap
}

function _createModal(options) {
  const defaultWidth = '600px'
  const defaultAnimatonDuration = 200
  const modal = document.createElement('div')
  modal.classList.add('modal')

  modal.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="modal__overlay" style="transition-duration: ${options.animatonDuration ||
    defaultAnimatonDuration}ms" data-close="${options.closableOnOverlay}">
    <div class="modal__window" style="width: ${options.width ||
      defaultWidth}; transition-duration: ${options.animatonDuration ||
      defaultAnimatonDuration}ms">
      <div class="modal__header">
        <span class="modal__title">${options.title || 'Modal window'}</span>
        ${
          options.closableOnButton
            ? '<span class="modal__close" data-close="true">&times;</span>'
            : ''
        }
      </div>
      <div class="modal__body" data-content>
        ${options.content || ''}
      </div>
    </div>
  </div>
  `
  )
  const footer = _createModalButtons(options.buttons)
  footer.appendAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal)

  return modal
}

$.modal = function(options) {
  const $modal = _createModal(options)
  let closing = false
  let destroyed = false

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal destroyed')
      }

      !closing && $modal.classList.add('modal_state_open')
    },
    close() {
      closing = true
      $modal.classList.remove('modal_state_open')
      $modal.classList.add('modal_state_hide')
      setTimeout(() => {
        $modal.classList.remove('modal_state_hide')
        closing = false
      }, options.animatonDuration)
    }
  }

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    },
    disableButton() {
      $modal
        .querySelectorAll('.modal__footer .btn')
        .forEach(btn => (btn.disabled = true))
    },
    enableButton() {
      $modal
        .querySelectorAll('.modal__footer .btn')
        .forEach(btn => (btn.disabled = false))
    },
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      destroyed = true
    }
  })
}
