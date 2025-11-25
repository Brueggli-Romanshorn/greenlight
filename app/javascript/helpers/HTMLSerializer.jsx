import { Text } from 'slate';

// Serialize the nodes to HTML
export const serialize = (nodes) => {
  return nodes.map(n => NodeToHtml(n)).join('');
};

// Convert a single node to HTML
const NodeToHtml = (node) => {
  if (Text.isText(node)) {
    let string = node.text;
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }

  const children = node.children.map(n => NodeToHtml(n)).join('');

  switch (node.type) {
    case 'paragraph':
      if (children == " ") {
        return `<br/>`;
      }
      else {
        return `<p>${children}</p>`;
      }
    case 'link':
      return `<a target="_blank" href="${node.url}" >${children}</a>`;
    case 'heading-one':
      return `<h4>${children}</h4>`;
    case 'heading-two':
      return `<h5>${children}</h5>`;
    case 'numbered-list':
        return `<ol>${children}</ol>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    // Add other cases for different block types as needed
    default:
      return children;
  }
};