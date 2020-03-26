const tabs = $.tabs()

const modal = $.modal({
  animatonDuration: 200,
  title: 'Modal Window Vanilla',
  closableOnButton: true,
  closableOnOverlay: false,
  content: `
  <p>lorem ipsum dolor sit.</p>
  `,
  width: '400px',
  buttons: [
    {
      text: 'ok',
      type: 'primary',
      handler() {
        modal.disableButton()
        modal.setContent('Success')
        setTimeout(() => {
          modal.enableButton()
          modal.close()
          modal.destroy()
        }, 1000)
      }
    },
    {
      text: 'cancel',
      type: 'danger',
      handler() {
        modal.close()
      }
    }
  ]
})

document.querySelector('.js-button-modal').addEventListener('click', modal.open)

const select = $.select({
  selector: '.select',
  items: ['value 1', 'value 2', 'value 3'],
  active: 2
})
