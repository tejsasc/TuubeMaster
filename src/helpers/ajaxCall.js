async function ajaxCall(
  url,
  fetchObj = {},
  timeOut,
  timeOutFunction = () => {}
) {
  try {
    const id = setTimeout(() => {
      timeOutFunction();
    }, timeOut);
    const response = await fetch(
      `https://tubemastercrm.com/api${url}`,
      fetchObj
    );
    clearTimeout(id);
    const data = await response.json();

    return {
      status: response.status,
      isError: !response.ok,
      isNetwork: false,
      data,
    };
  } catch (e) {
    return {
      status: null,
      isError: true,
      isNetwork: true,
      data: null,
      error: e,
    };
  }
}

export { ajaxCall };
