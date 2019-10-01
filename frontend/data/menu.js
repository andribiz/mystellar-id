const menus = [
  {
    group: 'Domain',
    items: [
      { path: '/', name: 'Mystellar', icon: 'ion-ios-medical' },
      { path: '/federation', name: 'Federation', icon: 'ion-link' },
      {
        path: '/federation-user',
        name: 'Your User',
        icon: 'ion-android-people',
      },
    ],
  },
  {
    group: 'Asset',
    items: [
      { path: '/not-yet', name: 'Create Asset', icon: 'ion-android-create' },
      { path: '/not-yet', name: 'Your Asset', icon: 'ion-briefcase' },
    ],
  },
];

export default menus;
