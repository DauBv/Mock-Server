/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
module.exports = (rep, res) => {
  const { page = 1, limit = 5 } = rep.query;

  res.json({
    page,
    limit,
    data: Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
    })),
  });
};
