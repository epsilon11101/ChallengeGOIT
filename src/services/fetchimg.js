export const fetchImage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return "404";
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return "404";
    }
    return url;
  } catch (error) {
    return "404";
  }
};
