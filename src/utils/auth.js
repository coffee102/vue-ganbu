import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const MenuItems = 'MenuItems'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getMenu() {
  return Cookies.get(MenuItems)
}
export function setMenu(menuitems) {
  return Cookies.set(MenuItems, menuitems)
}
export function removeMenu() {
  return Cookies.remove(MenuItems)
}