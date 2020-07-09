export default `
:root {
    --customed-bg:#3C3C3C;
    --customed-color:#2C2C2C;
    --customed-font:#ABABAB;
    --customed-border:#3C3C3C;
}
.ant-btn-primary{
  background: #333;
  color:#9D9D9D;
}
.ant-btn-primary:hover{
  background: var(--theme-hover-color);
  color:#9D9D9D;
}

 .ant-btn:active, .ant-btn:focus{
  background: #333;
  color:#9D9D9D;
  border-color:#fff;
}

.ant-btn-link {
    color: var(--theme-light-color);
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


.ant-table {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(255,255,255,0.65);
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: tnum;
    position: relative;
    z-index: 0;
    clear: both;
    font-size: 14px;
    background: #141414;
    border-radius: 2px
}











.ant-table-footer {
    color: rgba(255,255,255,0.85);
    background: rgba(255,255,255,0.04)
}

.ant-table-thead>tr>th {
    color: rgba(255,255,255,0.85);
    background: #1d1d1d;
    border-bottom: 1px solid #303030;
}





.ant-table-tbody>tr>td {
    border-bottom: 1px solid #303030;
    transition: background .3s
}

.ant-table-tbody>tr.ant-table-row:hover>td {
    background: #262626
}

.ant-table-tbody>tr.ant-table-row-selected>td {
    background: #111b26;
}

.ant-table-tbody>tr.ant-table-row-selected:hover>td {
    background: #0e161f
}



.ant-table-tbody>tr .ant-table-wrapper:only-child .ant-table td {
    background: transparent
}





.ant-table tfoot>tr>th,.ant-table tfoot>tr>td {
    border-bottom: 1px solid #303030
}



.ant-table-thead th.ant-table-column-has-sorters:hover {
    background: #303030
}

.ant-table-thead th.ant-table-column-has-sorters:hover .ant-table-filter-trigger-container {
    background: #353535
}

.ant-table-thead th.ant-table-column-sort {
    background: #262626
}

td.ant-table-column-sort {
    background: rgba(255,255,255,0.01)
}




.ant-table-column-sorter {
    color: #bfbfbf
}




.ant-table-column-sorter-up.active,.ant-table-column-sorter-down.active {
    color: #177ddc
}





.ant-table-filter-trigger-container-open,.ant-table-filter-trigger-container:hover,.ant-table-thead th.ant-table-column-has-sorters:hover .ant-table-filter-trigger-container:hover {
    background: #434343
}

.ant-table-filter-trigger {
    color: #bfbfbf;
}


.ant-table-filter-trigger-container-open .ant-table-filter-trigger,.ant-table-filter-trigger:hover {
    color: rgba(255,255,255,0.45)
}

.ant-table-filter-trigger.active {
    color: #177ddc
}

.ant-table-filter-dropdown {
    color: rgba(255,255,255,0.65);
    background-color: #1f1f1f;
    box-shadow: 0 3px 6px -4px rgba(0,0,0,0.48),0 6px 16px 0 rgba(0,0,0,0.32),0 9px 28px 8px rgba(0,0,0,0.2)
}

.ant-table-filter-dropdown-btns {
    background-color: #1f1f1f;
    border-top: 1px solid #303030
}





.ant-table-selection-extra .anticon {
    color: #bfbfbf
}

.ant-table-selection-extra .anticon:hover {
    color: #a6a6a6
}



.ant-table-row-expand-icon {
    color: #177ddc;
    background: transparent;
    border: 1px solid #303030;
}

.ant-table-row-expand-icon:focus,.ant-table-row-expand-icon:hover {
    color: #165996
}

.ant-table-row-expand-icon:active {
    color: #388ed3
}

.ant-table-row-expand-icon-spaced {
    background: transparent;
    border: 0;
    visibility: hidden
}


tr.ant-table-expanded-row>td,tr.ant-table-expanded-row:hover>td {
    background: #1d1d1d
}

.ant-table-empty .ant-table-tbody>tr.ant-table-placeholder {
    color: rgba(255,255,255,0.3)
}

.ant-table-tbody>tr.ant-table-placeholder:hover>td {
    background: #141414
}

.ant-table-cell-fix-left,.ant-table-cell-fix-right {
    position: -webkit-sticky !important;
    position: sticky !important;
    z-index: 2;
    background: #141414
}
.ant-table-cell-fix-left-first::after,.ant-table-cell-fix-left-last::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: -1px;
    width: 30px;
    transform: translateX(100%);
    transition: box-shadow .3s;
    content: '';
    pointer-events: none
}

.ant-table-cell-fix-right-first::after,.ant-table-cell-fix-right-last::after {
    position: absolute;
    top: 0;
    bottom: -1px;
    left: 0;
    width: 30px;
    transform: translateX(-100%);
    transition: box-shadow .3s;
    content: '';
    pointer-events: none
}

.ant-table .ant-table-container::before,.ant-table .ant-table-container::after {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 30px;
    transition: box-shadow .3s;
    content: '';
    pointer-events: none
}




.ant-table-ping-left:not(.ant-table-has-fix-left) .ant-table-container::before {
    box-shadow: inset 10px 0 8px -8px rgba(0,0,0,0.45)
}

.ant-table-ping-left .ant-table-cell-fix-left-first::after,.ant-table-ping-left .ant-table-cell-fix-left-last::after {
    box-shadow: inset 10px 0 8px -8px rgba(0,0,0,0.45)
}

.ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container {
    position: relative
}

.ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container::after {
    box-shadow: inset -10px 0 8px -8px rgba(0,0,0,0.45)
}

.ant-table-ping-right .ant-table-cell-fix-right-first::after,.ant-table-ping-right .ant-table-cell-fix-right-last::after {
    box-shadow: inset -10px 0 8px -8px rgba(0,0,0,0.45)
}

.ant-card {
    background: var(--customed-color);
    color:var(--customed-font);
}
.ant-card-bordered{
    border: 1px solid var(--customed-border)
}
.ant-card-head{
    border-bottom: 1px solid var(--customed-border);
    color:var(--customed-font);
}
.ant-card-extra{
    color:var(--customed-font);
}
`