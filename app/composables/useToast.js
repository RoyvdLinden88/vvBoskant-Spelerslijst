const toast = reactive({
  visible: false,
  message: '',
  type: 'success',
  color: '#15803d',
  _timer: null,
})

function showToast(message, type = 'success') {
  if (toast._timer) clearTimeout(toast._timer)
  toast.message = message
  toast.type = type
  toast.color =
    type === 'archive' ? '#b45309' :
    type === 'error'   ? '#b91c1c' :
                         '#15803d'
  toast.visible = true
  toast._timer = setTimeout(() => { toast.visible = false }, 3000)
}

export function useToast() {
  return { toast, showToast }
}