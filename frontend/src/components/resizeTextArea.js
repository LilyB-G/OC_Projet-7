import { watchEffect } from 'vue';

export const useAutoresizeTextarea = (el) => {
    const resizeTextarea = () => {
        el.value.style.height = 'auto';
        el.value.style.width = '100%';
        el.value.style.height = el.value.scrollHeight + 'px';
        el.value.style.overflow = "hidden";
    }
    watchEffect(onInvalidate => {
        if (!el.value) return
        resizeTextarea()
        el.value.addEventListener('input',resizeTextarea)
        onInvalidate(()=> el.value.removeEventListener('input',resizeTextarea))
    })
}
