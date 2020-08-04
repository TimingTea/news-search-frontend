const deleteListTags = (description) => description.replace(/(<ol>|<\/ol>|<li>|<\/li>)/g, '');

export default deleteListTags;
