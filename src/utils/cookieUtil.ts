const setCookie = (name: string, value: string, days: number) => {
  if (getCookie(name)) {
    deleteCookie(name);
  }
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name: string) => {
  const cookie = document.cookie;
  const cookieArr = cookie.split('; ');
  for (let i = 0; i < cookieArr.length; i++) {
    const [cookieName, cookieValue] = cookieArr[i].split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

export default { getCookie, setCookie, deleteCookie };
