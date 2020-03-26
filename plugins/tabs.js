$.tabs = function(options) {
  const tabNav = document.querySelectorAll('.tabs-nav__item')
  const tabContent = document.querySelectorAll('.tab')

  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav)
  })

  function selectTabNav() {
    tabNav.forEach(item => item.classList.remove('is-active'))

    this.classList.add('is-active')
    selectTabContent(this.dataset.tabName)
  }

  function selectTabContent(tabName) {
    tabContent.forEach(item =>
      item.classList.contains(tabName)
        ? item.classList.add('is-active')
        : item.classList.remove('is-active')
    )
  }
}
