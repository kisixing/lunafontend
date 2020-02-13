"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  a {\n    color: var(--theme-color);\n  }\n  a:hover {\n    color: var(--theme-hover-color);\n  }\n  a:active {\n    color: var(--theme-active-color);\n  }\n  ::-moz-selection {\n    background: var(--theme-color);\n  }\n  ::selection {\n    background: var(--theme-color);\n  }\n  html {\n    --antd-wave-shadow-color: var(--theme-color);\n  }\n  [ant-click-animating-without-extra-node='true']::after,\n  .ant-click-animating-node {\n    -webkit-box-shadow: 0 0 0 0 var(--theme-color);\n            box-shadow: 0 0 0 0 var(--theme-color);\n    -webkit-box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);\n            box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);\n  }\n  @-webkit-keyframes waveEffect {\n    100% {\n      -webkit-box-shadow: 0 0 0 var(--theme-color);\n              box-shadow: 0 0 0 var(--theme-color);\n      -webkit-box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);\n              box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);\n    }\n  }\n  @keyframes waveEffect {\n    100% {\n      -webkit-box-shadow: 0 0 0 var(--theme-color);\n              box-shadow: 0 0 0 var(--theme-color);\n      -webkit-box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);\n              box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);\n    }\n  }\n  .ant-alert-info .ant-alert-icon {\n    color: var(--theme-color);\n  }\n  .ant-anchor-ink-ball {\n    border: 2px solid var(--theme-color);\n  }\n  .ant-anchor-link-active > .ant-anchor-link-title {\n    color: var(--theme-color);\n  }\n  .ant-select-auto-complete.ant-select .ant-input:focus,\n  .ant-select-auto-complete.ant-select .ant-input:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-select-selection:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-select-focused .ant-select-selection,\n  .ant-select-selection:focus,\n  .ant-select-selection:active {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-select-open .ant-select-selection {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon,\n  .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {\n    color: var(--theme-color);\n  }\n  .ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled) {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled) {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-input:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-input:focus {\n    border-color: var(--theme-hover-color);\n    box-shadow: var(--theme-shadow-color);\n  }\n  .ant-input-group-addon .ant-select-open .ant-select-selection,\n  .ant-input-group-addon .ant-select-focused .ant-select-selection {\n    color: var(--theme-color);\n  }\n  .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn:hover,\n  .ant-btn:focus {\n    color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn:active,\n  .ant-btn.active {\n    border-color: var(--theme-active-color);\n  }\n  .ant-btn-primary {\n    background-color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-btn-primary:hover,\n  .ant-btn-primary:focus {\n    color: #fff;\n    background-color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn-primary:active,\n  .ant-btn-primary.active {\n    background-color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-btn-danger:hover, .ant-btn-danger:focus {\n    color: #fff;\n    background-color: #ff7875;\n    border-color: #ff7875;\n  }\n  .ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child) {\n    border-right-color: var(--theme-hover-color);\n    border-left-color: var(--theme-hover-color);\n  }\n  .ant-btn-group .ant-btn-primary:first-child:not(:last-child) {\n    border-right-color: var(--theme-hover-color);\n  }\n  .ant-btn-group .ant-btn-primary:last-child:not(:first-child),\n  .ant-btn-group .ant-btn-primary + .ant-btn-primary {\n    border-left-color: var(--theme-hover-color);\n  }\n  .ant-btn-ghost:hover,\n  .ant-btn-ghost:focus {\n    color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn-ghost:active,\n  .ant-btn-ghost.active {\n    color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-btn-dashed:hover,\n  .ant-btn-dashed:focus {\n    color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn-dashed:active,\n  .ant-btn-dashed.active {\n    color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-btn-link {\n    color: var(--theme-color);\n  }\n  .ant-btn-link:hover,\n  .ant-btn-link:focus {\n    color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn-link:active,\n  .ant-btn-link.active {\n    color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-btn-background-ghost.ant-btn-primary {\n    color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-btn-background-ghost.ant-btn-primary:hover,\n  .ant-btn-background-ghost.ant-btn-primary:focus {\n    color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-btn-background-ghost.ant-btn-primary:active,\n  .ant-btn-background-ghost.ant-btn-primary.active {\n    color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-btn-background-ghost.ant-btn-link {\n    color: var(--theme-color);\n  }\n  .ant-btn-background-ghost.ant-btn-link:hover,\n  .ant-btn-background-ghost.ant-btn-link:focus {\n    color: var(--theme-hover-color);\n  }\n  .ant-btn-background-ghost.ant-btn-link:active,\n  .ant-btn-background-ghost.ant-btn-link.active {\n    color: var(--theme-active-color);\n  }\n  .ant-badge-status-processing {\n    background-color: var(--theme-color);\n  }\n  .ant-badge-status-processing::after {\n    border: 1px solid var(--theme-color);\n  }\n  .ant-badge-status-blue {\n    background: var(--theme-color);\n  }\n  .ant-breadcrumb a:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-menu-item > a:hover {\n    color: var(--theme-color);\n  }\n  .ant-menu-item:hover,\n  .ant-menu-item-active,\n  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,\n  .ant-menu-submenu-active,\n  .ant-menu-submenu-title:hover {\n    color: var(--theme-color);\n  }\n  .ant-menu-item-selected {\n    color: var(--theme-color);\n  }\n  .ant-menu-item-selected > a,\n  .ant-menu-item-selected > a:hover {\n    color: var(--theme-color);\n  }\n  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n  .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n  .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,\n  .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,\n  .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,\n  .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,\n  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {\n    background: -webkit-gradient(linear, left top, right top, from(var(--theme-color)), to(var(--theme-color)));\n    background: -webkit-linear-gradient(left, var(--theme-color), var(--theme-color));\n    background: linear-gradient(to right, var(--theme-color), var(--theme-color));\n  }\n  .ant-menu-vertical .ant-menu-submenu-selected,\n  .ant-menu-vertical-left .ant-menu-submenu-selected,\n  .ant-menu-vertical-right .ant-menu-submenu-selected {\n    color: var(--theme-color);\n  }\n  .ant-menu-vertical .ant-menu-submenu-selected > a,\n  .ant-menu-vertical-left .ant-menu-submenu-selected > a,\n  .ant-menu-vertical-right .ant-menu-submenu-selected > a {\n    color: var(--theme-color);\n  }\n  .ant-menu-horizontal > .ant-menu-item:hover,\n  .ant-menu-horizontal > .ant-menu-submenu:hover,\n  .ant-menu-horizontal > .ant-menu-item-active,\n  .ant-menu-horizontal > .ant-menu-submenu-active,\n  .ant-menu-horizontal > .ant-menu-item-open,\n  .ant-menu-horizontal > .ant-menu-submenu-open,\n  .ant-menu-horizontal > .ant-menu-item-selected,\n  .ant-menu-horizontal > .ant-menu-submenu-selected {\n    color: var(--theme-color);\n    border-bottom: 2px solid var(--theme-color);\n  }\n  .ant-menu-horizontal > .ant-menu-item > a:hover {\n    color: var(--theme-color);\n  }\n  .ant-menu-horizontal > .ant-menu-item-selected > a {\n    color: var(--theme-color);\n  }\n  .ant-menu-vertical .ant-menu-item::after,\n  .ant-menu-vertical-left .ant-menu-item::after,\n  .ant-menu-vertical-right .ant-menu-item::after,\n  .ant-menu-inline .ant-menu-item::after {\n    border-right: 3px solid var(--theme-color);\n  }\n  .ant-menu.ant-menu-dark .ant-menu-item-selected,\n  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {\n    background-color: var(--theme-color);\n  }\n  .ant-dropdown-menu-item-selected,\n  .ant-dropdown-menu-submenu-title-selected,\n  .ant-dropdown-menu-item-selected > a,\n  .ant-dropdown-menu-submenu-title-selected > a {\n    color: var(--theme-color);\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-dropdown-menu-item:hover,\n  .ant-dropdown-menu-submenu-title:hover {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected,\n  .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected:hover,\n  .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected > a {\n    background: var(--theme-color);\n  }\n  .ant-fullcalendar-value:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-fullcalendar-value:active {\n    background: var(--theme-color);\n  }\n  .ant-fullcalendar-today .ant-fullcalendar-value,\n  .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value {\n    -webkit-box-shadow: 0 0 0 1px var(--theme-color) inset;\n            box-shadow: 0 0 0 1px var(--theme-color) inset;\n  }\n  .ant-fullcalendar-selected-day .ant-fullcalendar-value,\n  .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value {\n    background: var(--theme-color);\n  }\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-month:hover,\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-date:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-month:active,\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-date:active {\n    background: var(--theme-shadow-color);\n  }\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-month,\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-today .ant-fullcalendar-date {\n    border-top-color: var(--theme-color);\n  }\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value,\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-value {\n    color: var(--theme-color);\n  }\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-month,\n  .ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-date {\n    background: var(--theme-shadow-color);\n  }\n  .ant-radio-wrapper:hover .ant-radio,\n  .ant-radio:hover .ant-radio-inner,\n  .ant-radio-input:focus + .ant-radio-inner {\n    border-color: var(--theme-color);\n  }\n  .ant-radio-checked::after {\n    border: 1px solid var(--theme-color);\n  }\n  .ant-radio-inner::after {\n    background-color: var(--theme-color);\n  }\n  .ant-radio-checked .ant-radio-inner {\n    border-color: var(--theme-color);\n  }\n  .ant-radio-button-wrapper:hover {\n    color: var(--theme-color);\n  }\n  .ant-radio-button-wrapper-checked {\n    color: var(--theme-color);\n    border-color: var(--theme-color);\n    -webkit-box-shadow: -1px 0 0 0 var(--theme-color);\n            box-shadow: -1px 0 0 0 var(--theme-color);\n  }\n  .ant-radio-button-wrapper-checked::before {\n    background-color: var(--theme-color) !important;\n    opacity: 0.1;\n  }\n  .ant-radio-button-wrapper-checked:first-child {\n    border-color: var(--theme-color);\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n  }\n  .ant-radio-button-wrapper-checked:hover {\n    color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: -1px 0 0 0 var(--theme-hover-color);\n            box-shadow: -1px 0 0 0 var(--theme-hover-color);\n  }\n  .ant-radio-button-wrapper-checked:active {\n    color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n    -webkit-box-shadow: -1px 0 0 0 var(--theme-active-color);\n            box-shadow: -1px 0 0 0 var(--theme-active-color);\n  }\n  .ant-radio-button-wrapper-checked:focus-within {\n    outline: 3px solid rgba(24, 144, 255, 0.06);\n  }\n  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {\n    color: #fff;\n    background: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {\n    color: #fff;\n    background: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active {\n    color: #fff;\n    background: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-card-actions > li > span:hover {\n    color: var(--theme-color);\n    -webkit-transition: color 0.3s;\n    transition: color 0.3s;\n  }\n  .ant-card-actions > li > span a:hover {\n    color: var(--theme-color);\n  }\n  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {\n    color: var(--theme-color);\n  }\n  .ant-tabs-extra-content .ant-tabs-new-tab:hover {\n    color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-tabs .ant-tabs-card-bar.ant-tabs-bottom-bar .ant-tabs-tab-active {\n    color: var(--theme-color);\n  }\n  .ant-tabs-ink-bar {\n    background-color: var(--theme-color);\n  }\n  .ant-tabs-nav .ant-tabs-tab:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-tabs-nav .ant-tabs-tab:active {\n    color: var(--theme-active-color);\n  }\n  .ant-tabs-nav .ant-tabs-tab-active {\n    color: var(--theme-color);\n  }\n  .ant-cascader-picker:focus .ant-cascader-input {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-cascader-picker-label:hover + .ant-cascader-input {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-cascader-menu-item:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-checkbox-wrapper:hover .ant-checkbox-inner,\n  .ant-checkbox:hover .ant-checkbox-inner,\n  .ant-checkbox-input:focus + .ant-checkbox-inner {\n    border-color: var(--theme-color);\n  }\n  .ant-checkbox-checked::after {\n    border: 1px solid var(--theme-color);\n  }\n  .ant-checkbox-checked .ant-checkbox-inner {\n    background-color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-checkbox-indeterminate .ant-checkbox-inner::after {\n    background-color: var(--theme-color);\n  }\n  .ant-calendar-selected-day .ant-calendar-date {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-picker:hover .ant-calendar-picker-input:not(.ant-input-disabled) {\n    border-color: var(--theme-color);\n  }\n  .ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled) {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-calendar-header a:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-calendar-date:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-date:active {\n    background: var(--theme-hover-color);\n  }\n  .ant-calendar-today .ant-calendar-date {\n    color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-calendar-selected-date .ant-calendar-date,\n  .ant-calendar-selected-start-date .ant-calendar-date,\n  .ant-calendar-selected-end-date .ant-calendar-date {\n    background: var(--theme-color);\n  }\n  .ant-calendar-selected-date .ant-calendar-date:hover,\n  .ant-calendar-selected-start-date .ant-calendar-date:hover,\n  .ant-calendar-selected-end-date .ant-calendar-date:hover {\n    background: var(--theme-color);\n  }\n  .ant-calendar .ant-calendar-ok-btn {\n    background-color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-calendar .ant-calendar-ok-btn:hover,\n  .ant-calendar .ant-calendar-ok-btn:focus {\n    background-color: var(--theme-hover-color);\n    border-color: var(--theme-hover-color);\n  }\n  .ant-calendar .ant-calendar-ok-btn:active,\n  .ant-calendar .ant-calendar-ok-btn.active {\n    background-color: var(--theme-active-color);\n    border-color: var(--theme-active-color);\n  }\n  .ant-calendar-range .ant-calendar-input:hover,\n  .ant-calendar-range .ant-calendar-time-picker-input:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-calendar-range .ant-calendar-input:focus,\n  .ant-calendar-range .ant-calendar-time-picker-input:focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-calendar-month-panel-header a:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month {\n    background: var(--theme-color);\n  }\n  .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month:hover {\n    background: var(--theme-color);\n  }\n  .ant-calendar-year-panel-header a:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year {\n    background: var(--theme-color);\n  }\n  .ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year:hover {\n    background: var(--theme-color);\n  }\n  .ant-calendar-decade-panel-header a:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade {\n    background: var(--theme-color);\n  }\n  .ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade:hover {\n    background: var(--theme-color);\n  }\n  .ant-calendar-range .ant-calendar-in-range-cell::before {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-time-picker-select li:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-month-panel-month:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-year-panel-year:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-decade-panel-decade:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-week-number .ant-calendar-body tr:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-calendar-week-number .ant-calendar-body tr.ant-calendar-active-week {\n    background: var(--theme-shadow-color);\n  }\n  .ant-time-picker-input:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-time-picker-input:focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-time-picker-panel-select li:hover {\n    background: var(--theme-shadow-color);\n  }\n  .ant-tag-checkable:not(.ant-tag-checkable-checked):hover {\n    color: var(--theme-color);\n  }\n  .ant-tag-checkable-checked {\n    background-color: var(--theme-color);\n  }\n  .ant-tag-checkable:active {\n    background-color: var(--theme-active-color);\n  }\n  .ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {\n    background-color: var(--theme-shadow-color);\n  }\n  .has-error .ant-transfer-list-search:not([disabled]):hover {\n    border-color: var(--theme-hover-color);\n    border-right-width: 1px !important;\n  }\n  .has-error .ant-transfer-list-search:not([disabled]):focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .is-validating.has-feedback .ant-form-item-children-icon {\n    color: var(--theme-color);\n  }\n  .ant-input-number:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-input-number:focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-input-number-handler:hover .ant-input-number-handler-up-inner,\n  .ant-input-number-handler:hover .ant-input-number-handler-down-inner {\n    color: var(--theme-hover-color);\n  }\n  .ant-input-number:hover {\n    border-color: var(--theme-hover-color);\n    border-right-width: 1px !important;\n  }\n  .ant-input-number-focused {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-list-item-meta-title > a:hover {\n    color: var(--theme-color);\n  }\n  .ant-spin {\n    color: var(--theme-color);\n  }\n  .ant-spin-dot-item {\n    background-color: var(--theme-color);\n  }\n  .ant-pagination-item:focus,\n  .ant-pagination-item:hover {\n    border-color: var(--theme-color);\n  }\n  .ant-pagination-item:focus a,\n  .ant-pagination-item:hover a {\n    color: var(--theme-color);\n  }\n  .ant-pagination-item-active {\n    border-color: var(--theme-color);\n  }\n  .ant-pagination-item-active a {\n    color: var(--theme-color);\n  }\n  .ant-pagination-item-active:focus,\n  .ant-pagination-item-active:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-pagination-item-active:focus a,\n  .ant-pagination-item-active:hover a {\n    color: var(--theme-hover-color);\n  }\n  .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,\n  .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {\n    color: var(--theme-color);\n  }\n  .ant-pagination-prev:hover a,\n  .ant-pagination-next:hover a {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-pagination-prev:focus .ant-pagination-item-link,\n  .ant-pagination-next:focus .ant-pagination-item-link,\n  .ant-pagination-prev:hover .ant-pagination-item-link,\n  .ant-pagination-next:hover .ant-pagination-item-link {\n    color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-pagination-options-quick-jumper input:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-pagination-options-quick-jumper input:focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-pagination-simple .ant-pagination-simple-pager input:hover {\n    border-color: var(--theme-color);\n  }\n  .ant-mention-wrapper .ant-mention-editor:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-mention-wrapper .ant-mention-editor:focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-mention-wrapper.ant-mention-active:not(.disabled) .ant-mention-editor {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-mention-dropdown-notfound.ant-mention-dropdown-item .anticon-loading {\n    color: var(--theme-color);\n  }\n  .ant-mentions:hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-mentions:focus {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-mentions-focused {\n    border-color: var(--theme-hover-color);\n    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);\n            box-shadow: 0 0 0 2px var(--theme-shadow-color);\n  }\n  .ant-mention-dropdown-item:hover {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-mention-dropdown-item.focus,\n  .ant-mention-dropdown-item-active {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-mentions-dropdown-menu-item:hover {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-mentions-dropdown-menu-item-active {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-message-info .anticon,\n  .ant-message-loading .anticon {\n    color: var(--theme-color);\n  }\n  .ant-modal-confirm-info .ant-modal-confirm-body > .anticon {\n    color: var(--theme-color);\n  }\n  .anticon.ant-notification-notice-icon-info {\n    color: var(--theme-color);\n  }\n  .ant-page-header-back-button {\n    color: var(--theme-color);\n  }\n  .ant-page-header-back-button:focus,\n  .ant-page-header-back-button:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-page-header-back-button:active {\n    color: var(--theme-active-color);\n  }\n  .ant-progress-circle-path {\n    stroke: var(--theme-color);\n  }\n  .ant-progress-success-bg,\n  .ant-progress-bg {\n    background-color: var(--theme-color);\n  }\n  .ant-slider {\n    width: 100%;\n  }\n  .ant-slider-track {\n    background-color: var(--theme-hover-color);\n  }\n  .ant-slider-handle {\n    border: solid 2px var(--theme-hover-color);\n  }\n  .ant-slider-handle:focus {\n    border-color: var(--theme-hover-color);\n    box-shadow: 0 0 0 5px var(--theme-shadow-color);\n    outline: none;\n  }\n  .ant-slider-handle.ant-tooltip-open {\n    border-color: var(--theme-color);\n  }\n  .ant-slider:hover .ant-slider-track {\n    background-color: var(--theme-hover-color);\n  }\n  .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-slider-dot-active {\n    border-color: var(--theme-active-color);\n  }\n  .ant-steps-item-icon > .ant-steps-icon {\n    color: var(--theme-color);\n  }\n  .ant-steps-item-process .ant-steps-item-icon {\n    background-color: #fff;\n    border-color: var(--theme-color);\n  }\n  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {\n    color: var(--theme-color);\n  }\n  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {\n    background: var(--theme-color);\n  }\n  .ant-steps-item-process .ant-steps-item-icon {\n    background: var(--theme-color);\n  }\n  .ant-steps-item-finish .ant-steps-item-icon {\n    border-color: var(--theme-color);\n  }\n  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {\n    color: var(--theme-color);\n  }\n  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {\n    background: var(--theme-color);\n  }\n  .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title::after {\n    background-color: var(--theme-color);\n  }\n  .ant-steps-item-finish > .ant-steps-item-tail::after {\n    background-color: var(--theme-color);\n  }\n  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-title,\n  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-description {\n    color: var(--theme-color);\n  }\n  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-icon {\n    border-color: var(--theme-color);\n  }\n  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-icon .ant-steps-icon {\n    color: var(--theme-color);\n  }\n  .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {\n    color: var(--theme-color);\n  }\n  .ant-switch-checked.ant-switch-loading .ant-switch-loading-icon {\n    color: var(--theme-color);\n  }\n  .ant-switch-checked {\n    background-color: var(--theme-color);\n  }\n  .ant-table-thead > tr > th .ant-table-filter-selected.anticon-filter {\n    color: var(--theme-color);\n  }\n  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-up.on,\n  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-down.on {\n    color: var(--theme-color);\n  }\n  .ant-table-filter-dropdown .ant-dropdown-menu .ant-dropdown-submenu-contain-selected .ant-dropdown-menu-submenu-title::after {\n    color: var(--theme-color);\n  }\n  .ant-table-filter-dropdown-link {\n    color: var(--theme-color);\n  }\n  .ant-table-filter-dropdown-link:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-table-filter-dropdown-link:active {\n    color: var(--theme-active-color);\n  }\n  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,\n  .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,\n  .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,\n  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {\n    background: var(--theme-shadow-color);\n  }\n  .ant-timeline-item-head-blue {\n    color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-select-tree-checkbox-wrapper:hover .ant-select-tree-checkbox-inner,\n  .ant-select-tree-checkbox:hover .ant-select-tree-checkbox-inner,\n  .ant-select-tree-checkbox-input:focus + .ant-select-tree-checkbox-inner {\n    border-color: var(--theme-color);\n  }\n  .ant-select-tree-checkbox-checked::after {\n    border: 1px solid var(--theme-color);\n  }\n  .ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner {\n    background-color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner::after {\n    background-color: var(--theme-color);\n  }\n  .ant-select-tree li span.ant-select-icon_loading .ant-select-switcher-loading-icon {\n    color: var(--theme-color);\n  }\n  .ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_open .ant-select-switcher-loading-icon,\n  .ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_close .ant-select-switcher-loading-icon {\n    color: var(--theme-color);\n  }\n  .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner,\n  .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner {\n    border-color: var(--theme-color);\n  }\n  .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after,\n  .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {\n    border-color: var(--theme-color);\n  }\n  .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before,\n  .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before {\n    background: var(--theme-color);\n  }\n  .ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,\n  .ant-tree-checkbox:hover .ant-tree-checkbox-inner,\n  .ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {\n    border-color: var(--theme-color);\n  }\n  .ant-tree-checkbox-checked::after {\n    border: 1px solid var(--theme-color);\n  }\n  .ant-tree-checkbox-checked .ant-tree-checkbox-inner {\n    background-color: var(--theme-color);\n    border-color: var(--theme-color);\n  }\n  .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {\n    background-color: var(--theme-color);\n  }\n  .ant-tree li.drag-over > span[draggable] {\n    background-color: var(--theme-color);\n  }\n  .ant-tree li.drag-over-gap-top > span[draggable] {\n    border-top-color: var(--theme-color);\n  }\n  .ant-tree li.drag-over-gap-bottom > span[draggable] {\n    border-bottom-color: var(--theme-color);\n  }\n  .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon,\n  .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon {\n    color: var(--theme-color);\n  }\n  .ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before,\n  .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover::before {\n    background: var(--theme-shadow-color);\n  }\n  .ant-tree li .ant-tree-node-content-wrapper:hover {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {\n    background-color: var(--theme-shadow-color);\n  }\n  .ant-typography a {\n    color: var(--theme-color);\n  }\n  .ant-typography a:focus,\n  .ant-typography a:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-typography a:active {\n    color: var(--theme-active-color);\n  }\n  .ant-typography-expand,\n  .ant-typography-edit,\n  .ant-typography-copy {\n    color: var(--theme-color);\n  }\n  .ant-typography-expand:focus,\n  .ant-typography-edit:focus,\n  .ant-typography-copy:focus,\n  .ant-typography-expand:hover,\n  .ant-typography-edit:hover,\n  .ant-typography-copy:hover {\n    color: var(--theme-hover-color);\n  }\n  .ant-typography-expand:active,\n  .ant-typography-edit:active,\n  .ant-typography-copy:active {\n    color: var(--theme-active-color);\n  }\n  .ant-upload.ant-upload-select-picture-card:hover {\n    border-color: var(--theme-color);\n  }\n  .ant-upload.ant-upload-drag.ant-upload-drag-hover:not(.ant-upload-disabled) {\n    border-color: var(--theme-active-color);\n  }\n  .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {\n    border-color: var(--theme-hover-color);\n  }\n  .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {\n    color: var(--theme-hover-color);\n  }\n".concat("\n  .ant-layout {\n    background: var(--theme-light-color);\n  }\n  ");
