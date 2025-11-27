import { h } from 'vue'
import { toast as shadToast } from 'vue-sonner';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-vue-next'

export default defineNuxtPlugin(() => {
  const baseToast = (variant: 'success' | 'error' | 'warning', title: string, opts?: any) => {
    const colors = {
      success: 'border-green-500 bg-green-50 text-green-700',
      error: 'border-red-500 bg-red-50 text-red-700',
      warning: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    }

    const icons = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertTriangle,
    }

    shadToast({
      title,
      description: opts?.description,
      class: `border ${colors[variant]} p-4 rounded-lg flex items-start gap-3`,
      icon: h(icons[variant], { class: 'w-5 h-5 mt-1' }),
    })
  }

  return {
    provide: {
      toast: {
        success: (title: string, opts?: any) => baseToast('success', title, opts),
        error: (title: string, opts?: any) => baseToast('error', title, opts),
        warning: (title: string, opts?: any) => baseToast('warning', title, opts),
      },
    },
  }
})
