import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard_icon.svg';
import { ReactComponent as PatternSearchIcon } from '../assets/icons/pattern_search_icon.svg';
import { ReactComponent as SkewIcon } from '../assets/icons/skew_icon.svg';
import { ReactComponent as SettingIcon } from '../assets/icons/setting_icon.svg';
import { ReactComponent as CalculatorIcon } from '../assets/icons/calculator_icon.svg';
import { ReactComponent as CumulativeIcon } from '../assets/icons/cumulative_icon.svg';

const sidebarData = [
  {
    title: 'OriginFinder',
    icon: <DashboardIcon />,
    childrens: [
      {
        title: 'Skew',
        icon: <SkewIcon />,
        childrens: [
          {
            title: 'Cumulative',
            icon: <CumulativeIcon />,
            childrens: [
              {
                title: 'Cumulative GC',
                icon: <CumulativeIcon />,
                path: '/CumulativeGcSkew',
              },
              {
                title: 'Cumulative AT',
                icon: <CumulativeIcon />,
                path: '/CumulativeAtSkew',
              },
              {
                title: 'Cumulative MK',
                icon: <CumulativeIcon />,
                path: '/CumulativeMkSkew',
              },
              {
                title: 'Cumulative RY',
                icon: <CumulativeIcon />,
                path: '/CumulativeRySkew',
              },
            ],
          },
          {
            title: 'GC Skew',
            icon: <SkewIcon />,
            path: '/GcSkew',
          },
          {
            title: 'AT Skew',
            icon: <SkewIcon />,
            path: '/AtSkew',
          },
          {
            title: 'MK Skew',
            icon: <SkewIcon />,
            path: '/MkSkew',
          },
          {
            title: 'RY Skew',
            icon: <SkewIcon />,
            path: '/RySkew',
          },
        ],
      },
      {
        title: 'Correlation Method',
        icon: <SettingIcon />,
        path: '/CorrelationMethod',
      },
      {
        title: 'Skew Calculator',
        icon: <CalculatorIcon />,
        path: '/SkewCalculator',
      },
    ],
  },
  {
    title: 'Pattern Search',
    icon: <PatternSearchIcon />,
    childrens: [
      {
        title: 'Sequence Search',
        icon: <PatternSearchIcon />,
        path: '/search-sequence',
      },
    ],
  },
];

export default sidebarData;
