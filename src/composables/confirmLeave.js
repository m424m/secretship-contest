import { watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

export default function confirmLeave(check, modal) {
  watch(() => check.value, (val) => {
    console.log(val)
    window.onbeforeunload = () => val || null
  })

  onBeforeRouteLeave(async () => {
    if (check.value) {
      const canLeave = await modal.value.ask()
      if (canLeave) window.onbeforeunload = null
      return canLeave
    }
    window.onbeforeunload = null
    return true
  })
}
