const getweight = (req, res) => {
  console.log('44444444444444', req, res);
  return res.json([
    {
      week: "1",
      level: "实际体重",
      increment: 0.1
    },
    {
      week: "2",
      level: "实际体重",
      increment: 0.15
    },
    {
      week: "3",
      level: "实际体重",
      increment: 0.2
    },
    {
      week: "4",
      level: "实际体重",
      increment: 0.3
    },
    {
      week: "5",
      level: "实际体重",
      increment: 0.36
    },
    {
      week: "6",
      level: "实际体重",
      increment: 0.45
    },
    {
      week: "7",
      level: "实际体重",
      increment: 0.5
    },
    {
      week: "8",
      level: "实际体重",
      increment: 0.62
    },
    {
      week: "9",
      level: "实际体重",
      increment: 0.8
    },
    {
      week: "10",
      level: "实际体重",
      increment: 1.02
    },
    {
      week: "11",
      level: "实际体重",
      increment: 1.2
    },
    {
      week: "12",
      level: "实际体重",
      increment: 1.58
    }
  ]);
};

export default {
  'GET /api/weight': getweight,
};
