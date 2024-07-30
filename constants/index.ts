import carIc from '../public/svg/car.svg';
import giftIc from '../public/svg/gift.svg';
import storeIc from '../public/svg/store.svg';
import platformIc from '../public/svg/platform.svg';
import carDelivery from '../public/svg/carShip.svg';
import headphone from '../public/svg/headphone.svg';
import bag from '../public/svg/bag.svg';
import union from '../public/svg/union.svg';
import delivery from '../public/svg/delivery.svg';
import moneyBack from '../public/svg/money-back.svg';
import payment from '../public/svg/payment.svg';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DiscountIcon from '@mui/icons-material/Discount';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import VerifiedIcon from '@mui/icons-material/Verified';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GppBadIcon from '@mui/icons-material/GppBad';

export const ListNavigate = [
    {
        id: 1,
        title: 'Home',
        nestedTitle: null,
    },
    {
        id: 2,
        title: 'Pages',
        nestedTitle: [
            { id: 2.1, title: 'Electronics eCommerce' },
            { id: 2.2, title: 'Fashion Shopify' },
        ],
    },

    {
        id: 3,
        title: 'Products',
        nestedTitle: [
            { id: 3.1, title: 'Product Electronics' },
            { id: 3.2, title: 'Product Fashion' },
        ],
    },
    {
        id: 4,
        title: 'Category',
        nestedTitle: [
            { id: 4.1, title: 'Men Fashion' },
            { id: 4.2, title: 'Women Fashion' },
            { id: 4.3, title: 'Mobile Device' },
            { id: 4.4, title: 'Computer Device' },
            { id: 4.5, title: 'Beauty Products' },
            { id: 4.6, title: 'Smart Watch' },
            { id: 4.7, title: 'Modern Shoes' },
        ],
    },
    {
        id: 5,
        title: 'Contact',
        nestedTitle: null,
    },
    {
        id: 6,
        title: 'About',
        nestedTitle: null,
    },
    {
        id: 7,
        title: 'Blog',
        nestedTitle: null,
    },
    {
        id: 8,
        title: 'FAQ',
        nestedTitle: null,
    },
];

export const ListLinkFooter = [
    {
        id: 1,
        title: 'Customer Service',
        nestedTitle: [
            {
                id: 1.1,
                title: 'Contact Us',
            },
            {
                id: 1.2,
                title: 'FAQs',
            },
            {
                id: 1.3,
                title: 'Order Lookup',
            },
            {
                id: 1.4,
                title: 'Returns',
            },
            {
                id: 1.5,
                title: 'Shipping N Delivery',
            },
            {
                id: 1.6,
                title: 'Corporate Gifting',
            },
        ],
    },
    {
        id: 2,
        title: 'About Us',
        nestedTitle: [
            {
                id: 2.1,
                title: 'Careers',
            },
            {
                id: 2.2,
                title: 'News N Blog',
            },
            {
                id: 2.3,
                title: 'Press Enter',
            },
            {
                id: 2.4,
                title: 'Investors',
            },
            {
                id: 2.5,
                title: 'Suppliers',
            },
            {
                id: 2.6,
                title: 'Terms N Conditions',
            },
            {
                id: 2.7,
                title: 'Privacy Policy',
            },
        ],
    },
    {
        id: 3,
        title: 'Credit Card',
        nestedTitle: [
            {
                id: 3.1,
                title: 'Gift Cards',
            },
            {
                id: 3.2,
                title: 'Gift Cards Balance',
            },
            {
                id: 3.3,
                title: 'Shop With Points',
            },
            {
                id: 3.4,
                title: 'Reload Your Balance',
            },
        ],
    },
    {
        id: 4,
        title: 'Sell',
        nestedTitle: [
            {
                id: 4.1,
                title: 'Start Selling',
            },
            {
                id: 4.2,
                title: 'Learn to Sell',
            },
            {
                id: 4.3,
                title: 'Affiliates N Partners',
            },
        ],
    },
];

export const Features = [
    {
        id: 1,
        icon: carIc,
        title: 'Same Day Delivery',
        desc: 'We are providing same day delivery with a minimum cost at anytime anywhere.',
    },
    {
        id: 2,
        icon: giftIc,
        title: 'Next Day Delivery',
        desc: 'We are providing next day delivery without any minimum cost at anytime anywhere.',
    },
    {
        id: 3,
        icon: storeIc,
        title: 'Multiple Store',
        desc: 'We have multiple store across the country and soon we will launch more stores.',
    },
    {
        id: 4,
        icon: platformIc,
        title: 'Trusted Platform',
        desc: 'Our clients loves us so much. We are providing the best and bringing the best to the clients.',
    },
];

export const Features2 = [
    {
        id: 1,
        icon: carDelivery,
        title: 'Free Shipping',
        desc: 'Free Shipping On All Order',
    },
    {
        id: 2,
        icon: headphone,
        title: 'Support 24/7',
        desc: 'Support 24 hours a day',
    },
    {
        id: 1,
        icon: bag,
        title: 'Money Return',
        desc: 'Back guaramtee under 5 days',
    },
    {
        id: 1,
        icon: union,
        title: 'Order Discounts',
        desc: 'Onevery order over $150',
    },
];

export const Features3 = [
    {
        id: 1,
        icon: delivery,
        title: 'Super Fast and Free Delivery',
    },
    {
        id: 2,
        icon: moneyBack,
        title: 'Money back Guaranteed',
    },
    {
        id: 3,
        icon: payment,
        title: 'Super Secure Payment System',
    },
];

export const ListNavigateDashboard = [
    {
        id: 1,
        title: 'Main Menu',
        nestedList: [
            {
                id: 1.1,
                title: 'Overview',
                icon: DashboardIcon,
            },
            {
                id: 1.2,
                title: 'Order',
                icon: ShoppingBagIcon,
            },
            {
                id: 1.3,
                title: 'Products',
                icon: InventoryIcon,
            },
            {
                id: 1.4,
                title: 'Categories',
                icon: CategoryIcon,
            },
            {
                id: 1.5,
                title: 'Users',
                icon: PeopleAltIcon,
            },
            {
                id: 1.6,
                title: 'Analytics',
                icon: AnalyticsIcon,
            },
            {
                id: 1.7,
                title: 'Discount',
                icon: DiscountIcon,
            },
        ],
    },
    {
        id: 2,
        title: 'Account',
        nestedList: [
            {
                id: 2.1,
                title: 'Settings',
                icon: SettingsIcon,
                path: 'settings',
            },
            {
                id: 2.2,
                title: 'Support',
                icon: ContactSupportIcon,
                path: 'support',
            },
        ],
    },
];

export const BenefitHeaders = [
    {
        id: 1,
        title: 'Total Products',
        icon: InventoryIcon,
    },
    {
        id: 2,
        title: 'Completed Order',
        icon: AssignmentTurnedInIcon,
    },
    {
        id: 3,
        title: 'Total Products',
        icon: GppBadIcon,
    },
    {
        id: 4,
        title: 'Total Products',
        icon: VerifiedIcon,
    },
];
