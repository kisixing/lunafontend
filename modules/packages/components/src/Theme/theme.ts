import darkTheme from './dark'
export const DARK_COLOR = "#1c1c1c"

export default `
  a {
    color: var(--theme-color);
  }
  a:hover {
    color: var(--theme-hover-color);
  }
  a:active {
    color: var(--theme-active-color);
  }
  ::-moz-selection {
    background: var(--theme-color);
  }
  ::selection {
    background: var(--theme-color);
  }
  html {
    --antd-wave-shadow-color: var(--theme-color);
  }
  [ant-click-animating-without-extra-node='true']::after,
  .ant-click-animating-node {
    -webkit-box-shadow: 0 0 0 0 var(--theme-color);
            box-shadow: 0 0 0 0 var(--theme-color);
    -webkit-box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);
            box-shadow: 0 0 0 0 var(--antd-wave-shadow-color);
  }
  @-webkit-keyframes waveEffect {
    100% {
      -webkit-box-shadow: 0 0 0 var(--theme-color);
              box-shadow: 0 0 0 var(--theme-color);
      -webkit-box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
              box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
    }
  }
  @keyframes waveEffect {
    100% {
      -webkit-box-shadow: 0 0 0 var(--theme-color);
              box-shadow: 0 0 0 var(--theme-color);
      -webkit-box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
              box-shadow: 0 0 0 6px var(--antd-wave-shadow-color);
    }
  }
  .ant-alert-info .ant-alert-icon {
    color: var(--theme-color);
  }
  .ant-anchor-ink-ball {
    border: 2px solid var(--theme-color);
  }
  .ant-anchor-link-active > .ant-anchor-link-title {
    color: var(--theme-color);
  }
  .ant-select-auto-complete.ant-select .ant-input:focus,
  .ant-select-auto-complete.ant-select .ant-input:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-select-selection:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-select-focused .ant-select-selection,
  .ant-select-selection:focus,
  .ant-select-selection:active {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-select-open .ant-select-selection {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon,
  .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {
    color: var(--theme-color);
  }
  .ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled) {
    background-color: var(--theme-shadow-color);
  }
  .ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled) {
    background-color: var(--theme-shadow-color);
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: var(--theme-hover-color);
  }
  .ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
    box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-input:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-input:focus {
    border-color: var(--theme-hover-color);
    box-shadow: var(--theme-shadow-color);
  }
  .ant-input-group-addon .ant-select-open .ant-select-selection,
  .ant-input-group-addon .ant-select-focused .ant-select-selection {
    color: var(--theme-color);
  }
  .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
    border-color: var(--theme-hover-color);
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-btn:active,
  .ant-btn.active {
    border-color: var(--theme-active-color);
  }
  .ant-btn-primary {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-btn-primary:hover,
  .ant-btn-primary:focus {
    color: #fff;
    background-color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-btn-primary:active,
  .ant-btn-primary.active {
    background-color: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-btn-danger:hover, .ant-btn-danger:focus {
    color: #fff;
    background-color: #ff7875;
    border-color: #ff7875;
  }
  .ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child) {
    border-right-color: var(--theme-hover-color);
    border-left-color: var(--theme-hover-color);
  }
  .ant-btn-group .ant-btn-primary:first-child:not(:last-child) {
    border-right-color: var(--theme-hover-color);
  }
  .ant-btn-group .ant-btn-primary:last-child:not(:first-child),
  .ant-btn-group .ant-btn-primary + .ant-btn-primary {
    border-left-color: var(--theme-hover-color);
  }
  .ant-btn-ghost:hover,
  .ant-btn-ghost:focus {
    color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-btn-ghost:active,
  .ant-btn-ghost.active {
    color: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-btn-dashed:hover,
  .ant-btn-dashed:focus {
    color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-btn-dashed:active,
  .ant-btn-dashed.active {
    color: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-btn-link {
    color: var(--customed-font);
  }
  .ant-btn-link:hover,
  .ant-btn-link:focus {
    color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-btn-link:active,
  .ant-btn-link.active {
    color: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-btn-background-ghost.ant-btn-primary {
    color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-btn-background-ghost.ant-btn-primary:hover,
  .ant-btn-background-ghost.ant-btn-primary:focus {
    color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-btn-background-ghost.ant-btn-primary:active,
  .ant-btn-background-ghost.ant-btn-primary.active {
    color: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-btn-background-ghost.ant-btn-link {
    color: var(--theme-color);
  }
  .ant-btn-background-ghost.ant-btn-link:hover,
  .ant-btn-background-ghost.ant-btn-link:focus {
    color: var(--theme-hover-color);
  }
  .ant-btn-background-ghost.ant-btn-link:active,
  .ant-btn-background-ghost.ant-btn-link.active {
    color: var(--theme-active-color);
  }
  .ant-badge-status-processing {
    background-color: var(--theme-color);
  }
  .ant-badge-status-processing::after {
    border: 1px solid var(--theme-color);
  }
  .ant-badge-status-blue {
    background: var(--theme-color);
  }
  .ant-breadcrumb a:hover {
    color: var(--theme-hover-color);
  }
  .ant-menu-item > a:hover {
    color: var(--theme-color);
  }
  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    color: var(--theme-color);
  }
  .ant-menu-item-selected {
    color: var(--theme-color);
  }
  .ant-menu-item-selected > a,
  .ant-menu-item-selected > a:hover {
    color: var(--theme-color);
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: var(--theme-shadow-color);
  }
  .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
  .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
  .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
  .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {
    background: -webkit-gradient(linear, left top, right top, from(var(--theme-color)), to(var(--theme-color)));
    background: -webkit-linear-gradient(left, var(--theme-color), var(--theme-color));
    background: linear-gradient(to right, var(--theme-color), var(--theme-color));
  }
  .ant-menu-vertical .ant-menu-submenu-selected,
  .ant-menu-vertical-left .ant-menu-submenu-selected,
  .ant-menu-vertical-right .ant-menu-submenu-selected {
    color: var(--theme-color);
  }
  .ant-menu-vertical .ant-menu-submenu-selected > a,
  .ant-menu-vertical-left .ant-menu-submenu-selected > a,
  .ant-menu-vertical-right .ant-menu-submenu-selected > a {
    color: var(--theme-color);
  }
  .ant-menu-horizontal > .ant-menu-item:hover,
  .ant-menu-horizontal > .ant-menu-submenu:hover,
  .ant-menu-horizontal > .ant-menu-item-active,
  .ant-menu-horizontal > .ant-menu-submenu-active,
  .ant-menu-horizontal > .ant-menu-item-open,
  .ant-menu-horizontal > .ant-menu-submenu-open,
  .ant-menu-horizontal > .ant-menu-item-selected,
  .ant-menu-horizontal > .ant-menu-submenu-selected {
    color: var(--theme-color);
    border-bottom: 2px solid var(--theme-color);
  }
  .ant-menu-horizontal > .ant-menu-item > a:hover {
    color: var(--theme-color);
  }
  .ant-menu-horizontal > .ant-menu-item-selected > a {
    color: var(--theme-color);
  }
  .ant-menu-vertical .ant-menu-item::after,
  .ant-menu-vertical-left .ant-menu-item::after,
  .ant-menu-vertical-right .ant-menu-item::after,
  .ant-menu-inline .ant-menu-item::after {
    border-right: 3px solid var(--theme-color);
  }
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: var(--theme-color);
  }
  .ant-dropdown-menu-item-selected,
  .ant-dropdown-menu-submenu-title-selected,
  .ant-dropdown-menu-item-selected > a,
  .ant-dropdown-menu-submenu-title-selected > a {
    color: var(--theme-color);
    background-color: var(--theme-shadow-color);
  }
  .ant-dropdown-menu-item:hover,
  .ant-dropdown-menu-submenu-title:hover {
    background-color: var(--theme-shadow-color);
  }
  .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected,
  .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected:hover,
  .ant-dropdown-menu-dark .ant-dropdown-menu-item-selected > a {
    background: var(--theme-color);
  }
  .ant-fullcalendar-value:hover {
    background: var(--theme-shadow-color);
  }
  .ant-fullcalendar-value:active {
    background: var(--theme-color);
  }
  .ant-fullcalendar-today .ant-fullcalendar-value,
  .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value {
    -webkit-box-shadow: 0 0 0 1px var(--theme-color) inset;
            box-shadow: 0 0 0 1px var(--theme-color) inset;
  }
  .ant-fullcalendar-selected-day .ant-fullcalendar-value,
  .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value {
    background: var(--theme-color);
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month:hover,
  .ant-fullcalendar-fullscreen .ant-fullcalendar-date:hover {
    background: var(--theme-shadow-color);
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month:active,
  .ant-fullcalendar-fullscreen .ant-fullcalendar-date:active {
    background: var(--theme-shadow-color);
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-month,
  .ant-fullcalendar-fullscreen .ant-fullcalendar-today .ant-fullcalendar-date {
    border-top-color: var(--theme-color);
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value,
  .ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-value {
    color: var(--theme-color);
  }
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-month,
  .ant-fullcalendar-fullscreen .ant-fullcalendar-selected-day .ant-fullcalendar-date {
    background: var(--theme-shadow-color);
  }
  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: var(--theme-color);
  }
  .ant-radio-checked::after {
    border: 1px solid var(--theme-color);
  }
  .ant-radio-inner::after {
    background-color: var(--theme-color);
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: var(--theme-color);
  }
  .ant-radio-button-wrapper:hover {
    color: var(--theme-color);
  }
  .ant-radio-button-wrapper-checked {
    color: var(--theme-color);
    border-color: var(--theme-color);
    -webkit-box-shadow: -1px 0 0 0 var(--theme-color);
            box-shadow: -1px 0 0 0 var(--theme-color);
  }
  .ant-radio-button-wrapper-checked::before {
    background-color: var(--theme-color) !important;
    opacity: 0.1;
  }
  .ant-radio-button-wrapper-checked:first-child {
    border-color: var(--theme-color);
    -webkit-box-shadow: none !important;
            box-shadow: none !important;
  }
  .ant-radio-button-wrapper-checked:hover {
    color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: -1px 0 0 0 var(--theme-hover-color);
            box-shadow: -1px 0 0 0 var(--theme-hover-color);
  }
  .ant-radio-button-wrapper-checked:active {
    color: var(--theme-active-color);
    border-color: var(--theme-active-color);
    -webkit-box-shadow: -1px 0 0 0 var(--theme-active-color);
            box-shadow: -1px 0 0 0 var(--theme-active-color);
  }
  .ant-radio-button-wrapper-checked:focus-within {
    outline: 3px solid rgba(24, 144, 255, 0.06);
  }
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: #fff;
    background: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    color: #fff;
    background: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active {
    color: #fff;
    background: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-card-actions > li > span:hover {
    color: var(--theme-color);
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
  }
  .ant-card-actions > li > span a:hover {
    color: var(--theme-color);
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
    color: var(--theme-color);
  }
  .ant-tabs-extra-content .ant-tabs-new-tab:hover {
    color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-tabs .ant-tabs-card-bar.ant-tabs-bottom-bar .ant-tabs-tab-active {
    color: var(--theme-color);
  }
  .ant-tabs-ink-bar {
    background-color: var(--theme-color);
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: var(--theme-hover-color);
  }
  .ant-tabs-nav .ant-tabs-tab:active {
    color: var(--theme-active-color);
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    color: var(--theme-color);
  }
  .ant-cascader-picker:focus .ant-cascader-input {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-cascader-picker-label:hover + .ant-cascader-input {
    border-color: var(--theme-hover-color);
  }
  .ant-cascader-menu-item:hover {
    background: var(--theme-shadow-color);
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: var(--theme-color);
  }
  .ant-checkbox-checked::after {
    border: 1px solid var(--theme-color);
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: var(--theme-color);
  }
  .ant-calendar-selected-day .ant-calendar-date {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-picker:hover .ant-calendar-picker-input:not(.ant-input-disabled) {
    border-color: var(--theme-color);
  }
  .ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled) {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-calendar-header a:hover {
    color: var(--theme-hover-color);
  }
  .ant-calendar-date:hover {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-date:active {
    background: var(--theme-hover-color);
  }
  .ant-calendar-today .ant-calendar-date {
    color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-calendar-selected-date .ant-calendar-date,
  .ant-calendar-selected-start-date .ant-calendar-date,
  .ant-calendar-selected-end-date .ant-calendar-date {
    background: var(--theme-color);
  }
  .ant-calendar-selected-date .ant-calendar-date:hover,
  .ant-calendar-selected-start-date .ant-calendar-date:hover,
  .ant-calendar-selected-end-date .ant-calendar-date:hover {
    background: var(--theme-color);
  }
  .ant-calendar .ant-calendar-ok-btn {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-calendar .ant-calendar-ok-btn:hover,
  .ant-calendar .ant-calendar-ok-btn:focus {
    background-color: var(--theme-hover-color);
    border-color: var(--theme-hover-color);
  }
  .ant-calendar .ant-calendar-ok-btn:active,
  .ant-calendar .ant-calendar-ok-btn.active {
    background-color: var(--theme-active-color);
    border-color: var(--theme-active-color);
  }
  .ant-calendar-range .ant-calendar-input:hover,
  .ant-calendar-range .ant-calendar-time-picker-input:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-calendar-range .ant-calendar-input:focus,
  .ant-calendar-range .ant-calendar-time-picker-input:focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-calendar-month-panel-header a:hover {
    color: var(--theme-hover-color);
  }
  .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month {
    background: var(--theme-color);
  }
  .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month:hover {
    background: var(--theme-color);
  }
  .ant-calendar-year-panel-header a:hover {
    color: var(--theme-hover-color);
  }
  .ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year {
    background: var(--theme-color);
  }
  .ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year:hover {
    background: var(--theme-color);
  }
  .ant-calendar-decade-panel-header a:hover {
    color: var(--theme-hover-color);
  }
  .ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade {
    background: var(--theme-color);
  }
  .ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade:hover {
    background: var(--theme-color);
  }
  .ant-calendar-range .ant-calendar-in-range-cell::before {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-time-picker-select li:hover {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-month-panel-month:hover {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-year-panel-year:hover {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-decade-panel-decade:hover {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-week-number .ant-calendar-body tr:hover {
    background: var(--theme-shadow-color);
  }
  .ant-calendar-week-number .ant-calendar-body tr.ant-calendar-active-week {
    background: var(--theme-shadow-color);
  }
  .ant-time-picker-input:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-time-picker-input:focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-time-picker-panel-select li:hover {
    background: var(--theme-shadow-color);
  }
  .ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
    color: var(--theme-color);
  }
  .ant-tag-checkable-checked {
    background-color: var(--theme-color);
  }
  .ant-tag-checkable:active {
    background-color: var(--theme-active-color);
  }
  .ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
    background-color: var(--theme-shadow-color);
  }
  .has-error .ant-transfer-list-search:not([disabled]):hover {
    border-color: var(--theme-hover-color);
    border-right-width: 1px !important;
  }
  .has-error .ant-transfer-list-search:not([disabled]):focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .is-validating.has-feedback .ant-form-item-children-icon {
    color: var(--theme-color);
  }
  .ant-input-number:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-input-number:focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-input-number-handler:hover .ant-input-number-handler-up-inner,
  .ant-input-number-handler:hover .ant-input-number-handler-down-inner {
    color: var(--theme-hover-color);
  }
  .ant-input-number:hover {
    border-color: var(--theme-hover-color);
    border-right-width: 1px !important;
  }
  .ant-input-number-focused {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-list-item-meta-title > a:hover {
    color: var(--theme-color);
  }
  .ant-spin {
    color: var(--theme-color);
  }
  .ant-spin-dot-item {
    background-color: var(--theme-color);
  }
  .ant-pagination-item:focus,
  .ant-pagination-item:hover {
    border-color: var(--theme-color);
  }
  .ant-pagination-item:focus a,
  .ant-pagination-item:hover a {
    color: var(--theme-color);
  }
  .ant-pagination-item-active {
    border-color: var(--theme-color);
  }
  .ant-pagination-item-active a {
    color: var(--theme-color);
  }
  .ant-pagination-item-active:focus,
  .ant-pagination-item-active:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-pagination-item-active:focus a,
  .ant-pagination-item-active:hover a {
    color: var(--theme-hover-color);
  }
  .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
  .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: var(--theme-color);
  }
  .ant-pagination-prev:hover a,
  .ant-pagination-next:hover a {
    border-color: var(--theme-hover-color);
  }
  .ant-pagination-prev:focus .ant-pagination-item-link,
  .ant-pagination-next:focus .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-pagination-options-quick-jumper input:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-pagination-options-quick-jumper input:focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-pagination-simple .ant-pagination-simple-pager input:hover {
    border-color: var(--theme-color);
  }
  .ant-mention-wrapper .ant-mention-editor:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-mention-wrapper .ant-mention-editor:focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-mention-wrapper.ant-mention-active:not(.disabled) .ant-mention-editor {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-mention-dropdown-notfound.ant-mention-dropdown-item .anticon-loading {
    color: var(--theme-color);
  }
  .ant-mentions:hover {
    border-color: var(--theme-hover-color);
  }
  .ant-mentions:focus {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-mentions-focused {
    border-color: var(--theme-hover-color);
    -webkit-box-shadow: 0 0 0 2px var(--theme-shadow-color);
            box-shadow: 0 0 0 2px var(--theme-shadow-color);
  }
  .ant-mention-dropdown-item:hover {
    background-color: var(--theme-shadow-color);
  }
  .ant-mention-dropdown-item.focus,
  .ant-mention-dropdown-item-active {
    background-color: var(--theme-shadow-color);
  }
  .ant-mentions-dropdown-menu-item:hover {
    background-color: var(--theme-shadow-color);
  }
  .ant-mentions-dropdown-menu-item-active {
    background-color: var(--theme-shadow-color);
  }
  .ant-message-info .anticon,
  .ant-message-loading .anticon {
    color: var(--theme-color);
  }
  .ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
    color: var(--theme-color);
  }
  .anticon.ant-notification-notice-icon-info {
    color: var(--theme-color);
  }
  .ant-page-header-back-button {
    color: var(--theme-color);
  }
  .ant-page-header-back-button:focus,
  .ant-page-header-back-button:hover {
    color: var(--theme-hover-color);
  }
  .ant-page-header-back-button:active {
    color: var(--theme-active-color);
  }
  .ant-progress-circle-path {
    stroke: var(--theme-color);
  }
  .ant-progress-success-bg,
  .ant-progress-bg {
    background-color: var(--theme-color);
  }
  .ant-slider {
    width: 100%;
  }
  .ant-slider-track {
    background-color: var(--theme-hover-color);
  }
  .ant-slider-handle {
    border: solid 2px var(--theme-hover-color);
  }
  .ant-slider-handle:focus {
    border-color: var(--theme-hover-color);
    box-shadow: 0 0 0 5px var(--theme-shadow-color);
    outline: none;
  }
  .ant-slider-handle.ant-tooltip-open {
    border-color: var(--theme-color);
  }
  .ant-slider:hover .ant-slider-track {
    background-color: var(--theme-hover-color);
  }
  .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: var(--theme-hover-color);
  }
  .ant-slider-dot-active {
    border-color: var(--theme-active-color);
  }
  .ant-steps-item-icon > .ant-steps-icon {
    color: var(--theme-color);
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #fff;
    border-color: var(--theme-color);
  }
  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: var(--theme-color);
  }
  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
    background: var(--theme-color);
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background: var(--theme-color);
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: var(--theme-color);
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: var(--theme-color);
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
    background: var(--theme-color);
  }
  .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title::after {
    background-color: var(--theme-color);
  }
  .ant-steps-item-finish > .ant-steps-item-tail::after {
    background-color: var(--theme-color);
  }
  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-title,
  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-description {
    color: var(--theme-color);
  }
  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-icon {
    border-color: var(--theme-color);
  }
  .ant-steps-item[role='button']:not(.ant-steps-item-process):hover .ant-steps-item-icon .ant-steps-icon {
    color: var(--theme-color);
  }
  .ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: var(--theme-color);
  }
  .ant-switch-checked.ant-switch-loading .ant-switch-loading-icon {
    color: var(--theme-color);
  }
  .ant-switch-checked {
    background-color: var(--theme-color);
  }
  .ant-table-thead > tr > th .ant-table-filter-selected.anticon-filter {
    color: var(--theme-color);
  }
  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-up.on,
  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-down.on {
    color: var(--theme-color);
  }
  .ant-table-filter-dropdown .ant-dropdown-menu .ant-dropdown-submenu-contain-selected .ant-dropdown-menu-submenu-title::after {
    color: var(--theme-color);
  }
  .ant-table-filter-dropdown-link {
    color: var(--theme-color);
  }
  .ant-table-filter-dropdown-link:hover {
    color: var(--theme-hover-color);
  }
  .ant-table-filter-dropdown-link:active {
    color: var(--theme-active-color);
  }
  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: var(--theme-shadow-color);
  }
  .ant-table tbody > tr.ant-table-row-selected > td{
    background:var(--theme-shadow-color);
  }
  .ant-table tbody > tr.ant-table-row:hover > td {
    background:var(--theme-shadow-color);
  }
  .ant-timeline-item-head-blue {
    color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-select-tree-checkbox-wrapper:hover .ant-select-tree-checkbox-inner,
  .ant-select-tree-checkbox:hover .ant-select-tree-checkbox-inner,
  .ant-select-tree-checkbox-input:focus + .ant-select-tree-checkbox-inner {
    border-color: var(--theme-color);
  }
  .ant-select-tree-checkbox-checked::after {
    border: 1px solid var(--theme-color);
  }
  .ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner::after {
    background-color: var(--theme-color);
  }
  .ant-select-tree li span.ant-select-icon_loading .ant-select-switcher-loading-icon {
    color: var(--theme-color);
  }
  .ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_open .ant-select-switcher-loading-icon,
  .ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_close .ant-select-switcher-loading-icon {
    color: var(--theme-color);
  }
  .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {
    background-color: var(--theme-shadow-color);
  }
  .ant-select-tree li .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected {
    background-color: var(--theme-shadow-color);
  }
  .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner,
  .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox .ant-tree-checkbox-inner {
    border-color: var(--theme-color);
  }
  .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after,
  .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-checkbox.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {
    border-color: var(--theme-color);
  }
  .ant-tree.ant-tree-directory > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before,
  .ant-tree.ant-tree-directory .ant-tree-child-tree > li.ant-tree-treenode-selected > span.ant-tree-node-content-wrapper::before {
    background: var(--theme-color);
  }
  .ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,
  .ant-tree-checkbox:hover .ant-tree-checkbox-inner,
  .ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {
    border-color: var(--theme-color);
  }
  .ant-tree-checkbox-checked::after {
    border: 1px solid var(--theme-color);
  }
  .ant-tree-checkbox-checked .ant-tree-checkbox-inner {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }
  .ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
    background-color: var(--theme-color);
  }
  .ant-tree li.drag-over > span[draggable] {
    background-color: var(--theme-color);
  }
  .ant-tree li.drag-over-gap-top > span[draggable] {
    border-top-color: var(--theme-color);
  }
  .ant-tree li.drag-over-gap-bottom > span[draggable] {
    border-bottom-color: var(--theme-color);
  }
  .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_open .ant-tree-switcher-loading-icon,
  .ant-tree li.ant-tree-treenode-loading span.ant-tree-switcher.ant-tree-switcher_close .ant-tree-switcher-loading-icon {
    color: var(--theme-color);
  }
  .ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before,
  .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover::before {
    background: var(--theme-shadow-color);
  }
  .ant-tree li .ant-tree-node-content-wrapper:hover {
    background-color: var(--theme-shadow-color);
  }
  .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: var(--theme-shadow-color);
  }
  .ant-typography a {
    color: var(--theme-color);
  }
  .ant-typography a:focus,
  .ant-typography a:hover {
    color: var(--theme-hover-color);
  }
  .ant-typography a:active {
    color: var(--theme-active-color);
  }
  .ant-typography-expand,
  .ant-typography-edit,
  .ant-typography-copy {
    color: var(--theme-color);
  }
  .ant-typography-expand:focus,
  .ant-typography-edit:focus,
  .ant-typography-copy:focus,
  .ant-typography-expand:hover,
  .ant-typography-edit:hover,
  .ant-typography-copy:hover {
    color: var(--theme-hover-color);
  }
  .ant-typography-expand:active,
  .ant-typography-edit:active,
  .ant-typography-copy:active {
    color: var(--theme-active-color);
  }
  .ant-upload.ant-upload-select-picture-card:hover {
    border-color: var(--theme-color);
  }
  .ant-upload.ant-upload-drag.ant-upload-drag-hover:not(.ant-upload-disabled) {
    border-color: var(--theme-active-color);
  }
  .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: var(--theme-hover-color);
  }
  .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
    color: var(--theme-hover-color);
  }
`
  .concat(
    `
  .ant-layout {
    background: var(--customed-bg);
  }
  `
  )
  ;

export function configDark(base: string) {
  return base
    .concat(
      `
      :root {
        --theme-bg:${DARK_COLOR};
      }
      `
    )
    .concat(
      darkTheme
    )
}