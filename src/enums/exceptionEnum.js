/**
 * @description: Exception related enumeration
 */
export var ExceptionEnum;
(function (ExceptionEnum) {
    // page not access
    ExceptionEnum[ExceptionEnum["PAGE_NOT_ACCESS"] = 403] = "PAGE_NOT_ACCESS";
    // page not found
    ExceptionEnum[ExceptionEnum["PAGE_NOT_FOUND"] = 404] = "PAGE_NOT_FOUND";
    // error
    ExceptionEnum[ExceptionEnum["ERROR"] = 500] = "ERROR";
    // net work error
    ExceptionEnum[ExceptionEnum["NET_WORK_ERROR"] = 10000] = "NET_WORK_ERROR";
    // No data on the page. In fact, it is not an exception page
    ExceptionEnum[ExceptionEnum["PAGE_NOT_DATA"] = 10100] = "PAGE_NOT_DATA";
})(ExceptionEnum || (ExceptionEnum = {}));
export var ErrorTypeEnum;
(function (ErrorTypeEnum) {
    ErrorTypeEnum["VUE"] = "vue";
    ErrorTypeEnum["SCRIPT"] = "script";
    ErrorTypeEnum["RESOURCE"] = "resource";
    ErrorTypeEnum["AJAX"] = "ajax";
    ErrorTypeEnum["PROMISE"] = "promise";
})(ErrorTypeEnum || (ErrorTypeEnum = {}));
//# sourceMappingURL=exceptionEnum.js.map