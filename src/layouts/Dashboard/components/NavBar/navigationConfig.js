export default [
  {
    pages: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: '/icon/home_icon.png'
      },
      {
        title: 'Manajemen User',
        href: '/management',
        icon: '/icon/user_icon.png',
        children: [
          {
            title: 'User',
            href: '/management-user/user'
          },
          {
            title: 'Role',
            href: '/management-user/role'
          }
        ]
      },
      {
        title: 'Manajemen Konten',
        href: '/management-content/content',
        icon: '/icon/management_content.png',
        children: [
          {
            title: 'Bincang Bisnis',
            href: '/management-content/business-talk'
          },
          {
            title: 'Sentra Belajar',
            href: '/management-content/learning-center'
          },
          {
            title: 'Pasar UMKM',
            href: '/management-content/umkm-market'
          },
          {
            title: 'Banner',
            href: '/management-content/banner'
          }
        ]
      }
    ]
  }
];
