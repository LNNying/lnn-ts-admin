/**
 * @description: menu type
 */
export var MenuTypeEnum;
(function (MenuTypeEnum) {
    // left menu
    MenuTypeEnum["SIDEBAR"] = "sidebar";
    MenuTypeEnum["MIX_SIDEBAR"] = "mix-sidebar";
    // mixin menu
    MenuTypeEnum["MIX"] = "mix";
    // top menu
    MenuTypeEnum["TOP_MENU"] = "top-menu";
})(MenuTypeEnum || (MenuTypeEnum = {}));
// 折叠触发器位置
export var TriggerEnum;
(function (TriggerEnum) {
    // 不显示
    TriggerEnum["NONE"] = "NONE";
    // 菜单底部
    TriggerEnum["FOOTER"] = "FOOTER";
    // 头部
    TriggerEnum["HEADER"] = "HEADER";
})(TriggerEnum || (TriggerEnum = {}));
// menu mode
export var MenuModeEnum;
(function (MenuModeEnum) {
    MenuModeEnum["VERTICAL"] = "vertical";
    MenuModeEnum["HORIZONTAL"] = "horizontal";
    MenuModeEnum["VERTICAL_RIGHT"] = "vertical-right";
    MenuModeEnum["INLINE"] = "inline";
})(MenuModeEnum || (MenuModeEnum = {}));
export var MenuSplitTyeEnum;
(function (MenuSplitTyeEnum) {
    MenuSplitTyeEnum[MenuSplitTyeEnum["NONE"] = 0] = "NONE";
    MenuSplitTyeEnum[MenuSplitTyeEnum["TOP"] = 1] = "TOP";
    MenuSplitTyeEnum[MenuSplitTyeEnum["LEFT"] = 2] = "LEFT";
})(MenuSplitTyeEnum || (MenuSplitTyeEnum = {}));
export var TopMenuAlignEnum;
(function (TopMenuAlignEnum) {
    TopMenuAlignEnum["CENTER"] = "center";
    TopMenuAlignEnum["START"] = "start";
    TopMenuAlignEnum["END"] = "end";
})(TopMenuAlignEnum || (TopMenuAlignEnum = {}));
export var MixSidebarTriggerEnum;
(function (MixSidebarTriggerEnum) {
    MixSidebarTriggerEnum["HOVER"] = "hover";
    MixSidebarTriggerEnum["CLICK"] = "click";
})(MixSidebarTriggerEnum || (MixSidebarTriggerEnum = {}));
//# sourceMappingURL=menuEnum.js.map