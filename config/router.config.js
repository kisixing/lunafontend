export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/index',
      },
      {
        // 基本信息(孕册)
        path: '/pregnancy',
        name: 'pregnancy',
        icon: 'idcard',
        component: './Pregnancy',
      },
      {
        // 首检信息
        path: '/first-check',
        name: 'firstCheck',
        icon: 'check',
        component: './FirstInspection',
      },
      {
        // 复诊记录
        path: '/visit-record',
        name: 'visitRecord',
        icon: 'snippets',
        component: './VisitRecord',
      },
      {
        // 高危记录
        path: '/risk-record',
        name: 'riskRecord',
        icon: 'exclamation',
        // component: './Dashboard/Workplace',
      },
      {
        // 艾梅乙记录
        path: '/HIV-syphilis-hepatitisB-record',
        name: 'HSHRecord',
        icon: 'warning',
        // component: './Dashboard/Workplace',
      },
      {
        // 影像检查报告
        path: '/image-examination-report',
        name: 'imageExamination',
        icon: 'video-camera',
        // component: './Dashboard/Workplace',
      },
      {
        // 基因检测报告
        path: '/gene-detection-report',
        name: 'geneDetection',
        icon: 'deployment-unit',
        // component: './Dashboard/Workplace',
      },
      {
        // 外院报告
        path: '/other-hospital-report',
        name: 'otherHospitalReport',
        icon: 'file-text',
        // component: './Dashboard/Workplace',
      },
      {
        // 实验检查
        path: '/experiment-check',
        name: 'experimentCheck',
        icon: 'experiment',
        // component: './Dashboard/Workplace',
      },
      {
        // 体重管理
        path: '/weight-management',
        name: 'weightManagement',
        icon: 'dashboard',
        component: './Weight/LineChart',
      },
      {
        // 宫高腹围图
        path: '/palace-high-abdominal-map',
        name: 'palaceHighAbdominalMap',
        icon: 'project',
        // component: './Dashboard/Workplace',
      },
      {
        // 孕妇通知
        path: '/notification',
        name: 'notification',
        icon: 'notification',
        // component: './Dashboard/Workplace',
      },
      {
        // 电子报告
        path: '/electronic-report',
        name: 'electronicReport',
        icon: 'file-pdf',
        // component: './Dashboard/Workplace',
      },
      {
        // 统计管理
        name: 'statistical',
        path: '/statistical',
        icon: 'profile',
        routes: [
          {
            name: 'outpatientService',
            path: '/statistical/outpatient-service',
            icon: 'ordered-list',
            routes: [
              {
                name: 'fileCreate',
                path: '/statistical/outpatient-service/file-create/',
                icon: 'file',
                component: './Statistical/FileCreate',
              }
            ]
          }
        ]
      },
      {
        // 随访管理
        name: 'followUp',
        path: '/follow-up',
        icon: 'file-protect',
        routes: [
          {
            name: 'followUpQuestionnaire',
            path: '/follow-up/questionnaire',
            icon: 'file',
            component: './FollowUp/Questionnaire',
          }
        ]
      },
      {
        // 角色/权限管理
        name: 'management',
        path: '/management',
        icon: 'setting',
        routes: [
          {
            name: 'userManagement',
            path: '/management/user',
            component: './Management/User',
          },
          {
            name: 'roleManagement',
            path: '/management/role',
            component: './Management/Role',
          },
          {
            name: 'permissionManagement',
            path: '/management/permission',
            component: './Management/Permission',
          },
          {
            name: 'menuManagement',
            path: '/management/menu',
            // component: './Management/Menu',
          }
        ]
        // component: './Dashboard/Workplace',
      },
      // 异常处理页面
      {
        name: 'exception',
        icon: 'warning',
        hideInMenu: true,
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      // 个人页
      {
        name: 'account',
        icon: 'user',
        hideInMenu: true,
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
