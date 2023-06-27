import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard_icon.svg';
import { ReactComponent as PatternSearchIcon } from '../assets/icons/pattern_search_icon.svg';
import { ReactComponent as SkewIcon } from '../assets/icons/skew_icon.svg';
// import { ReactComponent as SettingIcon } from '../assets/icons/setting_icon.svg';
import { ReactComponent as CalculatorIcon } from '../assets/icons/calculator_icon.svg';
import { ReactComponent as CumulativeIcon } from '../assets/icons/cumulative_icon.svg';
import { ReactComponent as ComposeIcon } from '../assets/icons/Vector.svg';
// import { ReactComponent as InfoIcon } from '../assets/icons/Vector-1.svg';
import { ReactComponent as HelpIcon } from '../assets/icons/Vector-2.svg';
import { ReactComponent as HistogramIcon } from '../assets/icons/histogram_icon.svg';

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
                path: '/cumulative-gc-Skew',
              },
              {
                title: 'Cumulative AT',
                icon: <CumulativeIcon />,
                path: '/cumulative-at-Skew',
              },
              {
                title: 'Cumulative MK',
                icon: <CumulativeIcon />,
                path: '/cumulative-mk-Skew',
              },
              {
                title: 'Cumulative RY',
                icon: <CumulativeIcon />,
                path: '/cumulative-ry-Skew',
              },
            ],
          },
          {
            title: 'GC Skew',
            icon: <SkewIcon />,
            path: '/gc-skew',
          },
          {
            title: 'AT Skew',
            icon: <SkewIcon />,
            path: '/at-skew',
          },
          {
            title: 'MK Skew',
            icon: <SkewIcon />,
            path: '/mk-Skew',
          },
          {
            title: 'RY Skew',
            icon: <SkewIcon />,
            path: '/ry-Skew',
          },
        ],
      },
      // {
      //   title: 'Correlation Method',
      //   icon: <SettingIcon />,
      //   childrens: [
      //     {
      //       title: 'Correlation By Window',
      //       icon: <CumulativeIcon />,
      //       path: '/correlation-by-window',
      //     },
      //     {
      //       title: 'Correlation for whole genome',
      //       icon: <CumulativeIcon />,
      //       path: '/corelation-for-whole-genome',
      //     },
      //   ],
      // },
      {
        title: 'Skew Calculator',
        icon: <CalculatorIcon />,
        path: '/skew-calculator',
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
      {
        title: 'DNaA Box',
        icon: <PatternSearchIcon />,
        path: '/dna-box',
      },
      {
        title: 'Yeast ACS',
        icon: <PatternSearchIcon />,
        path: '/yeast-acs',
      },
      {
        title: 'Extract Sequence',
        icon: <PatternSearchIcon />,
        path: '/extract-sequence',
      },
    ],
  },
  // {
  //   title: 'DNA Analysis',
  //   icon: <PatternSearchIcon />,
  //   childrens: [
  //     {
  //       title: 'DNA Bending Analysis',
  //       icon: <SkewIcon />,
  //       path: '/dna-bending-analysis',
  //     },
  //   ],
  // },
  // {
  //   title: 'Information',
  //   icon: <InfoIcon />,
  //   childrens: [
  //     {
  //       title: 'Shannons entrophy ',
  //       icon: <InfoIcon />,
  //       path: '/shannons-entrophy',
  //     },
  //   ],
  // },
  {
    title: 'Composition',
    icon: <ComposeIcon />,
    childrens: [
      {
        title: 'Neucleotide',
        icon: <ComposeIcon />,
        childrens: [
          {
            title: 'Composition Of A',
            icon: <ComposeIcon />,
            path: '/composition-of-a',
          },
          {
            title: 'Composition Of T',
            icon: <ComposeIcon />,
            path: '/composition-of-t',
          },
          {
            title: 'Composition Of G',
            icon: <ComposeIcon />,
            path: '/composition-of-g',
          },
          {
            title: 'Composition Of C',
            icon: <ComposeIcon />,
            path: '/composition-of-c',
          },
        ],
      },
      {
        title: 'Pyr / Pur',
        icon: <ComposeIcon />,
        childrens: [
          {
            title: 'pyridine',
            icon: <ComposeIcon />,
            path: '/pyridine',
          },
          {
            title: 'Purine',
            icon: <ComposeIcon />,
            path: '/purine',
          },
        ],
      },
    ],
  },
  {
    title: 'GDWP',
    icon: <HistogramIcon />,
    fullForm: 'genome distribution by word pattern',
    path: '/genome-distribution-by-word-pattern',
  },
  {
    title: 'DDP',
    icon: <HistogramIcon />,
    fullForm: 'distance distribution profile',
    path: '/Distance-distribution-profile',
  },
  {
    title: 'Help',
    icon: <HelpIcon />,
    path: '/help',
  },
];

export default sidebarData;
