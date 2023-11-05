export const pagination = (pager: any) => {
  let { page, pageSize } = pager;

  page = page ? parseInt(page) : 1;

  pageSize = pageSize ? parseInt(pageSize) : 12;

  pageSize = pageSize > 50 ? 50 : pageSize;

  return { page, pageSize };
};
