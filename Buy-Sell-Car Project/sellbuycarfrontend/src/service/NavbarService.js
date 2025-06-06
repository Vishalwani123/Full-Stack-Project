export const NavbarService = {
  isAdminLoggedIn: () => localStorage.getItem('role') === 'ADMIN',
  isCustomerLoggedIn: () => localStorage.getItem('role') === 'CUSTOMER',
  getCustomerName: () => localStorage.getItem('customerName') || 'Customer',
  signout: () => localStorage.clear(),
};


