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

var actions = {
	closeTab: {
		description: 'Close current tab'
	},

	goForward: {
		description: 'Go forward'
	},

	goBackward: {
		description: 'Go back'
	},

	openNewTab: {
		description: 'Open a new tab'
	},

	duplicateTab: {
		description: 'Duplicate current tab'
	},

	reloadTab: {
		description: 'Reload current tab'
	},

	reloadTabNoCache: {
		description: 'Reload current tab (without cache)'
	},

	takeScreenshot: {
		description: 'Take a screenshot'
	}
};