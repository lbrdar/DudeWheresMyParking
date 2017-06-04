import constants from '../constants';

export function toggleDrawer() {
  return {
    type: constants.TOGGLE_DRAWER
  }
}
export function closeDrawer() {
  return {
    type: constants.CLOSE_DRAWER
  }
}
export function openDrawer() {
  return {
    type: constants.OPEN_DRAWER
  }
}