/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2018 The noVNC Authors
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */

/*
 * Logging/debug routines
 */

let _log_level = 'warn';

let Debug = () => {};
let Info = () => {};
let Warn = () => {};
let Error = () => {};

export function init_logging(param) {
    Debug = Info = Warn = Error = () => {};
    let has_custom_logger = false;
    switch (typeof param) {
        case 'string':
            _log_level = param;
            break;
        case 'object':
            let has_custom_logger = true;
            if ('level' in param) {
                _log_level = param.level;
            }
            if ('debug' in param) { Debug = param.debug; }
            if ('info' in param) { Info = param.info; }
            if ('warn' in param) { Warn = param.warn; }
            if ('error' in param) { Error = param.error; }
            break;
    }

    if (!has_custom_logger && typeof window.console !== "undefined") {
        /* eslint-disable no-console, no-fallthrough */
        switch (_log_level) {
            case 'debug':
                Debug = function(msg) {evlog.debug(6, msg);};
            case 'info':
                Info  = function(msg) {evlog.info(msg);};
            case 'warn':
                Warn  = function(msg) {evlog.warning(msg);};
            case 'error':
                Error = function(msg) {evlog.error(msg);};
            case 'none':
                break;
            default:
                throw new window.Error("invalid logging type '" + _log_level + "'");
        }
        /* eslint-enable no-console, no-fallthrough */
    }
}

export function get_logging() {
    return _log_level;
}

export { Debug, Info, Warn, Error };

// Initialize logging level
init_logging();
