"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkDirtyCreator(all) {
    function checkIsDirty() {
        return !all.every(function (_) { return _.getFormState().pristine; });
    }
    return [
        checkIsDirty,
        function onBeforeunloadCb(e) {
            if (checkIsDirty()) {
                var confirmationMessage = '表单未完成，是否离开';
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }
        },
    ];
}
exports.default = checkDirtyCreator;
