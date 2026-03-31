export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Curriculum', href: '/curriculum/' },
  { label: 'Student Work', href: '/student-work/' },
  { label: 'About', href: '/about/' },
  { label: 'Support', href: '/support/' },
];

export const navCta = {
  label: 'Become a Partner',
  href: '/support/',
};
