import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Personal',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'dashboard',
        title: 'Dashboards',
        icon: 'Home',
        class: 'has-arrow',
        extralink: false,
        label: '10',
        labelClass: 'badge badge-info sidebar-badge',
        submenu: [
            {
                path: '/dashboard/classic',
                title: 'Classic',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/dashboard/analytical',
                title: 'Analytical',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/dashboard/cryptocurrency',
                title: 'Cryptocurrency',
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
        path: '',
        title: 'Apps',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/mail/inbox',
        title: 'Mail',
        icon: 'Inbox',
        class: '',
        extralink: false,
        label: 'new',
        labelClass: 'badge badge-success sidebar-badge',
        submenu: []
    },
    {
        path: '/apps/email',
        title: 'Email',
        icon: 'Mail',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/chat',
        title: 'Chat',
        icon: 'message-square',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/todo',
        title: 'Todo',
        icon: 'Sliders',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/tasks',
        title: 'Tasks',
        icon: 'Layout',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },


    {
        path: '/apps/notes',
        title: 'Notes',
        icon: 'Book',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/users',
        title: 'Users',
        icon: 'Users',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/fullcalendar',
        title: 'Calendar',
        icon: 'Calendar',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/taskboard',
        title: 'Taskboard',
        icon: 'Layout',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/contact',
        title: 'Contact',
        icon: 'Phone',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/contact-list',
        title: 'Contact Lists',
        icon: 'Pocket',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/apps/contact-grid',
        title: 'Contact Grid',
        icon: 'Server',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'ticket',
        title: 'Ticket',
        icon: 'bookmark',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: 'apps/ticket/ticketlist',
                title: 'Ticket List',
                icon: 'mdi mdi-book-multiple',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: 'apps/ticket/ticketdetails',
                title: 'Ticket Details',
                icon: 'mdi mdi-book-plus',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'UI',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'component',
        title: 'UI Elements',
        icon: 'Cpu',
        class: 'has-arrow',
        extralink: false,
        label: '13',
        labelClass: 'badge badge-warning sidebar-badge',
        submenu: [
            {
                path: '/component/accordion',
                title: 'Accordion',
                icon: 'mdi mdi-equal',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/alert',
                title: 'Alert',
                icon: 'mdi mdi-message-bulleted',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/carousel',
                title: 'Carousel',
                icon: 'mdi mdi-view-carousel',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/dropdown',
                title: 'Dropdown',
                icon: 'mdi mdi-arrange-bring-to-front',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/modal',
                title: 'Modal',
                icon: 'mdi mdi-tablet',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/pagination',
                title: 'Pagination',
                icon: 'mdi mdi-backburger',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/poptool',
                title: 'Popover & Tooltip',
                icon: 'mdi mdi-image-filter-vintage',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/progressbar',
                title: 'Progressbar',
                icon: 'mdi mdi-poll',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/rating',
                title: 'Ratings',
                icon: 'mdi mdi-bandcamp',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/tabs',
                title: 'Tabs',
                icon: 'mdi mdi-sort-variant',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/timepicker',
                title: 'Timepicker',
                icon: 'mdi mdi-calendar-clock',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/buttons',
                title: 'Button',
                icon: 'mdi mdi-toggle-switch',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/component/notifier', title: 'Notifier', icon: 'mdi mdi-bandcamp', class: '', extralink: false, label: '',
                labelClass: '', submenu: []
            }
        ]
    },
    {
        path: 'cards',
        title: 'Cards',
        icon: 'Copy',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/cards/basiccards',
                title: 'Basic Cards',
                icon: 'mdi mdi-layers',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/cards/customcards',
                title: 'Custom Cards',
                icon: 'mdi mdi-credit-card-scan',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/cards/weathercards',
                title: 'Weather Cards',
                icon: 'mdi mdi-weather-fog',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'extra-component',
        title: 'Extra Components',
        icon: 'Layers',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/extra-component/toastr',
                title: 'Toastr',
                icon: 'mdi mdi-poll',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/extra-component/editor',
                title: 'Editor',
                icon: 'mdi mdi-dns',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/extra-component/dragndrop',
                title: 'Drag n Drop',
                icon: 'mdi mdi-arrow-expand-all',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'widgets',
        title: 'Widgets',
        icon: 'Grid',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/widgets/apps',
                title: 'Widget Apps',
                icon: 'mdi mdi-comment-processing-outline',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/widgets/data',
                title: 'Widget Data',
                icon: 'mdi mdi-calendar',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Forms',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'forms',
        title: 'Form Elements',
        icon: 'Edit',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/forms/forminputs',
                title: 'Form Inputs',
                icon: 'mdi mdi-priority-low',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/inputgroups',
                title: 'Input Groups',
                icon: 'mdi mdi-rounded-corner',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/inputgrid',
                title: 'Input Grid',
                icon: 'mdi mdi-select-all',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/checkboxandradio',
                title: 'Checkbox & Radio',
                icon: 'mdi mdi-shape-plus',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/multiselect',
                title: 'Multiselect',
                icon: 'mdi mdi-select-inverse',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'formsl',
        title: 'Form Layouts',
        icon: 'Sidebar',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/forms/formsl/formbasic',
                title: 'Basic Forms',
                icon: 'mdi mdi-vector-difference-ba',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/formsl/formhorizontal',
                title: 'Horizontal Forms',
                icon: 'mdi mdi-file-document-box',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/formsl/formactions',
                title: 'Form Actions',
                icon: 'mdi mdi-code-greater-than',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/formsl/formrowseparator',
                title: 'Row Separator',
                icon: 'mdi mdi-code-equal',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/formsl/formstripedrows',
                title: 'Striped Rows',
                icon: 'mdi mdi-content-duplicate',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/forms/formsl/formdetail',
                title: 'Detail Forms',
                icon: 'mdi mdi-cards-outline',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'formsa',
        title: 'Form Addons',
        icon: 'Package',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: 'forms/formsa/formvalidation',
                title: 'Form Validation',
                icon: 'mdi mdi-alert-box',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: 'forms/formsa/typehead',
                title: 'Form Typehead',
                icon: 'mdi mdi-backburger',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: 'forms/formsa/datepicker',
                title: 'Datepicker',
                icon: 'mdi mdi-calendar-check',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: 'forms/formsa/language-datepicker',
                title: 'Language Datepicker',
                icon: 'mdi mdi-calendar-check',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: 'forms/ngx',
                title: 'Form Wizard / Steps',
                icon: 'mdi mdi-attachment',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Tables',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'tables',
        title: 'Bootstrap Tables',
        icon: 'Crop',
        class: 'has-arrow',
        extralink: false,
        label: '4',
        labelClass: 'badge badge-danger sidebar-badge',
        submenu: [
            {
                path: '/tables/basictables',
                title: 'Basic Tables',
                icon: 'mdi mdi-border-all',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/tables/darktables',
                title: 'Dark Basic Tables',
                icon: 'mdi mdi-border-all',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/tables/colortables',
                title: 'Colored Tables',
                icon: 'mdi mdi-border-all',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/tables/tablesizing',
                title: 'Table Sizing',
                icon: 'mdi mdi-border-all',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: '/tables/ngtable',
        title: 'Ng Tables',
        icon: 'Maximize',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/tables/datatable',
        title: 'Data Tables',
        icon: 'Disc',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '',
        title: 'Charts',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'charts',
        title: 'Charts',
        icon: 'Loader',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/charts/chartjs',
                title: 'Chart Js',
                icon: 'mdi mdi-svg',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/charts/chartistjs',
                title: 'Chartist Js',
                icon: 'mdi mdi-blur',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/charts/ngxchart',
                title: 'Ngx Charts',
                icon: 'mdi mdi-blur',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'Maps',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '/maps/google',
        title: 'Google Maps',
        icon: 'Map',
        class: '',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: '',
        title: 'Pages',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
        path: 'ecom',
        title: 'Ecommerce Pages',
        icon: 'shopping-cart',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/ecom/products',
                title: 'Products',
                icon: 'mdi mdi-cards-variant',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/ecom/cart',
                title: 'Cart',
                icon: 'mdi mdi-cart',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/ecom/edit',
                title: 'Edit Products',
                icon: 'mdi mdi-cart-plus',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/ecom/details',
                title: 'Product Details',
                icon: 'mdi mdi-camera-burst',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/ecom/orders',
                title: 'Orders',
                icon: 'mdi mdi-chart-pie',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/ecom/checkout',
                title: 'Checkout',
                icon: 'mdi mdi-clipboard-check',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'authentication',
        title: 'Authentication',
        icon: 'Lock',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/authentication/login',
                title: 'Login',
                icon: 'mdi mdi-account-key',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/authentication/login2',
                title: 'Login 2',
                icon: 'mdi mdi-account-key',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/authentication/signup',
                title: 'Register',
                icon: 'mdi mdi-account-plus',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/authentication/signup2',
                title: 'Register 2',
                icon: 'mdi mdi-account-plus',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/authentication/404',
                title: '404',
                icon: 'mdi mdi-alert-outline',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/authentication/lock',
                title: 'Lockscreen',
                icon: 'mdi mdi-account-off',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'sample-pages',
        title: 'Sample Pages',
        icon: 'book-open',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/sample-pages/profile',
                title: 'Profile',
                icon: 'mdi mdi-account-network',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/sample-pages/pricing',
                title: 'Pricing',
                icon: 'mdi mdi-file-export',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/sample-pages/invoice',
                title: 'Invoice',
                icon: 'mdi mdi-ungroup',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/sample-pages/helperclasses',
                title: 'Helper Classes',
                icon: 'mdi mdi-tune',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/starter',
                title: 'Starter Page',
                icon: 'mdi mdi-crop-free',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'timeline',
        title: 'Timeline',
        icon: 'Activity',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/timeline/left',
                title: 'Left Timeline',
                icon: 'mdi mdi-clock-fast',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/timeline/right',
                title: 'Right Timeline',
                icon: 'mdi mdi-clock-end',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/timeline/center',
                title: 'Center Timeline',
                icon: 'mdi mdi-clock-in',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'icons',
        title: 'Icons',
        icon: 'Feather',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '/icons/fontawesome',
                title: 'Fontawesome',
                icon: 'mdi mdi-emoticon-cool',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/icons/simpleline',
                title: 'Simple Line Icons',
                icon: 'mdi mdi mdi-image-broken-variant',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/icons/material',
                title: 'Material Icons',
                icon: 'mdi mdi-emoticon',
                class: '',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: []
            }
        ]
    },
    {
        path: 'mlevel',
        title: 'Menu Levels',
        icon: 'align-left',
        class: 'has-arrow',
        extralink: false,
        label: '',
        labelClass: '',
        submenu: [
            {
                path: '',
                title: 'Second Level',
                icon: 'mdi mdi-octagram',
                class: '',
                extralink: true,
                label: '',
                labelClass: '',
                submenu: []
            },
            {
                path: '/second',
                title: 'Second Child',
                icon: 'mdi mdi-octagram',
                class: 'has-arrow',
                extralink: false,
                label: '',
                labelClass: '',
                submenu: [
                    {
                        path: '/thirdone',
                        title: 'Third 1.1',
                        icon: 'mdi mdi-playlist-plus',
                        class: '',
                        extralink: false,
                        label: '',
                        labelClass: '',
                        submenu: []
                    },
                    {
                        path: '/thirdtwo',
                        title: 'Third 1.2',
                        icon: 'mdi mdi-playlist-plus',
                        class: '',
                        extralink: false,
                        label: '',
                        labelClass: '',
                        submenu: []
                    }
                ]
            }
        ]
    }
];
