const filter: any = (queryParam: any, queryStringParam: any) => {
  let query = queryParam;
  let queryString = queryStringParam;

  const queryObj = { ...queryString };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  //filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  query = query.find(JSON.parse(queryStr));
  //sorting
  if (queryString.sort) {
    const sortBy = String(queryString.sort).split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //limiting fields
  if (queryString.fields) {
    const fields = String(queryString.fields).split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }
  //pagination
  const page = Number(queryString.page) || 1;
  const limit = Number(queryString.limit) || 100;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  return query;
};
export default filter;
