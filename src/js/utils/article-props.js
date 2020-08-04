const articleProps = {
  getSavedProps(article) {
    const {
      text, date, source, title, link, image, keyword, _id: id,
    } = article;

    return {
      text,
      date,
      source,
      title,
      link,
      image,
      keyword,
      id,
    };
  },
  getSearchedProps(article, searchKeyword) {
    const {
      description, publishedAt, source, title, url, urlToImage,
    } = article;

    return {
      text: description,
      date: publishedAt,
      source: source.name,
      title,
      link: url,
      image: urlToImage,
      keyword: searchKeyword,
    };
  },
};

export default articleProps;
