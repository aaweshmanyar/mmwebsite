export function changeFavicon(iconURL) {
  const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
  link.rel = "icon";
  link.href = iconURL;
  document.getElementsByTagName("head")[0].appendChild(link);
}
