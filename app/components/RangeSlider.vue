<template>
    <div class="range-slider" @mousedown.prevent.stop>
        <div ref="track" class="track" @click="onTrackClick($event)">
            <div class="range bg-gray-600" :style="rangeStyle"></div>
            <!-- left thumb -->
            <button ref="thumbMin" class="thumb" :style="thumbMinStyle" :aria-valuemin="min" :aria-valuemax="max"
                :aria-valuenow="value[0]" role="slider" tabindex="0" @pointerdown="startDrag('min', $event)"
                @keydown="onKeyDown('min', $event)"></button>

            <!-- right thumb -->
            <button ref="thumbMax" class="thumb" :style="thumbMaxStyle" :aria-valuemin="min" :aria-valuemax="max"
                :aria-valuenow="value[1]" role="slider" tabindex="0" @pointerdown="startDrag('max', $event)"
                @keydown="onKeyDown('max', $event)"></button>
        </div>

        <!-- <div class="labels mt-3 flex justify-between text-sm text-gray-600">
            <div>Min: <strong>{{ value[0] }}</strong></div>
            <div>Max: <strong>{{ value[1] }}</strong></div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
    modelValue?: [number, number]
    min?: number
    max?: number
    step?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const min = props.min ?? 0
const max = props.max ?? 100
const step = props.step ?? 1

// internal value as reactive array
const value = ref<[number, number]>([
    (props.modelValue && props.modelValue[0] != null) ? props.modelValue[0] : min,
    (props.modelValue && props.modelValue[1] != null) ? props.modelValue[1] : max,
])

watch(() => props.modelValue, (nv) => {
    if (!nv) return
    // ensure clamped
    const a = clamp(nv[0], min, max)
    const b = clamp(nv[1], min, max)
    value.value = [Math.min(a, b), Math.max(a, b)]
})

watch(value, (v) => {
    emit('update:modelValue', v)
}, { deep: true })

const track = ref<HTMLElement | null>(null)
const thumbMin = ref<HTMLElement | null>(null)
const thumbMax = ref<HTMLElement | null>(null)
let dragging: null | 'min' | 'max' = null

function clamp(v: number, a = min, b = max) {
    return Math.min(Math.max(v, a), b)
}

function valueToPercent(v: number) {
    return ((v - min) / (max - min)) * 100
}

function percentToValue(p: number) {
    const raw = min + (p / 100) * (max - min)
    // snap to step
    const stepped = Math.round(raw / step) * step
    return clamp(stepped)
}

const thumbMinStyle = computed(() => ({ left: valueToPercent(value.value[0]) + '%' }))
const thumbMaxStyle = computed(() => ({ left: valueToPercent(value.value[1]) + '%' }))
const rangeStyle = computed(() => {
    const left = valueToPercent(value.value[0])
    const right = valueToPercent(value.value[1])
    return { left: left + '%', width: Math.max(0, right - left) + '%' }
})

function startDrag(which: 'min' | 'max', ev: PointerEvent) {
    ev.preventDefault()
    dragging = which
        (ev.target as HTMLElement).setPointerCapture(ev.pointerId)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
}

function onPointerMove(ev: PointerEvent) {
    if (!dragging || !track.value) return
    const rect = track.value.getBoundingClientRect()
    const percent = ((ev.clientX - rect.left) / rect.width) * 100
    const newValue = percentToValue(percent)
    if (dragging === 'min') {
        // ensure not surpass max
        value.value[0] = Math.min(newValue, value.value[1])
    } else {
        value.value[1] = Math.max(newValue, value.value[0])
    }
}

function stopDrag(ev?: PointerEvent) {
    if (!dragging) return
    try { (ev && (ev.target as HTMLElement).releasePointerCapture(ev.pointerId)) } catch (e) { }
    dragging = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
}

function onTrackClick(ev: MouseEvent) {
    if (!track.value) return
    const rect = track.value.getBoundingClientRect()
    const percent = ((ev.clientX - rect.left) / rect.width) * 100
    const v = percentToValue(percent)
    // choose the closer thumb
    const distMin = Math.abs(v - value.value[0])
    const distMax = Math.abs(v - value.value[1])
    if (distMin < distMax) {
        value.value[0] = Math.min(v, value.value[1])
    } else {
        value.value[1] = Math.max(v, value.value[0])
    }
}

function onKeyDown(which: 'min' | 'max', ev: KeyboardEvent) {
    const stepMul = ev.shiftKey ? 10 : 1
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') {
        ev.preventDefault()
        if (which === 'min') value.value[0] = clamp(value.value[0] - step * stepMul)
        else value.value[1] = clamp(value.value[1] - step * stepMul)
    } else if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') {
        ev.preventDefault()
        if (which === 'min') value.value[0] = clamp(value.value[0] + step * stepMul)
        else value.value[1] = clamp(value.value[1] + step * stepMul)
    } else if (ev.key === 'Home') {
        ev.preventDefault()
        if (which === 'min') value.value[0] = min
        else value.value[1] = min
    } else if (ev.key === 'End') {
        ev.preventDefault()
        if (which === 'min') value.value[0] = max
        else value.value[1] = max
    }
}

onMounted(() => {
    // ensure values are clamped and ordered
    value.value = [clamp(value.value[0]), clamp(value.value[1])]
})

onBeforeUnmount(() => {
    stopDrag()
})
</script>

<style scoped>
.range-slider {
    width: 100%;
}

.track {
    position: relative;
    height: 10px;
    background: #e6e7ea;
    border-radius: 9999px;
    cursor: pointer;
}

.range {
    position: absolute;
    height: 100%;
    /* background: linear-gradient(90deg, #6366f1, #06b6d4); */
    border-radius: 4px;
}

.thumb {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: white;
    border: 1px solid #d1d1d1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.thumb:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}
</style>
