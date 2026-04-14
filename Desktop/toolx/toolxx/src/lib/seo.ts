export function updateMetaTags(
  title: string,
  description: string,
  keywords?: string
) {
  // Update page title
  document.title = title;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", description);

  // Update keywords
  if (keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);
  }

  // Update OpenGraph tags
  updateOpenGraphTags(title, description);
}

function updateOpenGraphTags(title: string, description: string) {
  const updateOGTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  updateOGTag("og:title", title);
  updateOGTag("og:description", description);
  updateOGTag("og:type", "website");
}

export function getToolMetaDescription(toolName: string, toolDescription?: string): string {
  const baseText = `Free ${toolName} tool - Fast, secure, and easy to use`;
  if (toolDescription) {
    return baseText + ". " + toolDescription.substring(0, 100) + "...";
  }
  return baseText;
}
