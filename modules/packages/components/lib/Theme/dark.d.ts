declare const _default: "\n:root {\n    --customed-bg:#3C3C3C;\n    --customed-color:#2C2C2C;\n    --customed-font:#ABABAB;\n    --customed-border:#3C3C3C;\n}\n\n.ant-modal-content{\n    background-color:var(--customed-color);\n    color:#aaa;\n}\n\n\n\n\n\n\n.ant-table {\n    background: var(--customed-color);\n    color:var(--customed-font);\n}\n\n.ant-table.ant-table-small thead > tr > th {\n    background: var(--customed-color);\n    color:var(--customed-font);\n}\n\n.ant-pagination,.ant-pagination-item a{\n    color:var(--customed-font);\n}\n\n.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis{\n    color:var(--customed-font);\n}\n.ant-form-item-label > label{\n    color:var(--customed-font);\n}\n\n\n\n\n\n.ant-table-footer,.ant-modal-header,.ant-modal-confirm-body .ant-modal-confirm-content,.ant-modal-confirm-body .ant-modal-confirm-title,.ant-modal-body,.ant-modal-title,.ant-layout-sider-light,.ant-menu {\n    color: var(--customed-font);\n    background: var(--customed-bg);\n}\n\n.ant-table-thead>tr>th {\n    color: var(--customed-font);\n    background: var(--customed-bg);\n    border-bottom: 1px solid #303030;\n}\n\n\n\n\n\n.ant-table-tbody>tr>td {\n    border-bottom: 1px solid #303030;\n    transition: background .3s\n}\n\n.ant-table-tbody>tr.ant-table-row:hover>td {\n    background: #262626\n}\n\n.ant-table-tbody>tr.ant-table-row-selected>td {\n    background: #111b26;\n}\n\n.ant-table-tbody>tr.ant-table-row-selected:hover>td {\n    background: #0e161f\n}\n\n\n\n.ant-table-tbody>tr .ant-table-wrapper:only-child .ant-table td {\n    background: transparent\n}\n\n\n\n\n\n.ant-table tfoot>tr>th,.ant-table tfoot>tr>td {\n    border-bottom: 1px solid #303030\n}\n\n\n\n.ant-table-thead th.ant-table-column-has-sorters:hover {\n    background: #303030\n}\n\n.ant-table-thead th.ant-table-column-has-sorters:hover .ant-table-filter-trigger-container {\n    background: #353535\n}\n\n.ant-table-thead th.ant-table-column-sort {\n    background: #262626\n}\n\ntd.ant-table-column-sort {\n    background: rgba(255,255,255,0.01)\n}\n\n\n\n\n.ant-table-column-sorter {\n    color: #bfbfbf\n}\n\n\n\n\n.ant-table-column-sorter-up.active,.ant-table-column-sorter-down.active {\n    color: #177ddc\n}\n\n\n\n\n\n.ant-table-filter-trigger-container-open,.ant-table-filter-trigger-container:hover,.ant-table-thead th.ant-table-column-has-sorters:hover .ant-table-filter-trigger-container:hover {\n    background: #434343\n}\n\n.ant-table-filter-trigger {\n    color: #bfbfbf;\n}\n\n\n.ant-table-filter-trigger-container-open .ant-table-filter-trigger,.ant-table-filter-trigger:hover {\n    color: rgba(255,255,255,0.45)\n}\n\n.ant-table-filter-trigger.active {\n    color: #177ddc\n}\n\n.ant-table-filter-dropdown {\n    color: rgba(255,255,255,0.65);\n    background-color: #1f1f1f;\n    box-shadow: 0 3px 6px -4px rgba(0,0,0,0.48),0 6px 16px 0 rgba(0,0,0,0.32),0 9px 28px 8px rgba(0,0,0,0.2)\n}\n\n\n\n\n\n\n\n\n\n\n.ant-table-row-expand-icon {\n    color: #177ddc;\n    background: transparent;\n    border: 1px solid #303030;\n}\n\n.ant-table-row-expand-icon:focus,.ant-table-row-expand-icon:hover {\n    color: #165996\n}\n\n.ant-table-row-expand-icon:active {\n    color: #388ed3\n}\n\n.ant-table-row-expand-icon-spaced {\n    background: transparent;\n    border: 0;\n    visibility: hidden\n}\n\n\ntr.ant-table-expanded-row>td,tr.ant-table-expanded-row:hover>td {\n    background: #1d1d1d\n}\n\n.ant-table-empty .ant-table-tbody>tr.ant-table-placeholder {\n    color: rgba(255,255,255,0.3)\n}\n\n.ant-table-tbody>tr.ant-table-placeholder:hover>td {\n    background: #141414\n}\n\n.ant-table-cell-fix-left,.ant-table-cell-fix-right {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    z-index: 2;\n    background: #141414\n}\n.ant-table-cell-fix-left-first::after,.ant-table-cell-fix-left-last::after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: -1px;\n    width: 30px;\n    transform: translateX(100%);\n    transition: box-shadow .3s;\n    content: '';\n    pointer-events: none\n}\n\n.ant-table-cell-fix-right-first::after,.ant-table-cell-fix-right-last::after {\n    position: absolute;\n    top: 0;\n    bottom: -1px;\n    left: 0;\n    width: 30px;\n    transform: translateX(-100%);\n    transition: box-shadow .3s;\n    content: '';\n    pointer-events: none\n}\n\n.ant-table .ant-table-container::before,.ant-table .ant-table-container::after {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    z-index: 1;\n    width: 30px;\n    transition: box-shadow .3s;\n    content: '';\n    pointer-events: none\n}\n\n\n\n\n.ant-table-ping-left:not(.ant-table-has-fix-left) .ant-table-container::before {\n    box-shadow: inset 10px 0 8px -8px rgba(0,0,0,0.45)\n}\n\n.ant-table-ping-left .ant-table-cell-fix-left-first::after,.ant-table-ping-left .ant-table-cell-fix-left-last::after {\n    box-shadow: inset 10px 0 8px -8px rgba(0,0,0,0.45)\n}\n\n.ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container {\n    position: relative\n}\n\n.ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container::after {\n    box-shadow: inset -10px 0 8px -8px rgba(0,0,0,0.45)\n}\n\n.ant-table-ping-right .ant-table-cell-fix-right-first::after,.ant-table-ping-right .ant-table-cell-fix-right-last::after {\n    box-shadow: inset -10px 0 8px -8px rgba(0,0,0,0.45)\n}\n\n.ant-card {\n    background: var(--customed-color);\n    color:var(--customed-font);\n}\n.ant-card-bordered{\n    border: 1px solid var(--customed-border)\n}\n.ant-card-head{\n    border-bottom: 1px solid var(--customed-border);\n    color:var(--customed-font);\n}\n.ant-card-extra{\n    color:var(--customed-font);\n}\n.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{\n    border-right: 1px solid var(--customed-bg);\n\n}\n\n";
export default _default;
