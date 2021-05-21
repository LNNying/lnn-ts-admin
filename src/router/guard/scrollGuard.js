const isHash = (href) => {
    return /^#/.test(href);
};
export function createScrollGuard(router) {
    const body = document.body;
    router.afterEach(async (to) => {
        // scroll top
        isHash(to?.href) && body.scrollTo(0, 0);
        return true;
    });
}
//# sourceMappingURL=scrollGuard.js.map