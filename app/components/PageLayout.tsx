import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {IoIosArrowDown} from 'react-icons/io';
import {IoIosArrowUp} from 'react-icons/io';
import {FiSun, FiMoon} from 'react-icons/fi';

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import {type LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Input} from '~/components/Input';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
`
`;
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';
import {useState} from 'react';
type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
        toggleTheme={toggleTheme} // Pass toggle function to DesktopHeader
        isDarkMode={isDarkMode} // Pass current theme state
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
        toggleTheme={toggleTheme} // Pass toggle function to DesktopHeader
        isDarkMode={isDarkMode} // Pass current theme state
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track the open dropdown
  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id); // Toggle dropdown visibility
  };

  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8 dark-menu">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block ">
          <span className="flex items-center">
            <Link
              to={item.to}
              target={item.target}
              className={({isActive}) =>
                isActive
                  ? 'pb-1 border-b -mb-px flex items-center'
                  : 'pb-1 flex items-center'
              }
              onClick={() => {
                if (item.title === 'Catalog') {
                  toggleDropdown(item.id);
                } else {
                  onClose();
                }
              }}
            >
              <Text as="span" size="copy">
                {item.title}
              </Text>
              {/* {item.title === 'Catalog' && (
              <IoIosArrowDown className="ml-2 inline-block" />
            )} */}
              {item.title === 'Catalog' && (
                <span className="ml-2 inline-block ">
                  {openDropdown === item.id ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              )}
            </Link>
          </span>

          {item.title === 'Catalog' && openDropdown === item.id && (
            <div className="ml-4 mt-2 bg-slate-600 shadow-md rounded-md p-4">
              <ul>
                <li className="mb-2">
                  <Link to="/collections/all" onClick={onClose}>
                    All
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/collections/jewelry" onClick={onClose}>
                    Jewelry
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/collections/clothing" onClick={onClose}>
                    clothing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/collections/watches" onClick={onClose}>
                    Watches
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </span>
      ))}
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
  toggleTheme,
  isDarkMode,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
  toggleTheme: () => void; // Add toggleTheme prop
  isDarkMode: boolean; // Add isDarkMode prop
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // State to track open dropdown
  const params = useParams();

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id); // Toggle dropdown visibility
  };

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-contrast/80 text-primary'
      } flex bg-primary/80 text-primary lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-2">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
        <button
          onClick={toggleTheme}
          // className="flex items-center justify-center w-8 h-8"
        >
          {isDarkMode ? (
            <FiSun className="text-white" />
          ) : (
            <FiMoon className="text-white" />
          )}
        </button>
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
  toggleTheme,
  isDarkMode,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
  toggleTheme: () => void; // Add toggleTheme prop
  isDarkMode: boolean; // Add isDarkMode prop
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const params = useParams();
  const {y} = useWindowScroll();

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const dropdown = event.target.closest('.dropdown');
      if (!dropdown) {
        setOpenDropdown(null); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-contrast/80 text-primary'
      } ${
        !isHome && y > 50 ? 'shadow-lightHeader' : ''
      } hidden h-nav lg:flex items-center sticky transition duration-300 bg-primary/80 text-white backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}
    >
      <div className="flex gap-12 items-center">
        <Link className="font-bold text-2xl" to="/" prefetch="intent">
          {title}
        </Link>
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <div key={item.id} className="relative dropdown">
              <Link
                to={item.to}
                target={item.target}
                prefetch="intent"
                className={({isActive}) =>
                  isActive
                    ? 'pb-1 border-b -mb-px flex items-center'
                    : 'pb-1 flex items-center'
                }
                onClick={() =>
                  item.title === 'Catalog' && toggleDropdown(item.id)
                }
              >
                {item.title}
                {/* {item.title === 'Catalog' && (
                  <IoIosArrowDown className="ml-2 inline-block" />
                )} */}

                {item.title === 'Catalog' && (
                  <span className="ml-2 inline-block">
                    {openDropdown === item.id ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                )}
              </Link>

              {item.title === 'Catalog' && openDropdown === item.id && (
                <div className="absolute left-0 mt-4 bg-slate-600  shadow-md rounded-md p-4 ">
                  <ul className="">
                    <li className="mb-2">
                      <Link to="/collections/all" onClick={handleLinkClick}>
                        all
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/collections/jewelry" onClick={handleLinkClick}>
                        jewelry
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/collections/clothing"
                        onClick={handleLinkClick}
                      >
                        clothing
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link to="/collections/watches" onClick={handleLinkClick}>
                        watches
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" />
        <CartCount isHome={isHome} openCart={openCart} />
        {/* <div className="flex items-center gap-1"> */}
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8"
        >
          {isDarkMode ? (
            <FiSun className="text-white" />
          ) : (
            <FiMoon className="text-white" />
          )}
        </button>
        {/* </div> */}
      </div>
    </header>
  );
}

function AccountLink({className}: {className?: string}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link
      to="https://shopify.com/92059500866/account/profile"
      className={className}
      target=""
    >
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark ? 'bg-black ' : ' bg-black '
          } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center  justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span className="">{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}: {menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className="bg-gray-800"
      /*    className={`grid min-h-[25rem] items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-primary dark:bg-contrast dark:text-primary text-contrast overflow-hidden`} */
    >
      {/*    <FooterMenu menu={menu} /> */}
      {/*  <CountrySelector />
       */}
      {/*    <div
        className={`self-end pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
      >
        &copy; {new Date().getFullYear()} / Clonezore, Inc. Clonezore is an MIT
        Licensed Open Source project.
      </div>
 */}
      <div className="bg-gray-800 text-white p-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-8">
          <div className="space-y-3">
            <h5 className="font-bold text-lg">Product</h5>
            <ul className="text-sm">
              <li>Overview</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-lg">Use Cases</h5>
            <ul className="text-sm">
              <li>Small Business</li>
              <li>Freelancers</li>
              <li>Agencies</li>
              <li>E-commerce</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-lg">Resources</h5>
            <ul className="text-sm">
              <li>Blog</li>
              <li>Help center</li>
              <li>Community</li>
              <li>Tutorials</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-lg">Company</h5>
            <ul className="text-sm">
              <li>About us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-lg">policy</h5>
            <ul className="text-sm">
              <li>
                <Link to="/policies">policy</Link>
              </li>
              <li>
                <Link to="/policies/privacy-policy">privacy-policy</Link>
              </li>
              <li>
                <Link to="/policies/terms-of-service">terms of service</Link>
              </li>
              <li>
                <Link to="/policies/refund-policy">refund policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 mt-8 py-6 text-center text-sm">
          {/* <p>HAVE GOOD WEB DESIGN TODAY</p>
          <p>Transform your ideas into reality with stunning web design.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
            Get started
          </button> */}
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="https://www.facebook.com/shopify/" target="blank">
              {' '}
              <FaFacebookF />
            </Link>

            <Link to="https://x.com/Shopify" target="blank">
              {' '}
              <FaTwitter />
            </Link>
            <Link to="https://ca.linkedin.com/company/shopify" target="blank">
              {' '}
              <FaLinkedinIn />
            </Link>
            <Link to="https://www.instagram.com/shopify/" target="blank">
              {' '}
              <FaInstagram />
            </Link>
          </div>
          <p className="text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} / Clonezore, Inc. Clonezore is an
            MIT Licensed Open Source project.
          </p>
        </div>
      </div>
    </Section>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                {/*    <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button> */}
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
