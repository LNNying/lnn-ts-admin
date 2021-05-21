import { watchEffect, ref } from 'vue';
export function useIntersectionObserver({ target, root, onIntersect, rootMargin = '0px', threshold = 0.1, }) {
    let cleanup = () => { };
    const observer = ref(null);
    const stopEffect = watchEffect(() => {
        cleanup();
        observer.value = new IntersectionObserver(onIntersect, {
            root: root ? root.value : null,
            rootMargin,
            threshold,
        });
        const current = target.value;
        current && observer.value.observe(current);
        cleanup = () => {
            if (observer.value) {
                observer.value.disconnect();
                target.value && observer.value.unobserve(target.value);
            }
        };
    });
    return {
        observer,
        stop: () => {
            cleanup();
            stopEffect();
        },
    };
}
//# sourceMappingURL=useIntersectionObserver.js.map