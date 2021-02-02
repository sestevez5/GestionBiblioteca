import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: 'dashboard',
        title: 'USUARIOS',
        icon: 'mdi mdi-share',
        class: 'has-arrow',
        extralink: false,
        label: '10',
        labelClass: 'badge badge-info sidebar-badge',
        submenu: [
            {
                path: 'usuarios',
                title: 'Visión general',
                icon: '',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
  },

  {
    path: 'dashboard',
    title: 'LIBROS',
    icon: 'mdi mdi-share',
    class: 'has-arrow',
    extralink: false,
    label: '10',
    labelClass: 'badge badge-info sidebar-badge',
    submenu: [
        {
            path: './libros',
            title: 'Visión general',
            icon: '',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        }
    ]
  },

  {
    path: 'dashboard',
    title: 'HORARIOS',
    icon: 'mdi mdi-share',
    class: 'has-arrow',
    extralink: false,
    label: '10',
    labelClass: 'badge badge-info sidebar-badge',
    submenu: [
        {
            path: './horarios',
            title: 'Visión general',
            icon: '',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        }
    ]
},

  {
    path: 'dashboard',
    title: 'PRESTAMOS',
    icon: 'mdi mdi-share',
    class: 'has-arrow',
    extralink: false,
    label: '10',
    labelClass: 'badge badge-info sidebar-badge',
    submenu: [
        {
            path: '/dashboard/classic',
            title: 'Visión general',
            icon: '',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/analytical',
            title: 'Morosos',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/cryptocurrency',
            title: 'Históricos',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/overview',
            title: 'Overview',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/ecommerce',
            title: 'Ecommerce',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/sale',
            title: 'Sale',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/general',
            title: 'General',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/trendy',
            title: 'Trendy',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/campaign',
            title: 'Campaign',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        },
        {
            path: '/dashboard/modern',
            title: 'Modern',
            icon: 'mdi mdi-adjust',
            class: '',
            extralink: false,
            label: '',
            labelClass: '',
            submenu: []
        }
    ]
},


{
  path: 'dashboard',
  title: 'LECTORES',
  icon: 'mdi mdi-share',
  class: 'has-arrow',
  extralink: false,
  label: '10',
  labelClass: 'badge badge-info sidebar-badge',
  submenu: [
      {
          path: './lectores',
          title: 'Visión general',
          icon: '',
          class: '',
          extralink: false,
          label: '',
          labelClass: '',
          submenu: []
      }
  ]
},



];
