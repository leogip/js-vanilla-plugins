function _createHeaderSelect(value) {
  const selectHeader = document.createElement('div')
  selectHeader.classList.add('select__header')
  selectHeader.insertAdjacentHTML(
    'afterbegin',
    `
    <span class="select__current">${value}</span>
    <img
      class="select__icon"
      src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
      alt="Arrow Icon"
      aria-hidden="true"
    />
    `
  )
  return selectHeader
}

function _createItemSelect(arrItems) {
  const selectItems = document.createElement('div')
  selectItems.classList.add('select__body')
  selectItems.insertAdjacentHTML(
    'afterbegin',
    arrItems.map(item => `<div class="select__item">${item}</div>`).join('')
  )

  return selectItems
}

$.select = function(options) {
  const $select = document.querySelector(options.selector)

  const selectHeader = _createHeaderSelect(options.items[options.active])
  const selectItems = _createItemSelect(options.items)

  $select.appendChild(selectHeader)
  $select.appendChild(selectItems)

  selectHeader.addEventListener('click', toogleSelect)
  selectItems
    .querySelectorAll('.select__item')
    .forEach(item => item.addEventListener('click', selectChoose))

  function toogleSelect() {
    this.parentElement.classList.toggle('is-active')
  }

  function selectChoose() {
    const parrent = this.closest('.select')
    let text = this.innerText
    let currentText = parrent.querySelector('.select__current')

    currentText.textContent = text
    parrent.classList.remove('is-active')
  }
}
