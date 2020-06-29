const dates = {
  getDateAgo(num) {
    return new Date(Date.now() - 24 * 3600 * 1000 * num);
  },
  parseDate(date, months) {
    const attributeDate = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    const textDate = `${attributeDate[3]} ${months[+attributeDate[2] - 1]}, ${attributeDate[1]}г.`;

    return {
      attributeDate: attributeDate[0],
      textDate,
    };
  },
};

export default dates;
