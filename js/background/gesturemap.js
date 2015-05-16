var nameToFunctionMap = {
    "Close tab": function () { closeCurrentTab(); },
    "Go forward": function () { navigateHistory(false); },
    "Go back": function () { navigateHistory(true); },
    "Open new tab": function () { createNewTab(); },
    "Duplicate tab": function () { duplicateTab(); },
    "Reload tab": function () { reloadTab(false); },
    "Reload tab (without cache)": function () { reloadTab(true); },
    "Take a screenshot": function () { takeScreenshot(); }
};