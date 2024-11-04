export const logRequestDetails = (req, res, next) => {
  console.log('--- Incoming Request Details ---');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Params:', JSON.stringify(req.params, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('---------------------------------');

  next();
};