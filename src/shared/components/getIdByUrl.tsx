/**
 *
 * @returns project id from url
 * @description get project id from url because project detail is not a component
 */
export function getIdProjectFromUrl() {
  const url = window.location.pathname;
  const parts = url.split('/');
  const id = parts[parts.length - 1];
  return id;
}
