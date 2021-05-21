export var SizeEnum;
(function (SizeEnum) {
    SizeEnum["DEFAULT"] = "default";
    SizeEnum["SMALL"] = "small";
    SizeEnum["LARGE"] = "large";
})(SizeEnum || (SizeEnum = {}));
export var SizeNumberEnum;
(function (SizeNumberEnum) {
    SizeNumberEnum[SizeNumberEnum["DEFAULT"] = 48] = "DEFAULT";
    SizeNumberEnum[SizeNumberEnum["SMALL"] = 16] = "SMALL";
    SizeNumberEnum[SizeNumberEnum["LARGE"] = 64] = "LARGE";
})(SizeNumberEnum || (SizeNumberEnum = {}));
export const sizeMap = (() => {
    const map = new Map();
    map.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT);
    map.set(SizeEnum.SMALL, SizeNumberEnum.SMALL);
    map.set(SizeEnum.LARGE, SizeNumberEnum.LARGE);
    return map;
})();
//# sourceMappingURL=sizeEnum.js.map