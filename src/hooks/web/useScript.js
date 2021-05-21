import { onMounted, ref } from 'vue';
export function useScript(opts) {
    const isLoading = ref(false);
    const error = ref(false);
    const success = ref(false);
    const promise = new Promise((resolve, reject) => {
        onMounted(() => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = function () {
                isLoading.value = false;
                success.value = true;
                error.value = false;
                resolve('');
            };
            script.onerror = function (err) {
                isLoading.value = false;
                success.value = false;
                error.value = true;
                reject(err);
            };
            script.src = opts.src;
            document.head.appendChild(script);
        });
    });
    return {
        isLoading,
        error,
        success,
        toPromise: () => promise,
    };
}
//# sourceMappingURL=useScript.js.map