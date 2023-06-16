import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'funded',
    imgUrl: payment,
    link: '/funded',
    // disabled: true,
  },
  // {
  //   name: 'withdraw',
  //   imgUrl: withdraw,
  //   link: '/withdraw',
  // },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
];